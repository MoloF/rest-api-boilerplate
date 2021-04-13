import { Model, DataTypes } from 'sequelize';
import { sequelize } from '@/plugins/sequelize';

export class Service extends Model {
	id: number;
	title: string;
	image: string;
	views: number;

	readonly createdAt!: Date;
	readonly updatedAt!: Date;
	readonly deletedAt!: Date;
}

/**
 * Документация по созданию собственных полей
 * @URL - https://sequelize.org/master/manual/model-basics.html
 */

Service.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		//
		title: new DataTypes.STRING(200),
		image: new DataTypes.STRING(100),
		//
		views: {
			type: DataTypes.INTEGER.UNSIGNED,
			defaultValue: 0,
		},
	},
	{
		tableName: 'service',
		sequelize,
		paranoid: true,
	}
);

export default Service;
