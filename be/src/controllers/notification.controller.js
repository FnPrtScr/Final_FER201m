const asyncHandler = require('../utils/async-handler');
const NotificationService = require('../services/notification.service');
const { errorResponse, successResponse } = require('../utils/response');

module.exports = {

    findAllByUserId: asyncHandler(async (req, res, next) => {
        const  notification= await NotificationService.fncFindAllByUserId(req,res);

        return res.json(
            successResponse(200, {
                notification,
            })
        );
    }),

    
};
