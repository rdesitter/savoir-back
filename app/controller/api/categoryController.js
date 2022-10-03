const categoryDataMapper = require("../../models/category");

const categoryController = {
  /**
   * Category controller to get all category
   * @param {*} _ Express request object (not used)
   * @param {*} res Express response object
   * @returns Route API JSON response
   */
  async getAll(_, res) {
    try {
      const categories = await categoryDataMapper.getAll();
      return res.json(categories);
    } catch (err) {
      console.trace(err);
      res.status(500).json(err.toString());
    }
  },
  /**
   * Category controller to update category
   * @param {*} _ Express request object (not used)
   * @param {*} res Express response object
   * @returns Route API JSON response
   */
  async edit(req, res) {
    try {
      const editCategory = await categoryDataMapper.edit(req.params.id);
      return res.json(editCategory);
    } catch (err) {
      console.trace(err);
      res.status(500).json(err.toString());
    }
  },
  /**
   * Category controller to delete category
   * @param {*} _ Express request object (not used)
   * @param {*} res Express response object
   * @returns Route API JSON response
   */
  async delete(req, res) {
    try {
      const deleteCategory = await categoryDataMapper.delete(req.params.id);
      return res.json(deleteCategory);
    } catch (err) {
      console.trace(err);
      res.status(500).json(err.toString());
    }
  },
};

module.exports = categoryController;
