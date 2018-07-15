import axios from 'axios'

export default {

    list: function(ctx,params) {
        return axios.post('/api/books', params);
    },

    create: function(ctx,params) {
        return axios.post('/api/books/new', params);
    }

}
