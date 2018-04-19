module.exports.swaggerCollection = function () {
    /**
     * @swagger
     * /collections:
     *   post:
     *     tags:
     *       - Collection
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
     *       - name: collectionName
     *         description: collectionName
     *         in: body
     *         required: true
     *         type: string
     *       - name: collectionType
     *         description: collectionType
     *         in: body
     *         required: true
     *         type: string
     *       - name: collectionPicture
     *         in: formData
     *         description: The uploaded file of collectionPicture
     *         type: file
     *       - name: catalogId
     *         description: catalogId
     *         in: body
     *         type: array
     *       - name: offerId
     *         description: offerId
     *         in: body
     *         type: array
     *       - name: buisnessOnline
     *         description: buisnessOnline or buisnessOffline must be true
     *         in: body
     *         type: boolean
     *       - name: buisnessOffline
     *         description: buisnessOnline or buisnessOffline must be true
     *         in: body
     *         type: boolean
     *       - name: cityName
     *         description: cityName is array of cities
     *         in: body
     *         type: array
     *       - name: storeId
     *         description: storeId
     *         in: body
     *         type: array
     *         schema:
     *          $ref: '#/definitions/collectionModel'
     *     responses:
     *       200:
     *         description: object of activity".
     */
    /**
     * @swagger
     * /collections/{collectionId}:
     *   put:
     *     tags:
     *       - Collection
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
     *       - name: collectionName
     *         description: collectionName
     *         in: body
     *         required: true
     *         type: string
     *       - name: collectionId
     *         description: collectionId
     *         in: path
     *         required: true
     *         type: string
     *       - name: collectionType
     *         description: collectionType
     *         in: body
     *         required: true
     *         type: string
     *       - name: collectionPicture
     *         in: formData
     *         description: The uploaded file of collectionPicture
     *         type: file
     *       - name: catalogId
     *         description: catalogId
     *         in: body
     *         type: array
     *       - name: offerId
     *         description: offerId
     *         in: body
     *         type: array
     *       - name: storeId
     *         description: storeId
     *         in: body
     *         type: array 
     *       - name: buisnessOnline
     *         description: buisnessOnline or buisnessOffline must be true
     *         in: body
     *         type: boolean
     *       - name: buisnessOffline
     *         description: buisnessOnline or buisnessOffline must be true
     *         in: body
     *         type: boolean
     *       - name: cityName
     *         description: cityName is array of cities
     *         in: body
     *         type: array
     *         schema:
     *          $ref: '#/definitions/collectionModel'
     *     responses:
     *       200:
     *         description: object of activity".
     */
    /**
     * @swagger
     * /collections:
     *   get:
     *     tags:
     *       - Collection
     *     description: activity object
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: Authorization
     *         description: basic authorization
     *         in: header
     *         required: true
     *         type: string
     *         default: maximumvsminimumsecurity
     *     responses:
     *       200:
     *         description: object of activity".     
     */
     /**
     * @swagger
     * /collections/latestcollections:
     *   get:
     *     tags:
     *       - Collection
     *     description: activity object
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: Authorization
     *         description: basic authorization
     *         in: header
     *         required: true
     *         type: string
     *         default: maximumvsminimumsecurity
     *     responses:
     *       200:
     *         description: object of activity".     
     */

    /**
    * @swagger
    * /colections/{collectionId}:
    *   get:
    *     tags:
    *       - Collection
    *     description: activity object
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: Authorization
    *         description: basic authorization
    *         in: header
    *         required: true
    *         type: string
    *         default: maximumvsminimumsecurity
    *       - name: collectionId
    *         description: collectionId
    *         in: path
    *         type: string
    *     responses:
    *       200:
    *         description: object of activity".     
    */
     /**
    * @swagger
    * /colections/{collectionId}:
    *   delete:
    *     tags:
    *       - Collection
    *     description: activity object
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: Authorization
    *         description: basic authorization
    *         in: header
    *         required: true
    *         type: string
    *         default: maximumvsminimumsecurity
    *       - name: collectionId
    *         description: collectionId
    *         in: path
    *         type: string
    *     responses:
    *       200:
    *         description: object of activity".     
    */
    /**
     * @swagger
     * /colections/{collectionId}:
     *   get:
     *     tags:
     *       - Collection
     *     description: activity object
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: Authorization
     *         description: basic authorization
     *         in: header
     *         required: true
     *         type: string
     *         default: maximumvsminimumsecurity
     *       - name: collectionId
     *         description: collectionId
     *         in: path
     *         type: string
     *     responses:
     *       200:
     *         description: object of activity".     
     */
    /**
   * @swagger
   * /colections/search?{location}&{buisnessOnline}&{buisnessOffline}&{buisnessBoth}&{startCollections}&{endCollections}:
   *   get:
   *     tags:
   *       - Collection
   *     description: activity object
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: Authorization
   *         description: basic authorization
   *         in: header
   *         required: true
   *         type: string
   *         default: maximumvsminimumsecurity
   *       - name: location
   *         description: name of location
   *         in: query
   *         type: string
   *       - name: buisnessOnline
   *         description: buisnessOnline
   *         in: query
   *         type: boolean
   *       - name: buisnessOffline
   *         description: buisnessOffline
   *         in: query
   *         type: boolean
   *       - name: buisnessBoth
   *         description: buisnessBoth
   *         in: query
   *         type: boolean
   *       - name: collectionType
   *         description: collectionType
   *         in: query
   *         type: string
   *       - name: startCollections
   *         description: skip collection
   *         in: query
   *         type: integer
   *       - name: endCollections
   *         description: total number of collection
   *         in: query
   *         type: integer
   *     responses:
   *       200:
   *         description: object of activity".     
   */
    /**
    * @swagger
    * definition:
    *   collectionModel:
    *     properties:
    *       collectionName:
    *         type: string
    *         required: true
    *       collectionType:
    *         type: string
    *         required: true
    *       collectionPicture:
    *         type: string
    *         required: true
    *       offerId:
    *         type: array
    *         items:
    *          type: string
    *       catalogId:
    *         type: array
    *         items:
    *          type: string
    *       storeId:
    *         type: array
    *         items:
    *          type: string
    */
}