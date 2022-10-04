const client = require("../config/db");
const debug = require("debug")("app:Debug");

const categoryDataMapper = {
  /**
   *
   * @return {object} Result of query in JSON formatted
   */
  async getAll() {
    try {
      const result = await client.query(
        // todo: quelle sont les infos importantes pour le front ?
        `
          SELECT *
          FROM category
        `
      );
      return result.rows;
    } catch (err) {
      debug(err);
    }
  },
  /**
   *
   * @param {*} id
   * @param {*} category
   */
  async edit(id, category) {},
  /**
   * @param {number} id Unique identifier for delete category
   * @return {object} Result of query in JSON formatted
   */
  async delete(id) {
    try {
      const result = await client.query("DELETE FROM category WHERE id = $1", [
        id,
      ]);
      return result.rows;
    } catch (err) {
      debug(err);
    }
  },
};

module.exports = categoryDataMapper;
