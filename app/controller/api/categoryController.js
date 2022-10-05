const categoryDataMapper = require("../../models/category");
const debug = require("debug")("app:Debug");
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
      if (categories.rowsCount === 0) {
        return res.status(204).json({
          status: "Nous n'avons trouvé aucun profil d'utilisateur.",
        });
      }
      return res.json(categories);
    } catch (err) {
      debug(err);
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
      if (editCategory.rowCount === 0) {
        res
          .status(304)
          .json({ message: "Votre categorie n'a pas pu être modifiée." });
      }
      return res.json(editCategory);
    } catch (err) {
      debug(err);
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
      if (deleteCategory.rowsCount !== []) {
        return res.status(304).json({
          status: "Votre catégorie n'a pas pu être supprimée",
        });
      }
      return res.json(deleteCategory);
    } catch (err) {
      debug(err);
      res.status(500).json(err.toString());
    }
  },
};

module.exports = categoryController;
