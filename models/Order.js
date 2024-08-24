import { Sequelize, DataTypes } from "sequelize"

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'botprinter.db'
})

const Order = sequelize.define(
    'Order',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING
        },
        date: {
            type: DataTypes.STRING
        },
        name: {
            type: DataTypes.STRING
        },
        num: {
            type: DataTypes.INTEGER
        },
        itens: {
            type: DataTypes.STRING
        },
        itensComp: {
            type: DataTypes.STRING
        },
        obs: {
            type: DataTypes.STRING
        },
        value: {
            type: DataTypes.DECIMAL
        },
        valueShipping: {
            type: DataTypes.DECIMAL
        },
        distance: {
            type: DataTypes.DECIMAL
        },
        compr: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        addressComp: {
            type: DataTypes.STRING
        },
        addressRef: {
            type: DataTypes.STRING
        },
        addressNeigh: {
            type: DataTypes.STRING
        },
        addressCity: {
            type: DataTypes.STRING
        },
        printed: {
            type: DataTypes.BOOLEAN
        }

    }
)

export { Order }