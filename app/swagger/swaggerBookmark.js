
module.exports.swaggerBookmark = function () {
   /**
    * @swagger
    * /bookmarks:
    *   get:
    *     tags:
    *       - Bookmark
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
    * /bookmarks/{bookmarkId}:
    *   get:
    *     tags:
    *       - Bookmark
    *     description: activity object
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: Authorization
    *         description: token authorization
    *         in: header
    *         required: true
    *         type: string
    *       - name: bookmarkId
    *         description: bookmarkId
    *         in: path
    *         required: true
    *         type: string
    *     responses:
    *       200:
    *         description: object of activity".     
    */

    /**
    * @swagger
    * /bookmarks/user/{userId}:
    *   get:
    *     tags:
    *       - Bookmark
    *     description: activity object
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: Authorization
    *         description: token authorization
    *         in: header
    *         required: true
    *         type: string
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
     * /bookmarks:
     *   post:
     *     tags:
     *       - Bookmark
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
     *         in: body
     *         type: string
     *       - name: storeId
     *         description: storeId
     *         in: body
     *         type: string
     *         schema:
     *          $ref: '#/definitions/bookmarkModel'
     *     responses:
     *       200:
     *         description: object of activity".
     */
    /**
     * @swagger
     * /bookmarks/{bookmarkId}:
     *   put:
     *     tags:
     *       - Bookmark
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
     *         in: body
     *         type: string
     *       - name: bookmarkId
     *         description: bookmarkId
     *         in: path
     *         type: string
     *       - name: storeId
     *         description: storeId
     *         in: body
     *         type: string
     *         schema:
     *          $ref: '#/definitions/bookmarkModel'
     *     responses:
     *       200:
     *         description: object of activity".
     */
    /**
    * @swagger
    * /bookmarks/{bookmarkId}:
    *   delete:
    *     tags:
    *       - Bookmark
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
    *       - name: bookmarkId
    *         description: bookmarkId
    *         in: path
    *         type: string
    *     responses:
    *       200:
    *         description: object of activity".
    */
    /**
     * @swagger
     * /bookmakrs/{bookmarkId}:
     *   put:
     *     tags:
     *       - Bookmark
     *     description: activity object
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: Authorization
     *         description: token authorization
     *         in: header
     *         type: string
     *       - name: bookmarkId
     *         description: bookmarkId
     *         in: path
     *         type: string
     *       - name: userId
     *         description: userId
     *         in: body
     *         type: string.0
     *       - name: storeId
     *         description: storeId
     *         in: body
     *         type: string
     *         schema:
     *          $ref: '#/definitions/bookmarkModel'
     *     responses:
     *       200:
     *         description: object of activity".     
     */
    /**
    * @swagger
    * definition:
    *   bookmarkModel:
    *     properties:
    *       userId:
    *         type: string
    *         required: true
    *       storeId:
    *         type: string
    *         required: true
    */
}