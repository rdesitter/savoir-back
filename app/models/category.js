const client = require('../config/db')

const categoryDataMapper = {

    async getAll() {
        const result = await client.query(
          // todo: quelle sont les infos importantes pour le front ?
          `
            SELECT *
            FROM category
          `
        );
        return result.rows;
    },
}


module.exports = categoryDataMapper
