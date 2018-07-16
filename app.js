import Koa from 'koa'
import json from 'koa-json'
import config from 'config'
import err from './config/error'
import serve from 'koa-static'
import mysql from 'mysql2/promise'
import koaBodyParser from 'koa-bodyparser'
import resources from 'koa-file-router'
import http from 'http'


try {
    const app = new Koa()

    app.use(serve(__dirname + '/public/assets'))
    //For managing body. We're only allowing json.
    app.use(koaBodyParser())
    app.use(json())


    app.use(err)

    // set up MySQL connection
    app.use(async (ctx, next) => {
        try {
            global.connectionPool = mysql.createPool(config.database)

            ctx.state.db = global.db = await global.connectionPool.getConnection()
            await ctx.state.db.query('SET SESSION sql_mode = "TRADITIONAL"')

            await next()

            ctx.state.db.release()

        } catch (e) {
            // note if getConnection() fails we have no this.state.db, but if anything downstream throws,
            // we need to release the connection
            if (ctx.state.db) ctx.state.db.release()
            throw e
        }
    })

    const router = resources('./server/routes', {prefix: '/api'})
    app.use(router.routes())

    const server = http.createServer(app.callback())
    const io = require('socket.io')(server)
    io.on('connection', (socket) => {
        console.log('a user connected')

        socket.on('disconnect', () => {
            console.log('user disconnected')
        })
    })

    server.listen(config.proxy.port, () => {
        console.log('%s listening at port %d', config.app.name, config.proxy.port)
    })
}
catch (error) {
    console.error(error.stack || error)
}