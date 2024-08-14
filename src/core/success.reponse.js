"use strict";


const { StatusCodes, ReasonPhrases } = require("../utils/httpStatusCode");

class SuccessResponse {
    constructor({
                    message,
                    statusCode = StatusCodes.OK,
                    reasonStatusCode = ReasonPhrases.OK,
                    metadata = {},
                }) {
        this.message = message || reasonStatusCode;
        this.statusCode = statusCode;
        this.metadata = metadata;
    }
    send(res, headers = {}) {
        return res.status(this.statusCode).json({
            message: this.message,
            statusCode: this.statusCode,
            metadata: this.metadata
        });
    }
}

class OK extends SuccessResponse {
    constructor(message, metadata = {}) {
        super({
            message: message,
            statusCode: StatusCodes.OK,
            reasonStatusCode: ReasonPhrases.OK,
            metadata: metadata,
        });
    }
}

class CREATED extends SuccessResponse {
    constructor(message, metadata = {}) {
        super({
            message,
            statusCode: StatusCodes.CREATED,
            reasonStatusCode: ReasonPhrases.CREATED,
            metadata,
        });
    }
}

module.exports = {
    OK,
    CREATED,
    SuccessResponse,
};