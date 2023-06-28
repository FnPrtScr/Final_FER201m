'use strict';
module.exports = (sequelize) => {
    const { Model, DataTypes } = require('sequelize');
    class Reminders_Categories extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Categories,Reminders }) {
            // define association here
            this.hasMany(Categories, {
                foreignKey: 'category_id',
            });
            this.hasMany(Reminders, {
                foreignKey: 'reminder_id',
            });
        }
    }
    Reminders_Categories.init(
        {
            user_id: DataTypes.INTEGER,
            category_id:DataTypes.INTEGER,
            reminder_id: DataTypes.INTEGER,
            created_date:DataTypes.STRING,
            updated_date:DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Reminders_Categories',
            freezeTableName: true,
            timestamps: false,
        }
    );
    return Reminders_Categories;
};
