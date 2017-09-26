/**
 * Created by crosp on 5/11/17.
 */

'use strict';
const BaseObjError = require(APP_ERROR_PATH + 'baseObj');   

class ValidationError extends BaseObjError {
    constructor(message) {
        super(message, 400);
    }
}
5
module.exports = ValidationError;