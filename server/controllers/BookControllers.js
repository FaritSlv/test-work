import BookModels from '../models/BookModels.js'

class BookControllers {
    async index(ctx) {
        const query = ctx.request.body
        const book = new BookModels()

        try {
            ctx.body = await book.list(query)
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA ' + error)
        }
    }
    async edit(ctx) {

        try {
            ctx.body = {'edit': 'tue'}
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA ' + error)
        }
    }

    async create(ctx) {
        const query = ctx.request.body
        const book = new BookModels()

        try {
            ctx.body = await book.insert(query)
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA ' + error)
        }
    }
}

export default BookControllers
