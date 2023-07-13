// @ts-ignore
const { Users, Categories,Reminders } = require('../models');

const { ErrorResponse,errorResponse, successResponse } = require('../utils/response');

class ReminderService {
    async fncFindOne(req) {
        const { id } = req.params;

        return Reminders.findOne({
            where: { reminder_id: id },
            include: [
                {
                    model: Categories,
                },
            ],
        });
    }
    async fncFindAll(){
        return Reminders.findAndCountAll();
    }

    async fncCreateOne(req) {
        return await Reminders.create({...req.body});
    }

    

    async fncUpdateOne(req, next) {
        const { id } = req.params;
        const {user_id}=req.body;
        const found = await this.fncFindOne(req);

        if (!found) {
            return next(new ErrorResponse(404, 'Reminder not found'));
        } else {
                return await Reminders.update(
                    { ...req.body },
                    {
                        where: { user_id:user_id,reminder_id: id,status:"Pending" },
                    }
                );
            
        }
    }

    async fncDeleteOne(req, next) {
        const { id } = req.params;
        const found = await this.fncFindOne(req);

        if (!found) return next(new ErrorResponse(404, 'Reminder not found'));

        return Reminders.destroy(
            {
                where: { reminder_id: id },
            }
        );
    }

}

module.exports = new ReminderService();
