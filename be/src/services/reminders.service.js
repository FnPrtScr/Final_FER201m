// @ts-ignore
const { Users, Categories, Reminders } = require('../models');
const schedule = require('node-schedule');
const sendMail = require('../utils/send-mail')
const { ErrorResponse, errorResponse, successResponse } = require('../utils/response');

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
    async fncFindAll() {
        return Reminders.findAndCountAll();
    }
    async fncFindAllByUserId(req,res) {
        const {id}=req.params;
        return Reminders.findAndCountAll({
            where:{user_id:id}
        });
    }

    async fncCreateOne(req) {
        // return await Reminders.create({ ...req.body });
        const createOne = await Reminders.create({ ...req.body });

        const getReminder = await Reminders.findOne({
            where: { reminder_id: createOne.reminder_id },
            include: {
                model: Categories,
                include: {
                    model: Users
                }
            }
        });
        const getEmailUser=getReminder.Category.User.email;
        const currentTime = new Date();
        const reminderTime = new Date(getReminder.due_date);
        const difTime = reminderTime - currentTime;
        console.log(currentTime);
        console.log(reminderTime);
        console.log(difTime);
        if (difTime > 0) {
            const subject = "Test";
            const content = "Test";
            schedule.scheduleJob(reminderTime, () => {
                sendMail(getEmailUser, subject, content);
            });
            const updateReminder = await Reminders.update({ data: { status: "Completed" } }, { where: { reminder_id: getReminder.reminder_id } })
        }
        return createOne;

    }




    async fncUpdateOne(req, next) {
        const { id } = req.params;
        const { user_id } = req.body;
        const found = await this.fncFindOne(req);

        if (!found) {
            return next(new ErrorResponse(404, 'Reminder not found'));
        } else {
            return await Reminders.update(
                { ...req.body },
                {
                    where: { user_id: user_id, reminder_id: id, status: "Pending" },
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
