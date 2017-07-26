// This file will contain the sequelize model for the user table

module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define("User", {
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 30]
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [8, 20]
			}
		},
	});
	return User;
};
