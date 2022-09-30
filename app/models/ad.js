
const client = require('../config/db')

const adDataMapper = {
    // as a visitor
    async getAll() {
        const result = await client.query(
          `
          SELECT * FROM ad
          `
        );
        return result.rows;
    },

    async getAllByCategory(category_id) {
      const result = await client.query(
        // todo: quelle sont les infos importantes pour le front ?
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
        // todo: quelle sont les infos importantes pour le front ?
        `
          SELECT * FROM ad
          WHERE user_id = $1;
        `, [user_id]
      );
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



    // as a user
    async createUserAd(ad) {
      const result = await client.query(
        `
        INSERT INTO "ad"
        (title, postal_code, image, description, user_id, condition_id, type_id, category_id)
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
        `, [ad.title, ad.postal_code, ad.image, ad.description, ad.user_id, ad.condition_id, ad.type_id, ad.category_id],
      );
      return result.rows;
    }
}


module.exports = adDataMapper


