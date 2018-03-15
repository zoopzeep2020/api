module.exports.swaggerMylist = function () {
    /**
   * @swagger
   * /mylists:
   *   post:
   *     tags:
   *       - Mylist
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
   *       - name: listName
   *         description: listName
   *         in: body
   *         required: true
   *         type: string
   *       - name: userId
   *         description: userId
   *         in: body
   *         required: true
   *         type: string
   *       - name: stores
   *         description: offerId
   *         in: body
   *         required: true
   *         type: array
   *         schema:
   *          $ref: '#/definitions/mylistModel'
   *     responses:
   *       200:
   *         description: object of activity".
   */

   /**
    * @swagger
    * /mylists/{mylistId}:
    *   put:
    *     tags:
    *       - Mylist
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
    *       - name: listName
    *         description: listName
    *         in: body
    *         type: string
    *       - name: mylistId
    *         description: mylistId
    *         in: path
    *         required: true
    *         type: string
    *       - name: userId
    *         description: userId
    *         in: body
    *         type: string
    *       - name: stores
    *         description: stores
    *         in: body
    *         type: array
    *         schema:
    *          $ref: '#/definitions/mylistModel'
    *     responses:
    *       200:
    *         description: object of activity".
    */
   /**
    * @swagger
    * /mylists/{mylistId}:
    *   get:
    *     tags:
    *       - Mylist
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
    *       - name: mylistId
    *         description: mylistId
    *         in: path
    *         required: true
    *         type: string
    *     responses:
    *       200:
    *         description: object of activity".
    */
   /**
    * @swagger
    * /mylists:
    *   get:
    *     tags:
    *       - Mylist
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
    *     responses:
    *       200:
    *         description: object of activity".
    */
   /**
    * @swagger
    * /mylists/user/{userId}:
    *   get:
    *     tags:
    *       - Mylist
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
    *       - name: userId
    *         description: userId
    *         in: path
    *         required: true
    *         type: string
    *     responses:
    *       200:
    *         description: object of activity".
    */
   /**
    * @swagger
    * /mylists/useronlymylist/{userId}:
    *   get:
    *     tags:
    *       - Mylist
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
    *       - name: userId
    *         description: userId
    *         in: path
    *         required: true
    *         type: string
    *     responses:
    *       200:
    *         description: object of activity".
    */
   /**
    * @swagger
    * /mylists/{mylistId}:
    *   delete:
    *     tags:
    *       - Mylist
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
    *       - name: mylistId
    *         description: mylistId
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
   *   mylistModel:
   *     properties:
   *       listName:
   *         type: string
   *         required: true
   *       userId:
   *         type: string
   *         required: true
   *       stores:
   *         type: array
   *         items:
   *          type: string
   */
}