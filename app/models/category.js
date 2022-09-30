const client = require('../config/db');



const categoryDataMapper = {

    async edit(id, category) {
        
    },

    async delete(id){
        const result = await client.query('DELETE FROM category WHERE id = $1', [id])
        return result.rows;
    },

   


}


module.exports = categoryDataMapper