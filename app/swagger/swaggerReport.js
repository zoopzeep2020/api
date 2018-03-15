module.exports.swaggerReport = function () {

    /**
     * @swagger
     * /reports:
     *   post:
     *     tags:
     *       - Report
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
     *       - name: reviewId
     *         description: reviewId
     *         in: body
     *         required: true
     *         type: string
     *       - name: description
     *         description: description
     *         in: body
     *         required: true
     *         type: string
     *         schema:
     *          $ref: '#/definitions/reportModel'
     *     responses:
     *       200:
     *         description: object of activity".
     */
    /**
     * @swagger
     * /reports/{reportId}:
     *   put:
     *     tags:
     *       - Report
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
     *       - name: reviewId
     *         description: reviewId
     *         in: body
     *         type: string
     *       - name: description
     *         description: description
     *         in: body
     *         type: string
     *       - name: reportId
     *         description: reportId
     *         in: path
     *         required: true
     *         type: string
     *         schema:
     *          $ref: '#/definitions/reportModel'
     *     responses:
     *       200:
     *         description: object of activity".
     */
    /**
     * @swagger
     * /reports:
     *   get:
     *     tags:
     *       - Report
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
     * /reports/{reportId}:
     *   get:
     *     tags:
     *       - Report
     *     description: activity object
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: Authorization
     *         description: token authorization
     *         in: header
     *         required: true
     *         type: string
     *       - name: reportId
     *         description: reportId
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: object of activity".     
     */
    /**
     * @swagger
     * /reports/{reportId}:
     *   delete:
     *     tags:
     *       - Report
     *     description: activity object
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: Authorization
     *         description: token authorization
     *         in: header
     *         required: true
     *         type: string
     *       - name: reportId
     *         description: reportId
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
     *   reportModel:
     *     properties:
     *       userId:
     *         type: string
     *         required: true
     *       reviewId:
     *         type: string
     *         required: true
     *       description:
     *         type: string
     *         required: true
     */
}