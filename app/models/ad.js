const client = require("../config/db");

const adDataMapper = {
  /**
 * @api {get} /api/annonces All
 * @apiName GetAd
 * @apiGroup Ad
 * @apiVersion 1.0.0
 * 
 * @apiSuccess {Object} returns ad
 * @apiSuccessExample Succes-Response:
 *    {
        "id": 3,
        "title": "Langue des signes",
        "postal_code": "40000",
        "image": "image",
        "description": "Bonjour. J’aimerais offrir un cadeau un peu spécial à ma tante pour Noël. Elle est malentendante et j’adorerais pouvoir apprendre les bases du langage des signes pour papoter avec elle le 25 décembre :) Pourriez-vous m’aider ? Je peux me déplacer sur Paris mais je préfèrerais en distanciel.",
        "user_id": 3,
        "condition_id": 2,
        "type_id": 1,
        "category_id": 3,
        "created_at": "2022-09-30T14:32:09.697Z",
        "updated_at": "2022-09-30T14:32:09.697Z"
      },
 */
  async getAll() {
    const result = await client.query(
      `
          SELECT * FROM ad
          `
    );
    return result.rows;
  },

/**
 * @api {get} /api/annonces/category/:category_id All by category_id
 * @apiName GetAllByCategory
 * @apiGroup Ad
 * @apiVersion 1.0.0
 * 
 * @apiParam {Number} category_id Category unique identifier
 * 
 * @apiSuccess {Object} returns ad
 * @apiSuccessExample Succes-Response:
 *    {
        "id": "mettre un exemple"
      },
 */
  async getAllByCategory(category_id) {
    const result = await client.query(
      // todo: quelle sont les infos importantes pour le front ?
      `
          SELECT * FROM holds 
          JOIN ad ON ad.id = holds.ad_id
          WHERE category_id = $1
        `,
      [category_id]
    );
    return result.rows;
  },
/**
 * @api {get} /api/annonces/user/:user_id All by user_id
 * @apiName GetAllByUser
 * @apiGroup Ad
 * @apiVersion 1.0.0
 * 
 * @apiParam {Number} user_id User unique identifier
 * 
 * @apiSuccess {Object} returns ad
 * @apiSuccessExample Succes-Response:
 *    {
        "id": "mettre un exemple"
      },
 */
  async getAllByUser(user_id) {
    const result = await client.query(
      // todo: quelle sont les infos importantes pour le front ?
      `
          SELECT * FROM ad
          WHERE user_id = $1;
        `,
      [user_id]
    );
    return result.rows;
  },

  /**
 * @api {get} /api/annonces/type/:type_id All by type_id
 * @apiName GetAllByType
 * @apiGroup Ad
 * @apiVersion 1.0.0
 * 
 * @apiParam {Number} type_id Type unique identifier
 * 
 * @apiSuccess {Object} returns ad
 * @apiSuccessExample Succes-Response:
 *    {
        "id": "mettre un exemple"
      },
 */
  async getAllByType(id) {
    const result = await client.query("SELECT * FROM ad WHERE type_id = $1", [
      id,
    ]);
    return result.rows;
  },

  /**
 * @api {get} /api/annonces/:id One With five similar
 * @apiName getOneWithSimilar
 * @apiGroup Ad
 * @apiVersion 1.0.0
 * 
 * @apiParam {Number} id Ad unique identifier
 * 
 * @apiSuccess {Object} returns ad
 * @apiSuccessExample Succes-Response:
 *    {
        "id": "mettre un exemple"
      },
 */
  async getOneWithSimilar(id) {
    const resultAd = await client.query("SELECT * FROM ad WHERE id = $1", [id]);
    const resultSimilar = await client.query("SELECT * FROM ad LIMIT 5");
    return [resultAd.rows, resultSimilar.rows];
  },

  /**
 * @api {delete} /api/annonces/:id Delete
 * @apiName Delete
 * @apiGroup Ad
 * @apiVersion 1.0.0
 * 
 * @apiParam {Number} id Ad unique identifier
 * 
 * @apiSuccess {Object} returns ad
 * @apiSuccessExample Succes-Response:
 *    {
        "id": "mettre un exemple"
      },
 */
  async delete(id) {
    const result = await client.query("DELETE FROM ad WHERE id = $1", [id]);
    return result.rows;
  },

  /**
 * @api {post} /api/users/create-annonces Create
 * @apiName CreateUserAD
 * @apiGroup Ad
 * @apiVersion 1.0.0
 * 
 * @apiSuccess {Object} returns ad
 * @apiSuccessExample Succes-Response:
 *    {
        "id": "mettre un exemple"
      },
 */
  async createUserAd(ad) {
    const fields = Object.keys(ad).map((prop) => `"${prop}"`);

    const argument = Object.keys(ad).map((index) => `$${index + 1}`);

    const values = Object.values(ad);

    const result = await client.query(
      `
        INSERT INTO "ad"
        (${fields})
        VALUES
        (${argument})
        RETURNING *
        `,
      [...values]
    );
    return result.rows;
  },

  /**
 * @api {patch} /api/annonces/:id Update
 * @apiName EditUserAd
 * @apiGroup Ad
 * @apiVersion 1.0.0
 * 
 * @apiParam {Number} id User unique identifier
 * 
 * @apiSuccess {Object} returns update ad
 */
  async edit(id, ad) {
    const fields = Object.keys(ad).map((prop, index) => `"${prop}" = $${index + 1}`);
    console.log(fields)
    const values = Object.values(ad);
    console.log(values)

    const savedAd = await client.query(
        `
            UPDATE "ad" SET
                ${fields}
            WHERE id = $${fields.length + 1}
            RETURNING *
        `,
        [...values, id],
    );

    return savedAd.rows[0];
},


};

module.exports = adDataMapper;
