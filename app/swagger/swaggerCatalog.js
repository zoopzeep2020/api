module.exports.swaggerCatalog = function () {
    /**
   * @swagger
   * /catalogs:
   *   get:
   *     tags:
   *       - Catalogue
   *     description: activity object
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: Authorization
   *         description: token authorization
   *         in: header
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: object of activity".     
   */

   /**
   * @swagger
   * /catalogs/{catalogId}:
   *   get:
   *     tags:
   *       - Catalogue
   *     description: activity object
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: Authorization
   *         description: token authorization
   *         in: header
   *         required: true
   *         type: string
   *       - name: catalogId
   *         description: catalogId
   *         in: path
   *         type: string
   *     responses:
   *       200:
   *         description: object of activity".     
   */

   /**
   * @swagger
   * /catalogs/store/{storeId}:
   *   get:
   *     tags:
   *       - Catalogue
   *     description: activity object
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: Authorization
   *         description: token authorization
   *         in: header
   *         required: true
   *         type: string
   *       - name: storeId
   *         description: storeId
   *         in: path
   *         type: string
   *     responses:
   *       200:
   *         description: object of activity".     
   */

   /**
   * @swagger
   * /catalogs/search?{search}:
   *   get:
   *     tags:
   *       - Catalogue
   *     description: activity object
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: Authorization
   *         description: token authorization
   *         in: header
   *         required: true
   *         type: string
   *       - name: search
   *         description: search
   *         in: path
   *         type: string
   *     responses:
   *       200:
   *         description: object of activity".     
   */

   /**
  * @swagger
  * /catalogs/featurecatalog?{lang}&{lat}:
  *   get:
  *     tags:
  *       - Catalogue
  *     description: activity object
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: Authorization
  *         description: token authorization
  *         in: header
  *         required: true
  *         type: string
  *       - name: lang
  *         description: lang
  *         in: query
  *         type: number
  *       - name: lat
  *         description: lat
  *         in: query
  *         type: number
  *     responses:
  *       200:
  *         description: object of activity".     
  */

   /**
   * @swagger
   * /catalogs:
   *   post:
   *     tags:
   *       - Catalogue
   *     description: activity object
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: Authorization
   *         description: token authorization
   *         in: header
   *         required: true
   *         type: string
   *       - name: Content-Type
   *         description: content-type
   *         in: header
   *         required: true
   *         type: string
   *         default: application/json
   *       - name: storeId
   *         description: storeId
   *         in: body
   *         required: true
   *         type: string
   *       - name: catalogUrl
   *         description: catalogUrl
   *         in: body
   *         required: true
   *         type: string
   *       - name: catalogDescription
   *         description: catalogDescription
   *         in: body
   *         required: true
   *         type: string
   *         schema:
   *          $ref: '#/definitions/catalogModel'
   *     responses:
   *       200:
   *         description: object of activity".
   */

   /**
   * @swagger
   * /catalogs/{catalogId}:
   *   delete:
   *     tags:
   *       - Catalogue
   *     description: activity object
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: Authorization
   *         description: token authorization
   *         in: header
   *         required: true
   *         type: string
   *       - name: Content-Type
   *         description: content-type
   *         in: header
   *         required: true
   *         type: string
   *         default: application/json
   *       - name: catalgId
   *         description: catalogId
   *         in: path
   *         type: string
   *     responses:
   *       200:
   *         description: object of activity".
   */

   /**
   * @swagger
   * /catalogs/{catalogId}:
   *   put:
   *     tags:
   *       - Catalogue
   *     description: activity object
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: Authorization
   *         description: token authorization
   *         in: header
   *         required: true
   *         type: string
   *       - name: Content-Type
   *         description: content-type
   *         in: header
   *         required: true
   *         type: string
   *         default: application/json
   *       - name: storeId
   *         description: storeId
   *         in: body
   *         type: string
   *       - name: catalogUrl
   *         description: catalogUrl
   *         in: body
   *         type: string
   *       - name: catalogDescription
   *         description: catalogDescription
   *         in: body
   *         type: string
   *         schema:
   *          $ref: '#/definitions/catalogModel'
   *     responses:
   *       200:
   *         description: object of activity".
   */

   /**
  * @swagger
  * definition:
  *   catalogModel:
  *     properties:
  *       storeId:
  *         type: string
  *         required: true
  *       catalogUrl:
  *         type: string
  *         required: true
  *       catalogDescription:
  *         type: string
  *         required: true
  */
}