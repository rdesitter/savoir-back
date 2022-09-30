const adDataMapper = require("../../models/ad");

const adController = {
  async getAll(_, res) {
    const ads = await adDataMapper.getAll();
    return res.json(ads);
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


  
};

module.exports = adController;
