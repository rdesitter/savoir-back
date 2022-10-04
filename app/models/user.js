const client = require("../config/db");
const debug = require("debug")("app:Debug");

const userDataMapper = {
  async getAllUsers() {
    try {
      const users = await client.query('SELECT * FROM "user"');
      return {
        users: users.rows,
      };
    } catch (err) {
      debug(err);
    }
  },

  async getUserProfil(id) {
    try {
      const resultUser = await client.query(
        `
            SELECT "user".id, "user".pseudo, "user".email, "user".password, "user".birthdate, "user".pronoun, "user".firstname, "user".lastname, "user".postal_code, "user".description, "user".picture_id, "user".role_id, "user".created_at, "user".updated_at,
            picture.name, picture.slug
            FROM "user"
            JOIN picture ON picture.id = "user".picture_id
            WHERE "user".id = $1;
          `,
        [id]
      );
      const adsOfUser = await client.query(
        `
            SELECT
            ad.id, ad.title, ad.postal_code, ad.image, ad.description, ad.created_at, ad.updated_at,
            category.id AS category_id, category.name AS category_name, category.slug AS category_slug,
            condition.id AS condition_id, condition.name AS condition_name,
            type.id AS type_id, type.name AS type_name
            FROM "ad"
            JOIN "category" ON category.id = ad.category_id
            JOIN "condition" ON condition.id = ad.condition_id
            JOIN "type" ON type.id = ad.type_id
            WHERE user_id = $1;
          `,
        [id]
      );

      return {
        user: resultUser.rows[0],
        adsOfUser: adsOfUser.rows,
      };
    } catch (error) {
      debug(error);
    }
  },

  async edit(id, user) {
    const fields = Object.keys(user).map(
      (prop, index) => `"${prop}" = $${index + 1}`
    );
    debug(fields);
    const values = Object.values(user);
    debug(values);

    const savedUser = await client.query(
      `
                UPDATE "user" SET
                    ${fields}
                WHERE id = $${fields.length + 1}
                RETURNING *
            `,
      [...values, id]
    );

    return savedUser.rows[0];
  },

  async delete(id) {
    try {
      const result = await client.query('DELETE FROM "user" WHERE id = $1', [
        id,
      ]);
      return result.rows;
    } catch (err) {
      debug(err);
    }
  },
};

module.exports = userDataMapper;
