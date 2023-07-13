const { Op } = require('sequelize');
// @ts-ignore
const { Users, Categories,Reminders,Notification } = require('../models');
const { ErrorResponse,errorResponse, successResponse } = require('../utils/response');
class NotificationService {

    async fncFindAllByUserId(req,res){
        const {user_id}=req.body;;

        return await Notification.findAndCountAll({
            where:{user_id:user_id},
        })
    }

    
}

module.exports = new NotificationService();
