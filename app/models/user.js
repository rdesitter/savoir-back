const client = require('../config/db');



const userDataMapper = {

    async edit(id, user) {
        const fields = Object.keys(user).map((prop, index) => `"${prop}" = $${index + 1}`);
        debug(fields)
        const values = Object.values(user);
        debug(values)

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

   


}


module.exports = userDataMapper