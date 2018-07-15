<template>
    <nav v-if="pageCount > 1">
        <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: !previous }">
                <template v-if="previous">
                    <router-link class="page-link" :to="{ path: path, query: { page: previous }}" exact><i class="fa fa-angle-left"></i></router-link>
                </template>
                <template v-else>
                    <span class="page-link"><i class="fa fa-angle-left"></i></span>
                </template>
            </li>
            <template v-for="page in pages">
                <li class="page-item" :class="{ active: page === current }">
                    <template v-if="page === current">
                        <span class="page-link">{{ page }}</span>
                    </template>
                    <template v-else>
                        <router-link class="page-link" :to="{ path: path, query: { page: page }}" exact>{{ page }}</router-link>
                    </template>
                </li>
            </template>
            <li class="page-item" :class="{ disabled: !next }">
                <template v-if="next">
                    <router-link class="page-link" :to="{ path: path, query: { page: next }}" exact><i class="fa fa-angle-right"></i></router-link>
                </template>
                <template v-else>
                    <span class="page-link"><i class="fa fa-angle-right"></i></span>
                </template>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
        name: "pagination",
        props: [
            "last",
            "current",
            "first",
            "pageCount",
            "pageRange",
            "startPage",
            "endPage",
            "total",
            "next",
            "pages",
            "previous",
            "next"
        ],
        mounted: function() {
            this.path = this.$route.path
        },
        data() {
            return {
                path: null
            }
        },
    }
</script>

<style scoped>

</style>