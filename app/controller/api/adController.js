const adDataMapper = require("../../models/ad");

const adController = {

  // as a visitor
  async getAll (_, res) {
    const ads = await adDataMapper.getAll();
    return res.json(ads);
  },
  async getAllByCategory (req, res) {
    const adsByCategory = await adDataMapper.getAllByCategory(req.params.category_id);
    return res.json(adsByCategory);
  },
  async getAllByUser (req, res) {
    const adsByUser = await adDataMapper.getAllByUser(req.params.user_id);
    return res.json(adsByUser);
  },

  // as a user
  async getUserAds (req, res) {
    const userAds = await adDataMapper.getUserAds(req.params.user_id);
    return res.json(userAds);
  },
  async createUserAd (req, res) {
    const userAd = await adDataMapper.createUserAd(req.body);
    return res.json(userAd);
  },

  async getAllByType(req, res) {
    const adsByType = await adDataMapper.getAllByType(req.params.type_id);
    return res.json(adsByType);
  },

   async getOneWithSimilar(req, res) {
     const ad = await adDataMapper.getOne(req.params.id);

 const similarCandidates = await adDataMapper.getAll();

     return res.json();
     // manipuler console.log(similarCandidates) avec javascript pour créer un object similar puis créer un json qui contient à la fois ad et similar puis le renvoyer
     
   },

   async delete(req, res) {
    const deleteAd = await adDataMapper.delete(req.params.id);
    return res.json(deleteAd);
  },

  async edit(req, res) {
    const savedAd = await adDataMapper.edit(req.params.id, req.body);
    return res.json(savedAd);
  }


  

};

module.exports = adController;
