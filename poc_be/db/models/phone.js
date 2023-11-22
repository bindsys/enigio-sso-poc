'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Phone extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Phone.hasMany(models.phone_number, {
            //     as: 'numbers',
            //     foreignKey: 'phoneId',
            // })
        }
    }

    Phone.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            brand: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            version: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            }
        },
        {
            sequelize,
            modelName: 'Phone',
            tableName: 'phone',
            paranoid: true,
            timestamps: false,
        },
    );

    return Phone;
};
