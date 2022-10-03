const adDataMapper = require("../../models/ad");

const adController = {
  /**
   * Ad controller to get all ads
   * @param {*} _ Express request object (not used)
   * @param {*} res Express response object
   * @returns Route API JSON response
   */
  async getAll (_, res) {
    const ads = await adDataMapper.getAll();
    return res.json(ads);
  },
  /**
   * Ad controller to get ad by category
   * @param {*} req Express request object
   * @param {*} res Express response object
   * @returns Route API JSON response
   */
  async getAllByCategory (req, res) {
    const adsByCategory = await adDataMapper.getAllByCategory(req.params.category_id);
    return res.json(adsByCategory);
  },
  /**
   * Ad controller to get ad by user
   * @param {*} req Express request object
   * @param {*} res Express response object
   * @returns Route API JSON response
   */
  async getAllByUser (req, res) {
    const adsByUser = await adDataMapper.getAllByUser(req.params.user_id);
    return res.json(adsByUser);
  },
  
  async getUserAds (req, res) {
    const userAds = await adDataMapper.getUserAds(req.params.user_id);
    return res.json(userAds);
  },
  /**
   * Ad controller creation ad by user
   * @param {*} req Express request object
   * @param {*} res Express response object
   * @returns Route API JSON response
   */
  async createUserAd (req, res) {
    const userAd = await adDataMapper.createUserAd(req.body);
    return res.json(userAd);
  },
  /**
   * Ad controller to get ad by type
   * @param {*} req Express request object
   * @param {*} res Express response object
   * @returns Route API JSON response
   */
  async getAllByType(req, res) {
    const adsByType = await adDataMapper.getAllByType(req.params.type_id);
    return res.json(adsByType);
  },
  /**
   * Ad controller to get one and five similar ads
   * @param {*} req Express request object
   * @param {*} res Express response object
   * @returns Route API JSON response
   */
  async getOneWithSimilar(req, res) {
    const ad = await adDataMapper.getOneWithSimilar(req.params.id);
    debug(ad);
    return res.json(ad);
    // manipuler debug(similarCandidates) avec javascript pour créer un object similar puis créer un json qui contient à la fois ad et similar puis le renvoyer
    
  },
  /**
   * Ad controller to delete ad
   * @param {*} req Express request object
   * @param {*} res Express response object
   * @returns Route API JSON response
   */
   async delete(req, res) {
    const deleteAd = await adDataMapper.delete(req.params.id);
    return res.json(deleteAd);
  },
  /**
   * Ad controller to update ad
   * @param {*} req Express request object
   * @param {*} res Express response object
   * @returns Route API JSON response
   */
  async edit(req, res) {
    const savedAd = await adDataMapper.edit(req.params.id, req.body);
    return res.json(savedAd);
  }
};

module.exports = adController;
