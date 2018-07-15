module.exports = {
    app: {
        name: 'test-work',
        version: '0.0.1'
    },
    server: {
        port: 3000
    },
    books: {
        tableName: 'books'
    },
    proxy: {
        port: 3001
    },
    database: {
        host: "localhost",
        user: "root",
        password: "root",
        port: "3306",
        database: "library_db"
    }
};