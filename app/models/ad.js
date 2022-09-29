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

    // as a user
    async getUserAds(user_id) {
      const result = await client.query(
        `
          SELECT * FROM ad
          WHERE user_id = $1;
        `, [user_id]
      );
      return result.rows;
    },

    /*
    ? La création de l'annonce en DB est OK mais comment faire pour récupérer le user_id, condtion_id, type_id le front peut il faire un menu déroulant et en fonction de ce qui est selectionné nous renvoyer dans la requete l'id correspondant exemple : {
        "id": 13,
        "title": "Annonce test5",
        "postal_code": "75000",
        "image": "piano-g21108bd16_1280.jpg",
        "description": "Test5 de création d'une annonce avec une image de piano",
        ?"user_id": 2,
        ?"condition_id": 2,
        ?"type_id": 2,
        "created_at": "2022-09-29T16:54:23.486Z",
        "updated_at": "2022-09-29T16:54:23.486Z"
    }
    */ 
    async createUserAd(ad) {
      const result = await client.query(
        `
        INSERT INTO "ad"
        (title, postal_code, image, description, user_id, condition_id, type_id)
        VALUES
        ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
        `, [ad.title, ad.postal_code, ad.image, ad.description, ad.user_id, ad.condition_id, ad.type_id],
      );
      return result.rows;
    }
}


module.exports = adDataMapper


