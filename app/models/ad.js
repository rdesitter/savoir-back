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

    async getOneWithSimilar(id){
        const resultAd = await client.query('SELECT * FROM ad WHERE id = $1',[id])
        const resultSimilar = await client.query('SELECT * FROM ad LIMIT 5',)
        return [resultAd.rows, resultSimilar.rows];
    },

    async delete(id){
        const result = await client.query('DELETE FROM ad WHERE id = $1', [id])
        return result.rows;
    },



}


module.exports = adDataMapper


