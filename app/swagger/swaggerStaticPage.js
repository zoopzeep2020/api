module.exports.swaggerStaticPage = function () {
    /**
     * @swagger
     * /staticPages:
     *   post:
     *     tags:
     *       - StaticPage
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
     *       - name: content
     *         description: content
     *         in: body
     *         required: true
     *         type: string
     *       - name: type
     *         description: type ("service" or "privacy")
     *         in: body
     *         required: true
     *         type: string
     *         schema:
     *          $ref: '#/definitions/staticPageModel'
     *     responses:
     *       200:
     *         description: object of activity".
     */
    /**
     * @swagger
     * /staticPages/{staticPageId}:
     *   put:
     *     tags:
     *       - StaticPage
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
     *       - name: staticPageId
     *         description: staticPageId
     *         in: path
     *         required: true
     *         type: string
     *       - name: title
     *         description: title
     *         in: body
     *         type: string
     *       - name: content
     *         description: content
     *         in: body
     *         type: string
     *         schema:
     *          $ref: '#/definitions/staticPageModel'
     *     responses:
     *       200:
     *         description: object of activity".
     */
    /**
     * @swagger
     * /staticPages/{staticPageId}:
     *   delete:
     *     tags:
     *       - StaticPage
     *     description: activity object
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: Authorization
     *         description: token authorization
     *         in: header
     *         required: true
     *         type: string
     *       - name: staticPageId
     *         description: staticPageId
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: object of activity".
     */
    /**
     * @swagger
     * /staticPages/type/{type}:
     *   get:
     *     tags:
     *       - StaticPage
     *     description: activity object
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: Authorization
     *         description: basic authorization
     *         in: header
     *         required: true
     *         type: string
     *       - name: type
     *         description: type ("service" or "privacy")
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: object of activity".
     */
    /**
     * @swagger
     * /staticPages:
     *   get:
     *     tags:
     *       - StaticPage
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
     * definition:
     *   staticPageModel:
     *     properties:
     *       title:
     *         type: string
     *       content:
     *         type: string
     *       type:
     *         type: string
     */
    
}