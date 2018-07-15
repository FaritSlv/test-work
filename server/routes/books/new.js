import BookControllers from '../../controllers/BookControllers'
const books = new BookControllers()

exports.all = async (ctx, next) => {
    await books.create(ctx)
}