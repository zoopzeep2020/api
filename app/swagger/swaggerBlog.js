module.exports.swaggerBlog = function () {
    /**
     * @swagger
     * /blogs/withoutlogin:
     *   get:
     *     tags:
     *       - Blog
     *     description: activity object
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: Authorization
     *         description: Basic authorization
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
     * /blogs/trendingBlog:
     *   get:
     *     tags:
     *       - Blog
     *     description: activity object
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: Authorization
     *         description: Basic authorization
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
    * /blogs:
    *   get:
    *     tags:
    *       - Blog
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
    * /blogs/{blogId}:
    *   get:
    *     tags:
    *       - Blog
    *     description: activity object
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: Authorization
    *         description: token authorization
    *         in: header
    *         required: true
    *         type: string
    *       - name: blogId
    *         description: blogId
    *         in: path
    *         type: string
    *     responses:
    *       200:
    *         description: object of activity".     
    */
    /**
    * @swagger
    * /blogs/{blogId}:
    *   get:
    *     tags:
    *       - Blog
    *     description: activity object
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: Authorization
    *         description: token authorization
    *         in: header
    *         required: true
    *         type: string
    *       - name: blogId
    *         description: blogId
    *         in: path
    *         type: string
    *     responses:
    *       200:
    *         description: object of activity".     
    */
    /**
     * @swagger
     * /blogs/blogurl?{url}:
     *   put:
     *     tags:
     *       - Blog
     *     description: activity object
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: blogPicture
     *         in: formData
     *         description: The uploaded file of blogPicture
     *         required: true
     *         type: file
     *       - name: Authorization
     *         description: token authorization
     *         in: header
     *         type: string
     *       - name: url
     *         description: url of blog
     *         in: path
     *         type: string
     *         schema:
     *          $ref: '#/definitions/blogModel'
     *     responses:
     *       200:
     *         description: object of activity".     
     */
    /**
     * @swagger
     * /blogs/search?{search}&{URL}&{startBlogs}&{endBlogs}&{trending}:
     *   put:
     *     tags:
     *       - Blog
     *     description: activity object
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: blogPicture
     *         in: formData
     *         description: The uploaded file of blogPicture
     *         required: true
     *         type: file
     *       - name: Authorization
     *         description: token authorization
     *         in: header
     *         type: string
     *       - name: search
     *         description: string on which you want to search the blog
     *         in: path
     *         type: string
     *       - name: url
     *         description: url of blog
     *         in: path
     *         type: string
     *       - name: startBlogs
     *         description: skip the blog
     *         in: path
     *         type: integer
     *       - name: endBlogs
     *         description: total blogs
     *         in: path
     *         type: integer
     *       - name: trending
     *         description: trending blogs
     *         in: path
     *         type: boolean
     *     responses:
     *       200:
     *         description: object of activity".     
     */
    /**
    * @swagger
    * /blogs/like:
    *   put:
    *     tags:
    *       - Blog
    *     description: activity object
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: Authorization
    *         description: token authorization
    *         in: header
    *         type: string
    *       - name: blogId
    *         description: blogId
    *         in: body
    *         type: string
    *       - name: userId
    *         description: userId
    *         in: body
    *         type: string
    *       - name: like
    *         description: like
    *         in: body
    *         type: boolean
    *     schema:
    *       $ref: '#/definitions/blogModel'
    *     responses:
    *       200:
    *         description: object of activity".     
    */

    /**
    * @swagger
    * /blogs/save:
    *   put:
    *     tags:
    *       - Blog
    *     description: activity object
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: Authorization
    *         description: token authorization
    *         in: header
    *         type: string
    *       - name: blogId
    *         description: blogId
    *         in: body
    *         type: string
    *       - name: userId
    *         description: userId
    *         in: body
    *         type: string
    *       - name: save
    *         description: save
    *         in: body
    *         type: boolean
    *     schema:
    *       $ref: '#/definitions/blogModel'
    *     responses:
    *       200:
    *         description: object of activity".     
    */

    /**
     * @swagger
     * /blogs:
     *   post:
     *     tags:
     *       - Blog
     *     description: activity object
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: blogPicture
     *         in: formData
     *         description: The uploaded file of blogPicture
     *         required: true
     *         type: file
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
     *       - name: description
     *         description: description of blog
     *         in: body
     *         required: true
     *         type: string
     *       - name: title
     *         description: title of blog
     *         in: body
     *         required: true
     *         type: string
     *       - name: metaDescription
     *         description: metaDescription of blog
     *         in: body
     *         required: true
     *         type: string
     *       - name: metaKeyword
     *         description: metaKeyword of blog
     *         in: body
     *         required: true
     *         type: string
     *         schema:
     *          $ref: '#/definitions/blogModel'
     *     responses:
     *       200:
     *         description: object of activity".
     */

    /**
    * @swagger
    * definition:
    *   blogModel:
    *     properties:
    *       title:
    *         type: string
    *         required: true
    *       blogPicture:
    *         type: string
    *         required: true
    *       description:
    *         type: string
    *         required: true
    *       authorImage:
    *         type: string
    *         required: true
    *       authorName:
    *         type: string
    *         required: true 
    *       metaDescription:
    *         type: string
    *         required: true 
    *       metaKeyword:
    *         type: string
    *         required: true 
    *       likeCount:
    *         type: integer
    *         required: true 
    *       saveCount:
    *         type: integer
    *         required: true
    *       likedBy:
    *         type: array
    *         items:
    *          type: string
    *       savedBy:
    *         type: array
    *         items:
    *          type: string
    */
}