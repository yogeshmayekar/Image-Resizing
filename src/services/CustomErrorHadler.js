// to extands inbuild error handler 
class CustomErrorHandler extends Error{
    constructor(status, msg){
        super()
        this.status = status;
        this.message= msg;
    }

    // error for image uploading fails 
    static imageUplodingFails(message="Image uploading failed please try again"){
        return new CustomErrorHandler(500, message);
    }

    // error for image processing
    static imageProcessingFails(message="Image processing failed"){
        return new CustomErrorHandler(500, message);
    }
}

module.exports = CustomErrorHandler;