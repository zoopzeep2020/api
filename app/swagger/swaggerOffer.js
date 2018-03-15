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