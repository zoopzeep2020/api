module.exports.swaggerCity = function () {
    /**
    * @swagger
    * /cities:
    *   get:
    *     tags:
    *       - City
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
    * /cities/searchByWord?{search}:
    *   get:
    *     tags:
    *       - City
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
    *       - name: search
    *         description: search
    *         in: query
    *         required: true
    *         type: string
    *     responses:
    *       200:
    *         description: object of activity".     
    */
   /**
   * @swagger
   * /cities/searchByLongLat?{lng}&{lat}:
   *   get:
   *     tags:
   *       - City
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
   *       - name: search
   *         description: name of city which you want to search 
   *         in: query
   *         required: true
   *         type: string
   *       - name: lng
   *         description: longitude of city
   *         in: query
   *         required: true
   *         type: number
   *       - name: lat
   *         description: latitude of city
   *         in: query
   *         required: true
   *         type: number
   *     responses:
   *       200:
   *         description: object of activity".     
   */
   /**
    * @swagger
    * /cities:
    *   post:
    *     tags:
    *       - City
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
    *       - name: cityName
    *         description: cityName
    *         in: body
    *         required: true
    *         type: string
    *       - name: cityState
    *         description: cityState
    *         in: body
    *         required: true
    *         type: string
    *       - name: location
    *         description: location
    *         in: body
    *         required: true
    *         type: array
    *         schema:
    *          $ref: '#/definitions/cityModel'
    *     responses:
    *       200:
    *         description: object of activity".
    */
       /**
    * @swagger
    * /cities/{cityId}:
    *   put:
    *     tags:
    *       - City
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
    *       - name: cityId
    *         description: cityId
    *         in: path
    *         required: true
    *         type: string
    *       - name: cityName
    *         description: cityName
    *         in: body
    *         required: true
    *         type: string
    *       - name: cityState
    *         description: cityState
    *         in: body
    *         required: true
    *         type: string
    *       - name: location
    *         description: location
    *         in: body
    *         required: true
    *         type: array
    *         schema:
    *          $ref: '#/definitions/cityModel'
    *     responses:
    *       200:
    *         description: object of activity".
    */
   /**
   * @swagger
   * /cities/{cityId}:
   *   delete:
   *     tags:
   *       - City
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
   *       - name: cityId
   *         description: cityId
   *         in: path
   *         required: true
   *         type: string
   *         schema:
   *          $ref: '#/definitions/cityModel'
   *     responses:
   *       200:
   *         description: object of activity".
   */
   /**
    * @swagger
    * /cities/{cityId}:
    *   get:
    *     tags:
    *       - City
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
    *       - name: cityId
    *         description: cityId
    *         in: path
    *         required: true
    *         type: string
    *     responses:
    *       200:
    *         description: object of activity".     
    */
        /**
        * @swagger
        * definition: 
        *   UpdateActivitiesObj:
        *     properties:
        *       cityName:
        *         type: string
        *         required: true
        *       cityState:
        *         type: string
        *         required: true
        *       location:
        *         type: array
        *         required: true
        */
}