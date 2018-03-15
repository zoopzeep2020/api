module.exports.swaggerKeyword = function () {
    /**
* @swagger
* /keywords:
*   get:
*     tags:
*       - Keyword
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
* /keywords:
*   post:
*     tags:
*       - Keyword
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
*       - name: title
*         description: title
*         in: body
*         required: true
*         type: string
*         schema:
*          $ref: '#/definitions/keywordModel'
*     responses:
*       200:
*         description: object of activity".
*/
 /**
* @swagger
* /keywords/{keywordId}:
*   put:
*     tags:
*       - Keyword
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
*       - name: keywordId
*         description: keywordId
*         in: path
*         required: true
*         type: string
*       - name: title
*         description: title
*         in: body
*         required: true
*         type: string
*         schema:
*          $ref: '#/definitions/keywordModel'
*     responses:
*       200:
*         description: object of activity".
*/
 /**
 * @swagger
 * /keywords/{keywordId}:
 *   delete:
 *     tags:
 *       - Keyword
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
 *       - name: keywordId
 *         description: keywordId
 *         in: path
 *         required: true
 *         type: string
 *         schema:
 *          $ref: '#/definitions/keywordModel'
 *     responses:
 *       200:
 *         description: object of activity".
 */
 /**
* @swagger
* /keywords/{keywordId}:
*   get:
*     tags:
*       - Keyword
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
*       - name: keywordId
*         description: keywordId
*         in: path
*         required: true
*         type: string
*     responses:
*       200:
*         description: object of activity".     
*/

 /**
 * @swagger
 * /keywords/trendingkeyword:
 *   get:
 *     tags:
 *       - Keyword
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
* /keywords/search?{keyword}:
*   get:
*     tags:
*       - Keyword
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
*       - name: keyword
*         description: keyword id
*         in: path
*         required: true
*         type: string
*     responses:
*       200:
*         description: object of activity".     
*/

 /**
* @swagger
* /keywords/searchbyword?{search}:
*   get:
*     tags:
*       - Keyword
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
*         description: string that you want to search
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
  *   keywordModel:
  *     properties:
  *       title:
  *         type: string
  *         required: true
  */
}