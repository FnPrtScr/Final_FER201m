'use strict';
module.exports = (sequelize) => {
    const { Model, DataTypes } = require('sequelize');
    class Categories extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Reminders_Categories }) {
            // define association here
            this.hasMany(Reminders_Categories, {
                foreignKey: 'category_id',
            });
        }
    }
    Categories.init(
        {
            category_id: {
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
            },
            name: DataTypes.STRING,
            color: DataTypes.STRING,
            icon: DataTypes.STRING,
            created_date:DataTypes.STRING,
            updated_date:DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Categories',
            freezeTableName: true,
            timestamps: false,
            
        }
    );
    return Categories;
};
