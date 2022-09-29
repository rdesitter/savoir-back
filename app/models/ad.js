const client = require('../config/db')




const adDataMapper = {

    async getAll() {
        const result = await client.query('SELECT * FROM ad');
        return result.rows;
    },


}


module.exports = adDataMapper


