const adDataMapper = require("../../models/ad");
const debug = require('debug')('app:Debug');
const adController = {
  /**
   * Ad controller to get all ads
   * @param {*} _ Express request object (not used)
   * @param {*} res Express response object
   * @returns Route API JSON response
   */
  async getAll(_, res) {
    try {
      const ads = await adDataMapper.getAll();
      return res.json(ads);
    } catch (err) {
      debug(err);
      res.status(500).json(err.toString());
    }
  },
  /**
   * Ad controller to get ad by category
   * @param {*} req Express request object
   * @param {*} res Express response object
   * @returns Route API JSON response
   */
  async getAllByCategory(req, res) {
    try {
      const adsByCategory = await adDataMapper.getAllByCategory(
        req.params.category_id
      );
      return res.json(adsByCategory);
    } catch (err) {
      debug(err);
      res.status(500).json(err.toString());
    }
  },
  /**
   * Ad controller to get ad by user
   * @param {*} req Express request object
   * @param {*} res Express response object
   * @returns Route API JSON response
   */
  async getAllByUser(req, res) {
    try {
      const adsByUser = await adDataMapper.getAllByUser(req.params.user_id);
      return res.json(adsByUser);
    } catch (err) {
      debug(err);
      res.status(500).json(err.toString());
    }
  },

  async getUserAds(req, res) {
    try {
      const userAds = await adDataMapper.getUserAds(req.params.user_id);
      return res.json(userAds);
    } catch (err) {
      debug(err);
      res.status(500).json(err.toString());
    }
  },
  /**
   * Ad controller creation ad by user
   * @param {*} req Express request object
   * @param {*} res Express response object
   * @returns Route API JSON response
   */
  async createUserAd(req, res) {
    try {
      const userAd = await adDataMapper.createUserAd(req.body);
      return res.json(userAd);
    } catch (err) {
      debug(err);
      res.status(500).json(err.toString());
    }
  },
  /**
   * Ad controller to get ad by type
   * @param {*} req Express request object
   * @param {*} res Express response object
   * @returns Route API JSON response
   */
  async getAllByType(req, res) {
    try {
      const adsByType = await adDataMapper.getAllByType(req.params.type_id);
      return res.json(adsByType);
    } catch (err) {
      debug(err);
      res.status(500).json(err.toString());
    }
  },
  /**
   * Ad controller to get one and five similar ads
   * @param {*} req Express request object
   * @param {*} res Express response object
   * @returns Route API JSON response
   */
  async getOneWithSimilar(req, res) {
    try {
      const ad = await adDataMapper.getOneWithSimilar(req.params.id);
      return res.json(ad);
    } catch (err) {
      debug(err);
      res.status(500).json(err.toString());
    }
  },
  /**
   * Ad controller to delete ad
   * @param {*} req Express request object
   * @param {*} res Express response object
   * @returns Route API JSON response
   */
  async delete(req, res) {
    try {
      const deleteAd = await adDataMapper.delete(req.params.id);
      return res.json(deleteAd);
    } catch (err) {
      debug(err);
      res.status(500).json(err.toString());
    }
  },
  /**
   * Ad controller to update ad
   * @param {*} req Express request object
   * @param {*} res Express response object
   * @returns Route API JSON response
   */
  async edit(req, res) {
    try {
      const savedAd = await adDataMapper.edit(req.params.id, req.body);
      return res.json(savedAd);
    } catch (err) {
      debug(err);
      res.status(500).json(err.toString());
    }
  },
};

module.exports = adController;
