const adDataMapper = require("../../models/ad");

const adController = {
  /**
 * @api {get} /api/annonces All
 * @apiName GetAll
 * @apiGroup Ad
 * @apiVersion 1.0.0
 * 
 * @apiSuccess {Object} returns all ads
 * @apiSuccessExample Succes-Response:
 *    [
      {
          "id": 6,
          "title": "Ad example apidoc category_id",
          "postal_code": "01000",
          "image": "nameOfImage",
          "description": "Description ad",
          "user_id": 1,
          "condition_id": 2,
          "type_id": 1,
          "category_id": 1,
          "created_at": "2022-09-30T17:11:44.736Z",
          "updated_at": "2022-09-30T17:11:44.736Z"
      },
      {
          "id": 7,
          "title": "Ad2 example apidoc category_id",
          "postal_code": "01000",
          "image": "nameOfImage",
          "description": "Description ad2",
          "user_id": 3,
          "condition_id": 1,
          "type_id": 2,
          "category_id": 1,
          "created_at": "2022-09-30T17:20:23.176Z",
          "updated_at": "2022-09-30T17:20:23.176Z"
      }
    ]
 */
  async getAll (_, res) {
    const ads = await adDataMapper.getAll();
    return res.json(ads);
  },
  /**
 * @api {get} /api/annonces/category/:category_id All by category_id
 * @apiName GetAllByCategory
 * @apiGroup Ad
 * @apiVersion 1.0.0
 * 
 * @apiParam {Number} category_id Category unique identifier
 * 
 * @apiSuccess {Object} returns all ads with category_id parameter of query
 * @apiSuccessExample Succes-Response:
 *  [
      {
          "id": 6,
          "title": "Ad example apidoc category_id",
          "postal_code": "01000",
          "image": "nameOfImage",
          "description": "Description ad",
          "user_id": 1,
          "condition_id": 2,
          "type_id": 1,
          "category_id": 1,
          "created_at": "2022-09-30T17:11:44.736Z",
          "updated_at": "2022-09-30T17:11:44.736Z"
      },
      {
          "id": 7,
          "title": "Ad2 example apidoc category_id",
          "postal_code": "01000",
          "image": "nameOfImage",
          "description": "Description ad2",
          "user_id": 3,
          "condition_id": 1,
          "type_id": 2,
          "category_id": 1,
          "created_at": "2022-09-30T17:20:23.176Z",
          "updated_at": "2022-09-30T17:20:23.176Z"
      }
    ]
 */
  async getAllByCategory (req, res) {
    const adsByCategory = await adDataMapper.getAllByCategory(req.params.category_id);
    return res.json(adsByCategory);
  },
  /**
 * @api {get} /api/annonces/user/:user_id All by user_id
 * @apiName GetAllByUser
 * @apiGroup Ad
 * @apiVersion 1.0.0
 * 
 * @apiParam {Number} user_id User unique identifier
 * 
 * @apiSuccess {Object} returns all ads with user_id parameter of query
 * @apiSuccessExample Succes-Response:
 *    [
      {
          "id": 6,
          "title": "Ad example apidoc user_id",
          "postal_code": "01000",
          "image": "nameOfImage",
          "description": "Description ad",
          "user_id": 3,
          "condition_id": 1,
          "type_id": 2,
          "category_id": 5,
          "created_at": "2022-09-30T17:11:44.736Z",
          "updated_at": "2022-09-30T17:11:44.736Z"
      },
      {
          "id": 7,
          "title": "Ad2 example apidoc user_id",
          "postal_code": "01000",
          "image": "nameOfImage",
          "description": "Description ad2",
          "user_id": 3,
          "condition_id": 2,
          "type_id": 1,
          "category_id": 2,
          "created_at": "2022-09-30T17:20:23.176Z",
          "updated_at": "2022-09-30T17:20:23.176Z"
      }
    ]
 */
  async getAllByUser (req, res) {
    const adsByUser = await adDataMapper.getAllByUser(req.params.user_id);
    return res.json(adsByUser);
  },

  // as a user
  async getUserAds (req, res) {
    const userAds = await adDataMapper.getUserAds(req.params.user_id);
    return res.json(userAds);
  },
  /**
 * @api {post} /api/users/create-annonces Create
 * @apiName CreateUserAD
 * @apiGroup Ad
 * @apiVersion 1.0.0
 * 
 * @apiSuccess {Object} returns ad
 * @apiSuccessExample Succes-Response:
 *    {
        "id": "mettre un exemple"
      },
 */
  async createUserAd (req, res) {
    const userAd = await adDataMapper.createUserAd(req.body);
    return res.json(userAd);
  },
  /**
   * @api {get} /api/annonces/type/:type_id All by type_id
   * @apiName GetAllByType
   * @apiGroup Ad
   * @apiVersion 1.0.0
   * 
   * @apiParam {Number} type_id Type unique identifier
   * 
   * @apiSuccess {Object} returns all ads with type_id parameter of query
   * @apiSuccessExample Succes-Response:
   *  [
        {
            "id": 6,
            "title": "Ad example apidoc type_id",
            "postal_code": "01000",
            "image": "nameOfImage",
            "description": "Description ad",
            "user_id": 5,
            "condition_id": 2,
            "type_id": 2,
            "category_id": 1,
            "created_at": "2022-09-30T17:11:44.736Z",
            "updated_at": "2022-09-30T17:11:44.736Z"
        },
        {
            "id": 7,
            "title": "Ad2 example apidoc type_id",
            "postal_code": "01000",
            "image": "nameOfImage",
            "description": "Description ad2",
            "user_id": 7,
            "condition_id": 1,
            "type_id": 2,
            "category_id": 3,
            "created_at": "2022-09-30T17:20:23.176Z",
            "updated_at": "2022-09-30T17:20:23.176Z"
        }
      ]
  */
  async getAllByType(req, res) {
    const adsByType = await adDataMapper.getAllByType(req.params.type_id);
    return res.json(adsByType);
  },
  /**
 * @api {get} /api/annonces/:id One With five similar
 * @apiName getOneWithSimilar
 * @apiGroup Ad
 * @apiVersion 1.0.0
 * 
 * @apiParam {Number} id Ad unique identifier
 * 
 * @apiSuccess {Object} returns ad
 * @apiSuccessExample Succes-Response:
 *    {
 *      "id": "mettre un exemple",
 *    }
 */
   async getOneWithSimilar(req, res) {
     const ad = await adDataMapper.getOne(req.params.id);

 const similarCandidates = await adDataMapper.getAll();

     return res.json();
     // manipuler console.log(similarCandidates) avec javascript pour créer un object similar puis créer un json qui contient à la fois ad et similar puis le renvoyer
     
   },
   /**
 * @api {delete} /api/annonces/:id Delete
 * @apiName Delete
 * @apiGroup Ad
 * @apiVersion 1.0.0
 * 
 * @apiParam {Number} id Ad unique identifier
 * 
 * @apiSuccess {Object} returns ad
 * @apiSuccessExample Succes-Response:
 *    {
        "id": "mettre un exemple"
      },
 */
   async delete(req, res) {
    const deleteAd = await adDataMapper.delete(req.params.id);
    return res.json(deleteAd);
  },
  /**
 * @api {patch} /api/annonces/:id Update
 * @apiName Edit
 * @apiGroup Ad
 * @apiVersion 1.0.0
 * 
 * @apiParam {Number} id User unique identifier
 * 
 * @apiSuccess {Object} returns update ad
 */
  async edit(req, res) {
    const savedAd = await adDataMapper.edit(req.params.id, req.body);
    return res.json(savedAd);
  }
};

module.exports = adController;
