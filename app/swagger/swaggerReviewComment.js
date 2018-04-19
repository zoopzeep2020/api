
module.exports.swaggerReviewComments = function () {

    /**
     * @swagger
     * /reviewComments:
     *   post:
     *     tags:
     *       - ReviewComment
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
     *       - name: reviewId
     *         description: reviewId
     *         in: body
     *         type: string
     *       - name: comment
     *         description: comment
     *         in: body
     *         required: true
     *         type: string
     *         schema:
     *          $ref: '#/definitions/reviewCommentModel'
     *     responses:
     *       200:
     *         description: object of activity".
     */
    /**
     * @swagger
     * /reviewComments/{reviewCommentId}:
     *   put:
     *     tags:
     *       - ReviewComment
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
     *       - name: reviewCommentId
     *         description: reviewCommentId
     *         in: path
     *         type: string
     *       - name: userId
     *         description: userId
     *         in: body
     *         type: string
     *       - name: storeId
     *         description: storeId
     *         in: body
     *         type: string
     *       - name: reviewId
     *         description: reviewId
     *         in: body
     *         type: string
     *       - name: comment
     *         description: comment
     *         in: body
     *         type: string
     *         schema:
     *          $ref: '#/definitions/reviewCommentModel'
     *     responses:
     *       200:
     *         description: object of activity".
     */

    /**
     * @swagger
     * /reviewComments:
     *   get:
     *     tags:
     *       - ReviewComment
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
     * /reviewComments/{reviewCommentId}:
     *   get:
     *     tags:
     *       - ReviewComment
     *     description: activity object
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: Authorization
     *         description: token authorization
     *         in: header
     *         required: true
     *         type: string
     *       - name: reviewCommentId
     *         description: reviewCommentId
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: object of activity".     
     */
    /**
     * @swagger
     * /reviewComments/{reviewCommentId}:
     *   delete:
     *     tags:
     *       - ReviewComment
     *     description: activity object
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: Authorization
     *         description: token authorization
     *         in: path
     *         required: true
     *         type: string
     *       - name: reviewCommentId
     *         description: reviewCommentId
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
     *   reviewCommentModel:
     *     properties:
     *       userId:
     *         type: string
     *       storeId:
     *         type: string
     *       reviewId:
     *         type: string
     *       comment:
     *         type: string
     */
}