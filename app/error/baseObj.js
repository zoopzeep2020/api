/**
 * Created by WebrexStudio on 5/11/17.
 */

'use strict';
class BaseObjError extends Error {
    constructor(message, status) {

        // Calling parent constructor of base Error class.
        super(message);

        // Capturing stack trace, excluding constructor call from it.
        Error.captureStackTrace(message);

        // Saving class getName in the property of our custom error as a shortcut.
        this.message = message;

        // You can use any additional properties you want.
        // I'm going to use preferred HTTP status for this error types.
        // `500` is the default value if not specified.
        this.status = status || 500;

    }
}

module.exports = BaseObjError;