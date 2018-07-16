import TableClass from '../libs/TableClass.js'

class BookModels {
    async list(request) {
        try {
            let table = new TableClass('books')
            table.page(request.page)
            table.orders({'id': 'desc'})
            let rows = await table.selectQuery(true)
            if (Object.keys(rows['items']).length < 1) {
                return {}
            }
            return {
                books: rows['items'].map(function (row) {
                    row.date = row.date.toString().replace(/(\d{4})(\d{2})(\d{2})/, '$3.$2.$1')
                    return row
                }),
                pagination: rows['pagination']
            }
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    async insert(request) {
        try {
            let table = new TableClass('books')
            return await table.insertQuery(request)
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }
}

export default BookModels