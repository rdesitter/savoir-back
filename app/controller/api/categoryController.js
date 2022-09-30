
const categoryDataMapper = require('../../models/category');

const categoryController = {
  async getAll (_, res) {
    const categories = await categoryDataMapper.getAll();
    return res.json(categories);
  },

  async edit(req, res) {
    const editCategory = await categoryDataMapper.edit(req.params.id);
    return res.json(editCategory);
  },

  async delete(req, res) {
    const deleteCategory = await categoryDataMapper.delete(req.params.id);
    return res.json(deleteCategory);
  },

};

module.exports = categoryController;