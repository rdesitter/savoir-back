
const categoryDataMapper = require('../../models/category');

const categoryController = {
  /**
   * Category controller to get all category
   * @param {*} _ Express request object (not used)
   * @param {*} res Express response object
   * @returns Route API JSON response
   */
  async getAll (_, res) {
    const categories = await categoryDataMapper.getAll();
    return res.json(categories);
  },
  /**
   * Category controller to update category
   * @param {*} _ Express request object (not used)
   * @param {*} res Express response object
   * @returns Route API JSON response
   */
  async edit(req, res) {
    const editCategory = await categoryDataMapper.edit(req.params.id);
    return res.json(editCategory);
  },
  /**
   * Category controller to delete category
   * @param {*} _ Express request object (not used)
   * @param {*} res Express response object
   * @returns Route API JSON response
   */
  async delete(req, res) {
    const deleteCategory = await categoryDataMapper.delete(req.params.id);
    return res.json(deleteCategory);
  },

};

module.exports = categoryController;