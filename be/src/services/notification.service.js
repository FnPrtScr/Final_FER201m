const { Op } = require('sequelize');
// @ts-ignore
const { Users, Categories,Reminders,Notification } = require('../models');
const { ErrorResponse,errorResponse, successResponse } = require('../utils/response');
class NotificationService {
    async fncFindOne(req) {
        const { id } = req.params;

        return Categories.findOne({
            where: { category_id: id },
            include: [
                {
                    model: Reminders,
                },
            ],
        });
    }
    async fncFindAll(){
        return Categories.findAndCountAll();
    }

    async fncFindAllByUserId(req,res){
        const {user_id}=req.body;
        return await Categories.findAndCountAll({
            where:{user_id:user_id},
            include:{
                model:Reminders
            }
        })
    }

    async fncCreateOne(req) {
        return await Categories.create({...req.body});
    }

    

    async fncUpdateOne(req, next) {
        const { id } = req.params;
        const found = await this.fncFindOne(req);

        if (!found) {
            return next(new ErrorResponse(404, 'Categories not found'));
        } else {
            return Categories.update(
                { ...req.body },
                {
                    where: { category_id: id },
                }
            );
        }
    }

    async fncDeleteOne(req, next) {
        const { id } = req.params;
        const found = await this.fncFindOne(req);

        if (!found) return next(new ErrorResponse(404, 'Categories not found'));


        return Categories.destroy(
            {
                where: { category_id: id },
            }
        );
    }
}

module.exports = new NotificationService();
