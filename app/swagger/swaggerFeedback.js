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