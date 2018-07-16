<template>
    <div>
        <blockquote class="blockquote text-center">
            <h1 class="mb-0">Добавить новую книгу</h1>
        </blockquote>

        <div class="py-5 bg-light">
            <div class="container">
                <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                    <b-form-group id="titleGroup"
                                  label="Заголовок:"
                                  label-for="titleInput">
                        <b-form-input id="titleInput"
                                      type="text"
                                      v-model="form.title"
                                      required
                                      placeholder="Введите заголовок">
                        </b-form-input>
                    </b-form-group>
                    <b-form-group id="authorGroup"
                                  label="Автор:"
                                  label-for="authorInput"
                                  description="Добавьте автора">
                        <b-form-input id="authorInput"
                                      type="author"
                                      v-model="form.author"
                                      required
                                      placeholder="Введите автора">
                        </b-form-input>
                    </b-form-group>
                    <b-form-group id="descriptionGroup"
                                  label="Описание:"
                                  label-for="descriptionInput">
                        <b-form-textarea id="descriptionInput"
                                         v-model="form.description"
                                         placeholder="Введите описание"
                                         required
                                         :rows="3"
                                         :max-rows="6">
                        </b-form-textarea>
                    </b-form-group>
                    <b-button type="submit" variant="primary">Отправить</b-button>
                    <b-button type="reset" variant="danger">Сбросить</b-button>
                    <router-link class="btn btn-link" :to="{ path: '/books'}" exact>Назад</router-link>
                </b-form>
            </div>
        </div>
    </div>
</template>

<script>
    import bookService from '../../services/books'
    export default {
        name: "new",
        data () {
            return {
                form: {
                    author: '',
                    title: '',
                    description: '',
                },
                show: true
            }
        },
        methods: {
            onSubmit (evt) {
                evt.preventDefault();
                const _self = this;

                bookService.create(this, this.form).then(() => {
                    _self.$router.push('/books');
                }, function(e){
                    alert(e.message);
                });
            },
            onReset (evt) {
                evt.preventDefault();
                /* Reset our form values */
                this.form.author = '';
                this.form.title = '';
                this.form.description = '';
                /* Trick to reset/clear native browser form validation state */
                this.show = false;
                this.$nextTick(() => { this.show = true });
            }
        }
    }
</script>

<style scoped>

</style>