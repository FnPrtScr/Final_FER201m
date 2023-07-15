const { Op } = require('sequelize');
// @ts-ignore
const { Users, Categories,Reminders,Notification } = require('../models');
const { ErrorResponse,errorResponse, successResponse } = require('../utils/response');
class NotificationService {

    async fncFindAllByUserId(req,res){
        const {id}=req.params;

        return await Notification.findAndCountAll({
            where:{user_id:id},
        })
    }
    async fncUpdateBulkNoti(req,res){
        const {id}=req.body;
        return await Notification.update({status:2},{where:{user_id:id,status:1}})
    }

    
}

module.exports = new NotificationService();
