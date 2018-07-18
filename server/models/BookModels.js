import TableClass from '../libs/TableClass.js'

class BookModels {
    constructor() {
        this._books = []
        this._pagination = {}
    }

    get books() {
        return this._books
    }

    get pagination() {
        return this._pagination
    }

    async list(request) {
        try {
            let table = new TableClass('books')
            table.page = request.page || 1
            table.orders = {'id': 'desc'}
            await table.selectQuery(true)
            let rows = table.rows
            if (rows.length > 0) {
                this._books = rows.map((row) => {
                    row.date = row.date.toString().replace(/(\d{4})(\d{2})(\d{2})/, '$3.$2.$1')
                    return row
                })
                this._pagination = table.pagination
            }

        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    async insert(request) {
        try {
            let table = new TableClass('books')
            await table.insertQuery(request)
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }
}

export default BookModels