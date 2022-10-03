const client = require('../config/db');



const userDataMapper = {
  async getAllUsers() {
    try {
      const users = await client.query('SELECT * FROM "user"');
      return {
        users: users.rows
      };
    } catch (err) {
      debug(err);
    }
  },

  async edit(id, user) {
      const fields = Object.keys(user).map((prop, index) => `"${prop}" = $${index + 1}`);
      console.log(fields)
      const values = Object.values(user);
      console.log(values)

      const savedUser = await client.query(
          `
              UPDATE "user" SET
                  ${fields}
              WHERE id = $${fields.length + 1}
              RETURNING *
          `,
          [...values, id],
      );

      return savedUser.rows[0];
  },

  async delete(id){
      const result = await client.query('DELETE FROM "user" WHERE id = $1', [id])
      return result.rows;
  },
};


module.exports = userDataMapper