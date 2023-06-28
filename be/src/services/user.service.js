const { Op } = require('sequelize');
// @ts-ignore
const { Role, UserMaster } = require('../models');
const queryParams = require('../utils/query-params');
const ErrorResponse = require('../libs/error-response');
const getAccountFromToken = require('../utils/account-token');
class RoleService {
    async fncFindOne(req) {
        const { id } = req.params;

        return Role.findOne({
            where: { ID: id },
            include: [
                {
                    model: UserMaster,
                },
            ],
        });
    }

    async fncCreateOne(req) {
        const newData = req.body;
        return Role.create(newData);
    }

    async fncFindAll(req) {
        const queries = queryParams(req.query, Op, ['Name'], ['Name', 'CreatedDate', 'UpdatedDate']);

        return Role.findAndCountAll({
            order: queries.order,
            where: queries.searchOr,
            include: [
                {
                    model: UserMaster,
                },
            ],
            distinct: true,
            limit: queries.limit,
            offset: queries.offset,
        });
    }

    async fncUpdateOne(req, next) {
        const { id } = req.params;
        const found = await this.fncFindOne(req);

        if (!found) {
            return next(new ErrorResponse(404, 'Role not found'));
        } else {
            return Role.update(
                { ...req.body },
                {
                    where: { ID: id },
                }
            );
        }
    }

    async fncDeleteOne(req, next) {
        const { id } = req.params;
        const found = await this.fncFindOne(req);

        if (!found) return next(new ErrorResponse(404, 'Role not found'));

        return Role.update(
            { Status: 2 },
            {
                where: { ID: id },
            }
        );
    }
}

module.exports = new RoleService();
