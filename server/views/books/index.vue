<template>
    <div>
        <blockquote class="blockquote text-center">
            <h1 class="mb-0">Библиотека "<a href="http://knigafund.ru/" target="_blank">Книгафонд</a>"
                <router-link class="btn btn-primary" :to="{ path: '/books/new'}" exact>Добавить книгу</router-link>
            </h1>
        </blockquote>

        <div class="py-5 bg-light">
            <div class="container">
                <div class="my-3 p-3 bg-white rounded box-shadow">
                    <div class="media text-muted pt-3" v-for="book in books">
                        <img v-if="book.image" class="mr-3" v-bind:src="book.image" v-bind:title="book.title"/>
                        <b-media class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                            <div class="d-flex justify-content-between align-items-center w-100">
                                <div>Автор: <strong class="text-gray-dark">{{ book.author }}</strong>, <span>{{ book.date }}</span></div>
                                <div><a class="btn btn-link" href="#">редактировать</a></div>
                            </div>
                            <h5 class="mt-0 mb-1">{{ book.title }}</h5>
                            <div v-html="book.description"></div>
                        </b-media>
                    </div>
                </div>
                <Pagination v-bind="pagination"></Pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import bookService from '../../services/books'
    import Pagination from '../components/pagination'

    export default {
        components: {
            Pagination
        },
        mounted() {
            this.loadBooks();
            this.path = this.$route.path
        },
        data() {
            return {
                books: [],
                pagination: [],
                result: null,
                path: null
            }
        },
        watch: {
            // call again the method if the route changes
            '$route': 'loadBooks'
        },
        methods: {
            loadBooks() {
                bookService.list(this, this.$route.query).then(res => {
                    this.books = res.data.books;
                    this.pagination = res.data.pagination;
                }, e => {
                    alert(e.message);
                });
            }
        },
    }
</script>

<style>
</style>