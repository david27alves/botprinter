import { Sequelize, DataTypes } from 'sequelize'

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'botprinter.db'
})


const TemplateOrder = sequelize.define(
    'TemplateOrder',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        template: {
            type: DataTypes.STRING
        }
    }
)

export { TemplateOrder }