'use strict';
module.exports = (sequelize) => {
    const { Model, DataTypes } = require('sequelize');
    class Reminders extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Reminders_Categories,Users }) {
            // define association here
            this.hasMany(Reminders_Categories, {
                foreignKey: 'reminder_id',
            });
            this.hasOne(Users, {
                foreignKey: 'user_id',
            });

        }
    }
    Reminders.init(
        {
            reminder_id: {
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },
            user_id: DataTypes.INTEGER,
            title: DataTypes.STRING,
            description: DataTypes.STRING,
            due_date: DataTypes.DATE,
            priority: DataTypes.INTEGER,
            status: DataTypes.STRING,
            created_date:DataTypes.STRING,
            updated_date:DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Reminders',
            freezeTableName: true,
            timestamps: false,
            
        }
    );
    return Reminders;
};
