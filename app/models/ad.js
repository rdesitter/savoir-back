const client = require('../config/db')

const adDataMapper = {

    async getAll() {
        const result = await client.query('SELECT * FROM ad');
        return result.rows;
    },
    async getAllByCategory(category_id) {
      const result = await client.query(
        `
          SELECT * FROM holds 
          JOIN ad ON ad.id = holds.ad_id
          WHERE category_id = $1
        `, [category_id]
      );
      return result.rows;
    },
    async getAllByUser(user_id) {
      const result = await client.query(
        `
          SELECT * FROM ad
          WHERE user_id = $1;
        `, [user_id]
      );
      return result.rows;
    }


}


module.exports = adDataMapper


