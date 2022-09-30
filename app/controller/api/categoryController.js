const categoryDataMapper = require("../../models/category");

const categoryController = {
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