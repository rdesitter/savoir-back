const categoryDataMapper = require('../../models/category');

const categoryController = {
  async getAll (_, res) {
    const categories = await categoryDataMapper.getAll();
    return res.json(categories);
  },
};

module.exports = categoryController;