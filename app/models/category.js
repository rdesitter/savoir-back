
const client = require('../config/db')

const categoryDataMapper = {
  /**
   * 
   * @return {object} Result of query in JSON formatted
   */
  async getAll() {
      const result = await client.query(
        // todo: quelle sont les infos importantes pour le front ?
        `
          SELECT *
          FROM category
        `
      );
      return result.rows;
  },
  /**
   * 
   * @param {*} id 
   * @param {*} category 
   */
  async edit(id, category) {
      
  },
  /**
   * @param {number} id Unique identifier for delete category
   * @return {object} Result of query in JSON formatted
   */
  async delete(id){
      const result = await client.query('DELETE FROM category WHERE id = $1', [id])
      return result.rows;
  },

   
}


module.exports = categoryDataMapper

