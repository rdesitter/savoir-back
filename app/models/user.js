const client = require('../config/db');



const userDataMapper = {

    async edit(id, user) {
        
    },

    async delete(id){
        const result = await client.query('DELETE FROM "user" WHERE id = $1', [id])
        return result.rows;
    },

   


}


module.exports = userDataMapper