import BookControllers from '../../controllers/BookControllers'
const books = new BookControllers()

exports.all = async (ctx) => {
    await books.index(ctx)
}