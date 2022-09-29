const { getAllByCategory, getAllByUser } = require('../../models/ad');
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
  async getAllByUser(req, res) {
    const adsByUser = await adDataMapper.getAllByUser(req.params.user_id);
    return res.json(adsByUser);
  }


  
 
};

module.exports = adController;