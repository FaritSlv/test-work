import BookModels from '../models/BookModels.js'

class BookControllers {
    async index(ctx) {
        const query = ctx.request.body
        const book = new BookModels()

        try {
            let result = await book.list(query)
            ctx.body = result
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA ' + error)
        }
    }
    async edit(ctx) {
        const query = ctx.request.body
        const book = new BookModels()

        try {
            let result = {"edit": "tue"};
            ctx.body = result
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA ' + error)
        }
    }
    async create(ctx) {
        const query = ctx.request.body
        const book = new BookModels()

        try {
            let result = await book.insert(query);
            ctx.body = result
        } catch (error) {
            console.log(error)
            ctx.throw(400, 'INVALID_DATA ' + error)
        }
    }
}

export default BookControllers
