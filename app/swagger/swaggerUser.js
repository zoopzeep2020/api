








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