// This file will contain the sequelize model for the user table

module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define("User", {
		username: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
			validate: {
				len: [4, 80]
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [8, 300]
			}
		},
	});
	return User;
};
