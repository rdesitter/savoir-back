const client = require('../config/db');



const adDataMapper = {

    async getAll() {
        const result = await client.query('SELECT * FROM ad');
        return result.rows;
    },

    async getAllByType(id){
        const result = await client.query('SELECT * FROM ad WHERE type_id = $1', [id])
        return result.rows;
    },

    // async getOneWithSimilar(id){
    //     const result = await client.query('SELECT * FROM holds JOIN ad ON ad.id = holds.ad_id WHERE ad.id = $1 ;', [id])
    //     return result.rows;
    // },


}


module.exports = adDataMapper


