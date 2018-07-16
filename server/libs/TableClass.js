import util from 'util'
import _ from 'underscore'

class TableClass {
    constructor(table) {
        this._table = table
        this._fields = ['*']
        this._orders = {}
        this._limit = 9
        this._page = 1
    }

    /**
     *
     * @returns {string[]|*}
     */
    getFields() {
        return this._fields
    }

    /**
     *
     * @returns {string[]|*}
     */
    getOrders() {
        return this._orders
    }

    /**
     *
     * @returns {number|*}
     */
    getPage() {
        return this._page
    }

    /**
     *
     * @returns {number|*}
     */
    getLimit() {
        return this._limit
    }


    /**
     * ["id", "name"]
     * @param params
     */
    fields(params) {
        if (!Array.isArray(params)) {
            throw new Error('Fields is not array')
        }
        if (params.length) {
            this._fields = params
        }
    }

    /**
     * @example {"id": "asc", "name": "desc"}
     * @param params
     */
    orders(params) {
        if (util.isObject(params) === false) {
            throw new Error('Orders is not object')
        }
        let orders = {}
        let key
        for (key in params) {
            let direction = params[key].toLowerCase()
            orders[key] = (['asc', 'desc'].includes(direction) ? direction : 'asc')
        }

        if (Object.keys(orders).length > 0)
            this._orders = orders
    }

    /**
     *
     * @param params
     */
    page(params) {
        let page = parseInt(params)
        if (!isNaN(page)) {
            this._page = page
        }
    }

    /**
     *
     * @param {int} params
     */
    limit(params) {
        this._limit = parseInt(params)
    }

    /**
     *
     * @param withPagination
     * @returns {Promise<{items: *, pagination: *}>}
     */
    async selectQuery(withPagination) {
        let fieldsMap = this._fields.map(value => (value === '*' ? value : '`' + value + '`'))
        let query = ['SELECT ', fieldsMap, ' FROM ', this._table]

        if (Object.keys(this._orders).length > 0) {
            let orders = Object.keys(this._orders).map(function (field) {
                let direction = this._orders[field]
                return field + ' ' + direction
            }, this)
            query.push(' ORDER BY ')
            query = query.concat(orders)
        }
        let pagination = await this.pagination()

        query.push(' LIMIT ', ((pagination.current - 1) * this._limit), ',', this._limit)

        let [rows] = await global.db.execute(query.join(''))
        let result = {
            'items': rows
        }
        if (withPagination === true) {
            result['pagination'] = pagination
        }
        return result
    }

    /**
     * @link https://github.com/KnpLabs/KnpPaginatorBundle/blob/master/Pagination/SlidingPagination.php
     * @returns {Promise<{last: number, current: number|*, first: number, pageCount: number, pageRange: number|*, startPage: number|*, endPage: *, total: number}>}
     */
    async pagination() {
        let [res] = await global.db.execute(`SELECT count(1) as total FROM ${this._table}`)
        let total = parseInt(res[0]['total'])
        let current = this._page
        let pageRange = this._limit
        let pageCount = Math.ceil(total / pageRange)

        let delta, pages, offset, proximity,
            startPage, endPage
        if (pageCount < current) {
            this._page = current = pageCount
        }
        if (pageRange > pageCount) {
            pageRange = pageCount
        }
        delta = Math.ceil(pageRange / 2)
        if (current - delta > pageCount - pageRange) {
            pages = _.range(pageCount - pageRange + 1, pageCount)
        } else {
            if (current - delta < 0) {
                delta = current
            }
            offset = current - delta
            pages = _.range(offset + 1, offset + pageRange)
        }
        proximity = Math.floor(pageRange / 2)
        startPage = current - proximity
        endPage = current + proximity
        if (startPage < 1) {
            endPage = Math.min(endPage + (1 - startPage), pageCount)
            startPage = 1
        }
        if (endPage > pageCount) {
            startPage = Math.max(startPage - (endPage - pageCount), 1)
            endPage = pageCount
        }
        let viewData = {
            'last': pageCount,
            'current': current,
            'first': 1,
            'pageCount': pageCount,
            'pageRange': pageRange,
            'startPage': startPage,
            'endPage': endPage,
            'total': total,
            'pages': pages,
        }
        if (current > 1) {
            viewData['previous'] = current - 1
        }
        if (current < pageCount) {
            viewData['next'] = current + 1
        }
        return viewData
    }

    /**
     *
     * @param data
     * @returns {Promise<void>}
     */
    async insertQuery(data) {
        let d = new Date()
        let dateFormat = '' + d.getFullYear() + ('0'+(d.getMonth()+1)).slice(-2) + ('0' + d.getDate()).slice(-2)

        let fieldsMap = [data.author, data.title, data.description, dateFormat].map((value) => `'${value}'`)
        let sql = ['INSERT ', ' INTO ', this._table, ' (`author`,`title`,`description`, `date`) VALUES ', ' (', fieldsMap.join(',') , ') ']
        await global.db.execute(sql.join(''))
    }
}


export default TableClass