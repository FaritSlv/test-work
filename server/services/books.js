import axios from 'axios'

export default {

    list: (ctx, params) => axios.post('/api/books', params),

    create: (ctx, params) => axios.post('/api/books/new', params)

}
