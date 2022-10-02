const client = require("../config/db");

const adDataMapper = {
  /**
   * 
   * @return {Object} Results of query in JSON formatted
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
   * 
   * @param {Number} category_id Unique identifier for category
   * @return {Object} Results of query in JSON formatted
   */
  async getAllByCategory(category_id) {
    const result = await client.query(
      // todo: quelle sont les infos importantes pour le front ?
      `
        SELECT * FROM ad
        WHERE category_id = $1
      `,
      [category_id]
    );
    return result.rows;
  },
  /**
   * 
   * @param {Number} user_id Unique identifier of user
   * @return {Object} Results of query in JSON formatted
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
   * 
   * @param {Number} type_id Unique identifier of type
   * @return {Object} Results of query in JSON formatted
   */
  async getAllByType(id) {
    const result = await client.query("SELECT * FROM ad WHERE type_id = $1", [
      id,
    ]);
    return result.rows;
  },
  /**
   * 
   * @param {Number} id Unique identifier of ad
   * @return {Object} Results of query in JSON formatted
   */
  async getOneWithSimilar(id) {
    const resultAd = await client.query("SELECT * FROM ad WHERE id = $1", [id]);
    const resultSimilar = await client.query("SELECT * FROM ad LIMIT 5");
    return [resultAd.rows, resultSimilar.rows];
  },
  /**
   * @async
   * @param {Number} id Unique identifier of ad
   * @return {Object} Result of query in JSON formatted
   */
  async delete(id) {
    const result = await client.query("DELETE FROM ad WHERE id = $1", [id]);
    return result.rows;
  },
  /**
   * 
   * @param {String} ad Unique identifier of table ad
   * @return {Object} Results of query in JSON formatted
  */
  async createUserAd(ad) {
    /**
     * @param {String} fields Fields of table Ad
     */
    const fields = Object.keys(ad).map((prop) => `"${prop}"`);
    /**
     * @param {String} argument Argments to the SQL function
     */
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
   * 
   * @param {String} prop fields of table Ad
   * @return {Object} results of query in JSON formatted
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
