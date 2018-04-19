
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