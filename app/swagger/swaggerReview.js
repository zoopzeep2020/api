module.exports.swaggerReview = function () {
    /**
* @swagger
* /reviews:
*   post:
*     tags:
*       - Review
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
*         required: true
*         type: string
*       - name: storeId
*         description: storeId
*         in: body
*         required: true
*         type: string
*       - name: ratingScale
*         description: ratingScale
*         in: body
*         type: number
*       - name: description
*         description: description
*         in: body
*         type: string
*         schema:
*          $ref: '#/definitions/reviewModel'
*     responses:
*       200:
*         description: object of activity".
*/
 /**
* @swagger
* /reviews/{reviewId}:
*   put:
*     tags:
*       - Review
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
*       - name: reviewId
*         description: reviewId
*         in: body
*         required: true
*         type: string
*       - name: userId
*         description: userId
*         in: body
*         type: string
*       - name: storeId
*         description: storeId
*         in: body
*         type: string
*       - name: ratingScale
*         description: ratingScale
*         in: body
*         type: number
*       - name: description
*         description: description
*         in: body
*         type: string
*         schema:
*          $ref: '#/definitions/reviewModel'
*     responses:
*       200:
*         description: object of activity".
*/
 /**
  * @swagger
  * /reviews:
  *   get:
  *     tags:
  *       - Review
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
  * /reviews/{reviewId}:
  *   get:
  *     tags:
  *       - Review
  *     description: activity object
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: Authorization
  *         description: token authorization
  *         in: header
  *         required: true
  *         type: string
  *       - name: reviewId
  *         description: reviewId
  *         in: path
  *         required: true
  *         type: string
  *     responses:
  *       200:
  *         description: object of activity".     
  */
 /**
  * @swagger
  * /reviews/{reviewId}:
  *   delete:
  *     tags:
  *       - Review
  *     description: activity object
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: Authorization
  *         description: token authorization
  *         in: header
  *         required: true
  *         type: string
  *       - name: reviewId
  *         description: reviewId
  *         in: path
  *         required: true
  *         type: string
  *     responses:
  *       200:
  *         description: object of activity".     
  */
 /**
  * @swagger
  * /reviews/store/{storeId}:
  *   get:
  *     tags:
  *       - Review
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
  *       - name: storeId
  *         description: storeId
  *         in: path
  *         required: true
  *         type: string
  *     responses:
  *       200:
  *         description: object of activity".     
  */

 /**
  * @swagger
  * /reviews/user/{userId}:
  *   get:
  *     tags:
  *       - Review
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
 * definition:
 *   reviewModel:
 *     properties:
 *       userId:
 *         type: string
 *         required: true
 *       storeId:
 *         type: string
 *         required: true
 *       ratingScale:
 *         type: number
 *         required: true
 *       description:
 *         type: number
 *         required: true
 */

}