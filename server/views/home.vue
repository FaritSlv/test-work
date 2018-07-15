<template>
    <div class="py-5">
        <div class="container">
            <div class="row justify-content-md-center">
                <div class="col-lg-12 col-md-auto">
                    <div style="text-align: center">
                        <blockquote class="blockquote text-center">
                            <h1 class="mb-0">Задача:</h1>
                            <footer class="blockquote-footer">Создать <strong title="Библиотека книг"><em>"Библиотеку книг"</em></strong></footer>
                        </blockquote>
                    </div>

                    <h4>Требования:</h4>
                    <ul>
                        <li>Koa2</li>
                        <li>Vue js</li>
                        <li>Socket.io</li>
                        <li>Вывод из БД MySql</li>
                        <li>Возможность создание/редакитрование книги</li>
                        <li>Фильтрация,сортировка данных</li>
                    </ul>

                    <p>Не хотел создавать базу c
                        <mark>фейковыми данными</mark>.
                        <br/> Нашел отличный список (на момент создания база из ~188т. записей) <a href="http://api.knigafund.ru/api/doc" target="_blank">Книгафонд API</a></p>
                    <router-link class="btn btn-lg btn-outline-success btn-block" to="/books"><i class="fa fa-book"></i> Смотреть библиотеку</router-link>
                </div>
            </div>
        </div>
    </div>
</template>