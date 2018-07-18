import BookModels from '../models/BookModels.js'

class BookControllers {
    async index(ctx) {
        const query = ctx.request.body
        const bookM = new BookModels()

        try {
            await bookM.list(query)
            ctx.body = {books: bookM.books, pagination: bookM.pagination}
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
            await book.insert(query)
            ctx.body = 'Success'
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA ' + error)
        }
    }
}

export default BookControllers
