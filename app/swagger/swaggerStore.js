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