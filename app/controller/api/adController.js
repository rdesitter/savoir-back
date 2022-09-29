const { getAllByCategory } = require('../../models/ad');
const adDataMapper = require('../../models/ad');

const adController = {
  async getAll (_, res) {
    const ads = await adDataMapper.getAll();
    return res.json(ads);
  },
  async getAllByCategory (req, res) {
    const adsByCategory = await adDataMapper.getAllByCategory(req.params.category_id);
    return res.json(adsByCategory);
  },


  
 
};

module.exports = adController;