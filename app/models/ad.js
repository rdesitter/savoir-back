const client = require("../config/db");
const debug = require("debug")("app:Debug");
const adDataMapper = {
  /**
   *
   * @return {Object} Results of query in JSON formatted
   */
  async getAll() {
    try {
      const result = await client.query(
        `
          SELECT * FROM ad
        `
      );
      return result.rows;
    } catch (err) {
      debug(err);
    }
  },
  /**
   *
   * @param {Number} category_id Unique identifier for category
   * @return {Object} Results of query in JSON formatted
   */
  async getAllByCategory(category_id) {
    try {
      const result = await client.query(
        // todo: quelle sont les infos importantes pour le front ?
        `
          SELECT * FROM ad
          WHERE category_id = $1
        `,
        [category_id]
      );
      return result.rows;
    } catch (err) {
      debug(err);
    }
  },
  /**
   *
   * @param {Number} user_id Unique identifier of user
   * @return {Object} Results of query in JSON formatted
   */
  async getAllByUser(user_id) {
    try {
      const result = await client.query(
        // todo: quelle sont les infos importantes pour le front ?
        `
          SELECT * FROM ad
          WHERE user_id = $1;
        `,
        [user_id]
      );
      return result.rows;
    } catch (err) {
      debug(err);
    }
  },
  /**
   *
   * @param {Number} type_id Unique identifier of type
   * @return {Object} Results of query in JSON formatted
   */
  async getAllByType(id) {
    try {
      const result = await client.query("SELECT * FROM ad WHERE type_id = $1", [
        id,
      ]);
      return result.rows;
    } catch (err) {
      debug(err);
    }
  },
  /**
   *
   * @param {Number} id Unique identifier of ad
   * @return {Object} Results of query in JSON formatted
   */
  async getOneWithSimilar(id) {
    try {
      const resultAd = await client.query("SELECT * FROM ad WHERE id = $1", [
        id,
      ]);
      console.log(resultAd.rowCount);
      if (resultAd.rowCount === 0) {
        return null;
      }
      const category = resultAd.rows[0].category_id;
      const resultWithoutID = await client.query(
        `
          SELECT * FROM ad
          WHERE id != $1
          ORDER BY created_at DESC
        `,
        [id]
      );
      let sameCategory = resultWithoutID.rows.filter(
        (sameCategory) => sameCategory.category_id === category
      );
      return {
        post: resultAd.rows[0],
        similarPosts: sameCategory.slice(0, 5),
      };
    } catch (err) {
      debug(err);
    }
  },

  async getAllByTypeAndCategory(type_id, category_id) {
    try {
      const result = await client.query(
        "SELECT * FROM ad WHERE type_id = $1 AND category_id = $2",
        [type_id, category_id]
      );
      return result.rows;
    } catch (err) {
      debug(err);
    }
  },
  /**
   * @async
   * @param {Number} id Unique identifier of ad
   * @return {Object} Result of query in JSON formatted
   */
  async delete(id) {
    try {
      const result = await client.query("DELETE FROM ad WHERE id = $1", [id]);
      return result.rows;
    } catch (err) {
      debug(err);
    }
  },
  /**
   * @param {Object} ad User ad to modify
   * @return {Object} Results of query in JSON formatted
   */

  async createUserAd(ad) {
    try {
      /**
       * @param {String} prop Keys of ad object
       * @return {Array}
       */
      const fields = Object.keys(ad).map((prop, _) => `"${prop}"`);

      /**
       * @param {String} index field index of ad object
       */

      const argument = Object.keys(ad).map((_, index) => `$${index + 1}`);
      debug(argument);
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

      return result.rows[0];
    } catch (err) {
      debug(err);
    }
  },

  /**
   *
   * @param {String} prop fields of table Ad
   * @return {Object} results of query in JSON formatted
   */
  async edit(id, ad) {
    try {
      const fields = Object.keys(ad).map(
        (prop, index) => `"${prop}" = $${index + 1}`
      );

      const values = Object.values(ad);

      const savedAd = await client.query(
        `
              UPDATE "ad" SET
                  ${fields}
              WHERE id = $${fields.length + 1}
              RETURNING *
          `,
        [...values, id]
      );
      debug(savedAd);
      return { modification: savedAd.rows[0], message: "annonce modifiée" };
    } catch (err) {
      debug(err);
    }
  },
};

module.exports = adDataMapper;
