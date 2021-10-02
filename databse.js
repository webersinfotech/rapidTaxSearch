const knex = require('knex')({
    client: 'mysql',
    connection: {
        host:'google-account.cmlfk75xsv3h.ap-south-1.rds.amazonaws.com', 
        user: 'shahrushabh1996', 
        database: 'rapidTax',
        password: '11999966',
        ssl: 'Amazon RDS'
    }
});
const { attachPaginate } = require('knex-paginate');
attachPaginate();

class Database {
    constructor() {}

    async countRows(table) {
        return knex(table).count('id', {as: 'total'})
    }

    async getRowsPageWise({
        where,
        columns,
        table,
        perPage,
        currentPage
    }) {
        return knex.select(...columns).from(table).where(where).paginate({ perPage, currentPage })
    }

    async getRows({
        where,
        columns,
        table
    }) {
        return knex.select(...columns).from(table).where(where).whereNotNull(columns[1]) 
    }
}

module.exports = new Database()