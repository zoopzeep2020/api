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
module.exports.swaggerCatalog = function () {
     /**
    * @swagger
    * /catalogs:
    *   get:
    *     tags:
    *       - Catalogue
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
    * /catalogs/{catalogId}:
    *   get:
    *     tags:
    *       - Catalogue
    *     description: activity object
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: Authorization
    *         description: token authorization
    *         in: header
    *         required: true
    *         type: string
    *       - name: catalogId
    *         description: catalogId
    *         in: path
    *         type: string
    *     responses:
    *       200:
    *         description: object of activity".     
    */

    /**
    * @swagger
    * /catalogs/store/{storeId}:
    *   get:
    *     tags:
    *       - Catalogue
    *     description: activity object
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: Authorization
    *         description: token authorization
    *         in: header
    *         required: true
    *         type: string
    *       - name: storeId
    *         description: storeId
    *         in: path
    *         type: string
    *     responses:
    *       200:
    *         description: object of activity".     
    */

    /**
    * @swagger
    * /catalogs/search?{search}:
    *   get:
    *     tags:
    *       - Catalogue
    *     description: activity object
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: Authorization
    *         description: token authorization
    *         in: header
    *         required: true
    *         type: string
    *       - name: search
    *         description: search
    *         in: path
    *         type: string
    *     responses:
    *       200:
    *         description: object of activity".     
    */

    /**
   * @swagger
   * /catalogs/featurecatalog?{lang}&{lat}:
   *   get:
   *     tags:
   *       - Catalogue
   *     description: activity object
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: Authorization
   *         description: token authorization
   *         in: header
   *         required: true
   *         type: string
   *       - name: lang
   *         description: lang
   *         in: query
   *         type: number
   *       - name: lat
   *         description: lat
   *         in: query
   *         type: number
   *     responses:
   *       200:
   *         description: object of activity".     
   */

    /**
    * @swagger
    * /catalogs:
    *   post:
    *     tags:
    *       - Catalogue
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
    *       - name: storeId
    *         description: storeId
    *         in: body
    *         required: true
    *         type: string
    *       - name: catalogUrl
    *         description: catalogUrl
    *         in: body
    *         required: true
    *         type: string
    *       - name: catalogDescription
    *         description: catalogDescription
    *         in: body
    *         required: true
    *         type: string
    *         schema:
    *          $ref: '#/definitions/catalogModel'
    *     responses:
    *       200:
    *         description: object of activity".
    */

    /**
    * @swagger
    * /catalogs/{catalogId}:
    *   delete:
    *     tags:
    *       - Catalogue
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
    *       - name: catalgId
    *         description: catalogId
    *         in: path
    *         type: string
    *     responses:
    *       200:
    *         description: object of activity".
    */

    /**
    * @swagger
    * /catalogs/{catalogId}:
    *   put:
    *     tags:
    *       - Catalogue
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
    *       - name: storeId
    *         description: storeId
    *         in: body
    *         type: string
    *       - name: catalogUrl
    *         description: catalogUrl
    *         in: body
    *         type: string
    *       - name: catalogDescription
    *         description: catalogDescription
    *         in: body
    *         type: string
    *         schema:
    *          $ref: '#/definitions/catalogModel'
    *     responses:
    *       200:
    *         description: object of activity".
    */

    /**
   * @swagger
   * definition:
   *   catalogModel:
   *     properties:
   *       storeId:
   *         type: string
   *         required: true
   *       catalogUrl:
   *         type: string
   *         required: true
   *       catalogDescription:
   *         type: string
   *         required: true
   */
}
module.exports.swaggerCategory = function () {
 /**
 * @swagger
 * /categories:
 *   post:
 *     tags:
 *       - Category
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
 *       - name: Content-Type
 *         description: content-type
 *         in: header
 *         required: true
 *         type: string
 *         default: application/json
 *       - name: category
 *         description: category
 *         in: body
 *         required: true
 *         type: string
 *       - name: categoryImage
 *         in: formData
 *         description: The uploaded file of categoryImage
 *         required: true
 *         type: file
 *       - name: categoryActiveImage
 *         in: formData
 *         description: The uploaded file of categoryActiveImage
 *         required: true
 *         type: file
 *         schema:
 *          $ref: '#/definitions/categoryModel'
 *     responses:
 *       200:
 *         description: object of activity".
 */

 /**
 * @swagger
 * /categories/{categoryId}:
 *   put:
 *     tags:
 *       - Category
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
 *       - name: Content-Type
 *         description: content-type
 *         in: header
 *         required: true
 *         type: string
 *         default: application/json
 *       - name: categoryId
 *         description: categoryId
 *         in: path
 *         required: true
 *         type: string
 *       - name: category
 *         description: category
 *         in: body
 *         type: string
 *       - name: categoryImage
 *         in: formData
 *         description: The uploaded file of categoryImage
 *         type: file
 *       - name: categoryActiveImage
 *         in: formData
 *         description: The uploaded file of categoryActiveImage
 *         type: file
 *         schema:
 *          $ref: '#/definitions/categoryModel'
 *     responses:
 *       200:
 *         description: object of activity".
 */

  /**
 * @swagger
 * /categories:
 *   get:
 *     tags:
 *       - Category
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
 * /categories/trendingcategory:
 *   get:
 *     tags:
 *       - Category
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
 * /categories/{categoryId}:
 *   get:
 *     tags:
 *       - Category
 *     description: activity object
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: token authorization
 *         in: header
 *         required: true
 *         type: string
 *       - name: categoryId
 *         description: categoryId
 *         in: path
 *         type: string
 *     responses:
 *       200:
 *         description: object of activity".     
 */

 /**
 * @swagger
 * /categories/{categoryId}:
 *   delete:
 *     tags:
 *       - Category
 *     description: activity object
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: token authorization
 *         in: header
 *         required: true
 *         type: string
 *       - name: categoryId
 *         description: categoryId
 *         in: path
 *         type: string
 *     responses:
 *       200:
 *         description: object of activity".
 */
 /**
 * @swagger
 * definition:
 *   categoryModel:
 *     properties:
 *       category:
 *         type: string
 *         required: true
 *       categoryImage:
 *         type: string
 *         required: true
 *       categoryActiveImage:
 *         type: string
 *         required: true
 */
}

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
module.exports.swaggerFeedback = function () {
      /**
 * @swagger
 * /feedbacks:
 *   post:
 *     tags:
 *       - Feedback
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
 *       - name: description
 *         description: description
 *         in: body
 *         required: true
 *         type: string
 *       - name: userId
 *         description: userId of login
 *         in: body
 *         required: true
 *         type: string
 *       - name: feedbackImage
 *         in: formData
 *         description: The uploaded file of feedbackImage
 *         type: file
 *         schema:
 *          $ref: '#/definitions/feedbackModel'
 *     responses:
 *       200:
 *         description: object of activity".
 */
    /**
 * @swagger
 * /feedbacks/{feedbackId}:
 *   put:
 *     tags:
 *       - Feedback
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
 *       - name: feedbackId
 *         description: feedbackId
 *         in: path
 *         required: true
 *         type: string
 *       - name: title
 *         description: title
 *         in: body
 *         type: string
 *       - name: description
 *         description: description
 *         in: body
 *         type: string
 *       - name: feedbackImage
 *         in: formData
 *         description: The uploaded file of feedbackImage
 *         type: file
 *         schema:
 *          $ref: '#/definitions/feedbackModel'
 *     responses:
 *       200:
 *         description: object of activity".
 */
/**
 * @swagger
 * /feedbacks/:
 *   get:
 *     tags:
 *       - Feedback
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
 * /feedbacks/{feedbackId}:
 *   get:
 *     tags:
 *       - Feedback
 *     description: activity object
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: token authorization
 *         in: header
 *         required: true
 *         type: string
 *       - name: feedbackId
 *         description: feedbackId
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: object of activity".     
 */

  /**
 * @swagger
 * /feedbacks/{feedbackId}:
 *   delete:
 *     tags:
 *       - Feedback
 *     description: activity object
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: token authorization
 *         in: header
 *         required: true
 *         type: string
 *       - name: feedbackId
 *         description: feedbackId
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
 *   feedbackModel:
 *     properties:
 *       title:
 *         type: string
 *         required: true
 *       feedbackImage:
 *         type: string
 *         required: true
 *       description:
 *         type: string
 *         required: true
 */
}
module.exports.swaggerHome = function () {
     /**
    * @swagger
    * /homes:
    *   get:
    *     tags:
    *       - Home
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
}
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
module.exports.swaggerOffer = function () {

    /**
     * @swagger
     * /offers:
     *   post:
     *     tags:
     *       - Offer
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
     *       - name: offerName
     *         description: offerName
     *         in: body
     *         required: true
     *         type: string
     *       - name: offerDescription
     *         description: offerDescription
     *         in: body
     *         required: true
     *         type: string
     *       - name: storeId
     *         in: body
     *         description: storeId
     *         required: true
     *         type: string
     *       - name: cityName
     *         description: cityName
     *         in: body
     *         type: array
     *       - name: storeCity
     *         description: storeCity
     *         in: body
     *         type: string
     *       - name: aplicableForAll
     *         description: aplicableForAll
     *         in: body
     *         type: boolean
     *       - name: orderAbovePrice
     *         description: orderAbovePrice
     *         in: body
     *         type: number
     *       - name: discountTypePercentage
     *         description: discountTypePercentage
     *         in: body
     *         type: boolean
     *       - name: discountTypeFlat
     *         description: discountTypeFlat
     *         in: body
     *         type: boolean
     *       - name: percentageDiscount
     *         description: percentageDiscount
     *         in: body
     *         type: number
     *       - name: flatDiscount
     *         description: flatDiscount
     *         in: body
     *         type: number
     *       - name: startDate
     *         description: startDate
     *         in: body
     *         type: string
     *         format: date
     *       - name: endDate
     *         description: endDate
     *         in: body
     *         type: string
     *         format: date
     *       - name: offerPicture
     *         in: formData
     *         description: The uploaded file of offerPicture
     *         required: true
     *         type: file
     *         schema:
     *          $ref: '#/definitions/offerModel'
     *     responses:
     *       200:
     *         description: object of activity".
     */
    /**
     * @swagger
     * /offers/{offerId}:
     *   put:
     *     tags:
     *       - Offer
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
     *       - name: offerName
     *         description: offerName
     *         in: body
     *         required: true
     *         type: string
     *       - name: offerId
     *         description: offerId
     *         in: path
     *         required: true
     *         type: string
     *       - name: offerDescription
     *         description: offerDescription
     *         in: body
     *         required: true
     *         type: string
     *       - name: storeId
     *         in: body
     *         description: storeId
     *         type: string
     *       - name: isActive
     *         description: offer is active or not
     *         in: body
     *         type: boolean
     *       - name: cityName
     *         description: cityName
     *         in: body
     *         type: array
     *       - name: storeCity
     *         description: storeCity
     *         in: body
     *         type: string
     *       - name: aplicableForAll
     *         description: aplicableForAll
     *         in: body
     *         type: boolean
     *       - name: orderAbovePrice
     *         description: orderAbovePrice
     *         in: body
     *         type: number
     *       - name: discountTypePercentage
     *         description: discountTypePercentage
     *         in: body
     *         type: boolean
     *       - name: discountTypeFlat
     *         description: discountTypeFlat
     *         in: body
     *         type: boolean
     *       - name: percentageDiscount
     *         description: percentageDiscount
     *         in: body
     *         type: number
     *       - name: flatDiscount
     *         description: flatDiscount
     *         in: body
     *         type: number
     *       - name: startDate
     *         description: startDate
     *         in: body
     *         type: string
     *         format: date
     *       - name: endDate
     *         description: endDate
     *         in: body
     *         type: string
     *         format: date
     *       - name: offerPicture
     *         in: formData
     *         description: The uploaded file of offerPicture
     *         required: true
     *         type: file
     *         schema:
     *          $ref: '#/definitions/offerModel'
     *     responses:
     *       200:
     *         description: object of activity".
     */
    /**
     * @swagger
     * /offers/{offerId}:
     *   get:
     *     tags:
     *       - Offer
     *     description: activity object
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: Authorization
     *         description: token authorization
     *         in: header
     *         required: true
     *         type: string
     *       - name: offerId
     *         description: offerId
     *         in: path
     *         type: string
     *     responses:
     *       200:
     *         description: object of activity".     
     */
    /**
     * @swagger
     * /offers/search?{search}:
     *   get:
     *     tags:
     *       - Offer
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
     *         description: offer description or name
     *         in: path
     *         type: string
     *     responses:
     *       200:
     *         description: object of activity".     
     */
    /**
     * @swagger
     * /offers/withfilter?{offerOnline}&{offerOffline}:
     *   get:
     *     tags:
     *       - Offer
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
     *       - name: offerOnline
     *         description: true or false
     *         in: path
     *         type: boolean
     *       - name: offerOffline
     *         description: true or false
     *         in: path
     *         type: boolean
     *     responses:
     *       200:
     *         description: object of activity".     
     */
    /**
     * @swagger
     * /offers/store/{storeId}:
     *   get:
     *     tags:
     *       - Offer
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
     *         type: string
     *     responses:
     *       200:
     *         description: object of activity".     
     */
    /**
     * @swagger
     * /offers/withoutlogin:
     *   get:
     *     tags:
     *       - Offer
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
     * /offers/save:
     *   put:
     *     tags:
     *       - Offer
     *     description: activity object
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: Authorization
     *         description: token authorization
     *         in: header
     *         type: string
     *       - name: offerId
     *         description: offerId
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
     *     responses:
     *       200:
     *         description: object of activity".     
     */
    /**
     * @swagger
     * /offers:
     *   get:
     *     tags:
     *       - Offer
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
 * /offers/{offerId}:
 *   delete:
 *     tags:
 *       - Offer
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
 *       - name: offerId
 *         description: offerId
 *         in: path
 *         type: string
 *     responses:
 *       200:
 *         description: object of activity".     
 */
    /**
     * @swagger
     * definition:
     *   offerModel:
     *     properties:
     *       storeId:
     *         type: string
     *         required: true
     *       offerName:
     *         type: string
     *         required: true
     *       offerDescription:
     *         type: string
     *         required: true
     *       aplicableForAll:
     *         type: boolean
     *       orderAbovePrice:
     *         type: number
     *       discountTypePercentage:
     *         type: boolean
     *       discountTypeFlat:
     *         type: boolean
     *       percentageDiscount:
     *         type: number
     *       flatDiscount:
     *         type: number
     *       startDate:
     *         type: string
     *         format: date
     *       endDate:
     *         type: string
     *         format: date
     *       offerPicture:
     *         type: string
     *       isActive:
     *         type: boolean
     *       cityName:
     *         type: array
     *         items:
     *          type: string
     *       storeCity:
     *         type: string
     */
}
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
module.exports.swaggerStore = function () {
    /**
     * @swagger
     * /stores/{storeId}:
     *   put:
     *     tags:
     *       - Store
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
     *       - name: storeId
     *         description: storeId
     *         in: path
     *         required: true
     *         type: string
     *       - name: storeName
     *         description: storeName
     *         in: body
     *         type: string
     *       - name: storeLogo
     *         in: formData
     *         description: The uploaded file of storeLogo
     *         type: file
     *       - name: storeBanner
     *         in: formData
     *         description: The uploaded file of storeBanner
     *         type: file
     *       - name: categoriesIds
     *         description: categoriesIds
     *         in: body
     *         type: array
     *       - name: buisnessOnline
     *         description: buisnessOnline
     *         in: body
     *         type: boolean
     *       - name: buisnessOffline
     *         description: buisnessOffline
     *         in: body
     *         type: boolean
     *       - name: buisnessBoth
     *         description: buisnessBoth
     *         in: body
     *         type: boolean
     *       - name: address
     *         description: address
     *         in: body
     *         type: string
     *       - name: storePhone
     *         description: storePhone
     *         in: body
     *         type: number
     *       - name: storeDiscription
     *         description: storeDiscription
     *         in: body
     *         type: string
     *       - name: featureCatalog
     *         description: featureCatalog
     *         in: body
     *         type: string
     *       - name: webAddress
     *         description: webAddress
     *         in: body
     *         type: string
     *       - name: keyword
     *         description: keyword
     *         in: body
     *         type: array
     *       - name: otherKeyword
     *         description: otherKeyword
     *         in: body
     *         type: array
     *       - name: countries
     *         description: countries
     *         in: body
     *         type: array
     *       - name: dispatchDayMin
     *         description: dispatchDayMin
     *         in: body
     *         type: number
     *       - name: dispatchDayMax
     *         description: dispatchDayMax
     *         in: body
     *         type: number
     *       - name: customization
     *         description: customization
     *         in: body
     *         type: boolean
     *       - name: giftWrap
     *         description: giftWrap
     *         in: body
     *         type: boolean
     *       - name: cod
     *         description: cod
     *         in: body
     *         type: boolean
     *       - name: freeShiping
     *         description: freeShiping
     *         in: body
     *         type: boolean
     *       - name: returnandreplace
     *         description: returnandreplace
     *         in: body
     *         type: string
     *       - name: viewCount
     *         description: viewCount
     *         in: body
     *         type: number
     *       - name: reviewCount
     *         description: reviewCount
     *         in: body
     *         type: number
     *       - name: avgRating
     *         description: avgRating
     *         in: body
     *         type: number
     *       - name: isActive
     *         description: isActive
     *         in: body
     *         type: boolean
     *         default: false
     *       - name: location
     *         description: location
     *         in: body
     *         type: array
     *         schema:
     *          $ref: '#/definitions/storeModel'
     *     responses:
     *       200:
     *         description: object of activity".
     */
    /**
     * @swagger
     * /stores:
     *   get:
     *     tags:
     *       - Store
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
     * /stores/{storeId}:
     *   get:
     *     tags:
     *       - Store
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
     * /stores/bookmarkbyuser:
     *   get:
     *     tags:
     *       - Store
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
     * /stores/{storeId}:
     *   delete:
     *     tags:
     *       - Store
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
     * /stores/trendingStore?{lng}&{lat}&{keyword}&{buisnessOnline}&{buisnessOffline}:
     *   get:
     *     tags:
     *       - Store
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
     *       - name: lng
     *         description: lng
     *         in: query
     *         type: number
     *       - name: lat
     *         description: lat
     *         in: query
     *         type: number
     *       - name: keyword
     *         description: keywordId
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
     *     responses:
     *       200:
     *         description: object of activity".     
     */
    /**
     * @swagger
     * /stores/search?{search}&{keywordId}&{buisnessOnline}&{buisnessOffline}&{lng}&{lat}:
     *   get:
     *     tags:
     *       - Store
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
     *         description: search(this word will compare with kewordTitle storeName and storeDescription and give u related store)
     *         in: query
     *         required: true
     *         type: string
     *       - name: keywordId
     *         description: keywordId(optional)
     *         in: query
     *         type: string
     *       - name: buisnessOnline
     *         description: buisnessOnline
     *         in: query
     *         required: true
     *         type: boolean
     *       - name: buisnessOffline
     *         description: buisnessOffline
     *         in: query
     *         required: true
     *         type: boolean
     *       - name: lng
     *         description: longitude of location
     *         in: query
     *         type: number
     *       - name: lat
     *         description: lattitude of location
     *         in: query
     *         type: number
     *     responses:
     *       200:
     *         description: object of activity".     
     */
    /**
     * @swagger
     * definition:
     *   storeModel:
     *     properties:
     *       storeName:
     *         type: string
     *       storeLogo:
     *         type: string
     *       storeBanner:
     *         type: string
     *       categoriesIds:
     *         type: array
     *         items:
     *          type: string
     *       buisnessOnline:
     *         type: boolean
     *       buisnessOffline:
     *         type: boolean
     *       buisnessBoth:
     *         type: boolean
     *       address:
     *         type: string
     *       storePhone:
     *         type: number
     *       storeDiscription:
     *         type: string
     *       featureCatalog:
     *         type: number
     *       webAddress:
     *         type: string
     *       keyword:
     *         type: array
     *         items:
     *          type: string
     *       otherKeyword:
     *         type: array
     *         items:
     *          type: string
     *       countries:
     *         type: array
     *         items:
     *          type: string
     *       dispatchDayMin:
     *         type: number
     *       dispatchDayMax:
     *         type: number
     *       customization:
     *         type: boolean
     *       giftWrap:
     *         type: boolean
     *       cod:
     *         type: boolean
     *       freeShiping:
     *         type: boolean
     *       returnandreplace:
     *         type: string
     *       viewCount:
     *         type: number
     *       reviewCount:
     *         type: number
     *       avgRating:
     *         type: number
     *       isActive:
     *         type: boolean
     *       location:
     *         type: array
     *         items:
     *          type: number
    */
   /**
     * @swagger
     * /stores/bookmark:
     *   put:
     *     tags:
     *       - Store
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
     *       - name: bookmark
     *         description: bookmark
     *         in: body
     *         type: boolean
     *       - name: storeId
     *         in: body
     *         description: storeId
     *         type: string
     *       - name: userId
     *         in: body
     *         description: userId
     *         type: string
     *         schema:
     *          $ref: '#/definitions/storeModel'
     *     responses:
     *       200:
     *         description: object of activity".
     */
 
}
module.exports.swaggerUser = function () {  

/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     tags:
 *       - User
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
 *       - name: name
 *         description: name
 *         in: body
 *         type: string
 *       - name: userId
 *         description: userId
 *         in: path
 *         required: true
 *         type: string
 *       - name: userId
 *         description: userId
 *         in: body
 *         required: true
 *         type: string
 *       - name: phone
 *         description: phone
 *         in: body
 *         type: number
 *       - name: userImage
 *         in: formData
 *         description: The uploaded file of userImage
 *         type: file
 *       - name: email
 *         description: email
 *         in: body
 *         type: string
 *       - name: password
 *         description: password
 *         in: body
 *         type: string
 *     responses:
 *       200:
 *         description: object of activity".
 */
/**
 * @swagger
 * /users/claimoffer/{offerId}:
 *   put:
 *     tags:
 *       - User
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
 *       - name: offerId
 *         description: offerId
 *         in: path
 *         required: true
 *         type: string
 *       - name: offerCode
 *         description: offerCode(that you have to generate while creating offer )
 *         in: body
 *         required: true
 *         type: string
 *       - name: userId
 *         description: userId
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: object of activity".
 */
/**
 * @swagger
 * /users/logout/{userId}:
 *   put:
 *     tags:
 *       - User
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
 * /users/{userId}:
 *   get:
 *     tags:
 *       - User
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
 * /users/admin/adminkey:
 *   get:
 *     tags:
 *       - User
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
 * /users/admin:
 *   post:
 *     tags:
 *       - User
 *     description: activity object
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: token authorization
 *         in: header
 *         required: true
 *         type: string
 *       - name: adminKey
 *         description: adminKey
 *         in: header
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: object of activity".
 */
/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - User
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
 *       - name: name
 *         description: name
 *         in: body
 *         required: true
 *         type: string
 *       - name: phone
 *         description: phone
 *         in: body
 *         required: true
 *         type: number
 *       - name: email
 *         description: email
 *         in: body
 *         required: true
 *         type: string
 *       - name: password
 *         description: password
 *         in: body
 *         required: true
 *         type: string
 *       - name: isUser
 *         description: isUser
 *         in: body
 *         type: boolean
 *       - name: isStore
 *         description: isStore
 *         in: body
 *         type: boolean
 *     responses:
 *       200:
 *         description: object of activity".
 */

/**
* @swagger
* /users/existuser?{continuewithexistingstore}:
*   post:
*     tags:
*       - User
*     description: create user for email which is already exist as a store
*     produces:
*       - application/json
*     parameters:
*       - name: Authorization
*         description: basic authorization
*         in: header
*         required: true
*         type: string
*         default: maximumvsminimumsecurity
*       - name: name
*         description: name
*         in: body
*         required: true
*         type: string
*       - name: phone
*         description: phone
*         in: body
*         required: true
*         type: number
*       - name: email
*         description: email
*         in: body
*         required: true
*         type: string
*       - name: password
*         description: password
*         in: body
*         required: true
*         type: string
*       - name: isUser
*         description: isUser
*         in: body
*         type: boolean
*       - name: isStore
*         description: isStore
*         in: body
*         type: boolean
*       - name: continuewithexistingstore
*         description: true if you want to continue and false if not
*         in: body
*         required: true
*         type: boolean
*     responses:
*       200:
*         description: object of activity".
*/
/**
 * @swagger
 * /users/?{continuewithexistinguser}:
 *   post:
 *     tags:
 *       - User
 *     description: create user for email which is already exist as a store
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: basic authorization
 *         in: header
 *         required: true
 *         type: string
 *         default: maximumvsminimumsecurity
 *       - name: name
 *         description: name
 *         in: body
 *         required: true
 *         type: string
 *       - name: phone
 *         description: phone
 *         in: body
 *         required: true
 *         type: number
 *       - name: email
 *         description: email
 *         in: body
 *         required: true
 *         type: string
 *       - name: password
 *         description: password
 *         in: body
 *         required: true
 *         type: string
 *       - name: isUser
 *         description: isUser
 *         in: body
 *         type: boolean
 *       - name: isStore
 *         description: isStore
 *         in: body
 *         type: boolean
 *       - name: continuewithexistinguser
 *         description:  true if you want to continue and false if not
 *         in: body
 *         required: true
 *         type: boolean
 *     responses:
 *       200:
 *         description: object of activity".
 */
/**
* @swagger
* definition:
*   UpdateActivitiesObj:
*     properties:
*       name:
*         type: string
*       phone:
*         type: string
*       deviceToken:
*         type: string
*       deviceType:
*         type: string
*       userImage:
*         type: string
*       categoriesIds:
*         type: array
*         items:
*          type: string
*       isUser:
*         type: boolean
*       isStore:
*         type: boolean
*       isAdmin:
*         type: boolean
*       storeId:
*         type: string
*       email:
*         type: string
*/
}