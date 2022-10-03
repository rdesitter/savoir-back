const client = require("../config/db");

const userDataMapper = {
  async edit(id, user) {
    try {
      const fields = Object.keys(user).map(
        (prop, index) => `"${prop}" = $${index + 1}`
      );
      console.log(fields);
      const values = Object.values(user);
      console.log(values);

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
    } catch (err) {
      console.trace(err);
    }
  },

  async delete(id) {
    try {
      const result = await client.query('DELETE FROM "user" WHERE id = $1', [
        id,
      ]);
      return result.rows;
    } catch (err) {
      console.trace(err);
    }
  },
};

module.exports = userDataMapper;
