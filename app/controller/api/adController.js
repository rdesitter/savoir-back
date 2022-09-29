const adDataMapper = require('../../models/ad');

const adController = {
  async getAll (_, res) {

    const ads = await adDataMapper.getAll();
        return res.json(ads);

    
  }

  
 
};

module.exports = adController;