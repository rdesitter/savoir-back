
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

    async edit(id, category) {
        
    },

    async delete(id){
        const result = await client.query('SELECT * FROM ad WHERE type_id = $1', [type_id])
        return result.rows;
    },

   
}


module.exports = categoryDataMapper

