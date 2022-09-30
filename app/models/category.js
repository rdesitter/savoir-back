const client = require('../config/db');



const categoryDataMapper = {

    async edit(id, category) {
        
    },

    async delete(id){
        const result = await client.query('SELECT * FROM ad WHERE type_id = $1', [type_id])
        return result.rows;
    },

   


}


module.exports = categoryDataMapper