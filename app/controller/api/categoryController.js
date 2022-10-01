
const categoryDataMapper = require('../../models/category');

const categoryController = {
  /**
 * @api {get} /api/categories All
 * @apiName getAll
 * @apiGroup Categories
 * @apiVersion 1.0.0
 * 
 * @apiSuccess {Object} returns categories
 * @apiSuccessExample Succes-Response:
 *    {
        "id": "mettre un exemple"
      },
 */
  async getAll (_, res) {
    const categories = await categoryDataMapper.getAll();
    return res.json(categories);
  },

  /**
 * @api {patch} /api/categories/:id Update
 * @apiName EditCategories
 * @apiGroup Categories
 * @apiVersion 1.0.0
 * 
 * @apiParam {Number} id User unique identifier
 * 
 * @apiSuccess {Object} returns update ad
 */
  async edit(req, res) {
    const editCategory = await categoryDataMapper.edit(req.params.id);
    return res.json(editCategory);
  },

  /**
 * @api {delete} /api/categories/:id Delete one categories
 * @apiName deleteCategory
 * @apiGroup Categories
 * @apiVersion 1.0.0
 * 
 * @apiParam {Number} id The category unique identifier
 * 
 * @apiSuccess {Object} returns categories
 * @apiSuccessExample Succes-Response:
 *    {
        "id": "mettre un exemple"
      }
 */
  async delete(req, res) {
    const deleteCategory = await categoryDataMapper.delete(req.params.id);
    return res.json(deleteCategory);
  },

};

module.exports = categoryController;