// This file will contain the sequelize model for the survey table

module.exports = function(sequelize, DataTypes) {
	var Survey = sequelize.define("Survey", {
		electricEmission: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				//To be added
			}
		},
		naturalGasEmission: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				//To be added
			}
		},
		fuelOilEmission: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				//To be added
			}
		},
		propaneEmission: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				//To be added
			}
		},
		car1Emission: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				//To be added
			}
		},
		car2Emission: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				//To be added
			}
		},
		car3Emission: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				//To be added
			}
		},
		publicTransportationEmission: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				//To be added
			}
		},
		airEmission: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				//To be added
			}
		},
		meatEmission: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				//To be added
			}
		},
		breadEmission: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				//To be added
			}
		},
		dairyEmission: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				//To be added
			}
		},
		fruitEmission: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				//To be added
			}
		},
		otherEmission: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				//To be added
			}
		},
		clothingEmission: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				//To be added
			}
		},
		furnitureEmission: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				//To be added
			}
		},
		goodsEmission: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				//To be added
			}
		},
		servicesEmission: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				//To be added
			}
		},
		carbonFootprint: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				//To be added
			}
		}
	});

	Survey.associate = function(models) {
	    // We're saying that a Survey should belong to a User
	    // A Survey can't be created without a User due to the foreign key constraint
	    Survey.belongsTo(models.User, {
	      foreignKey: {
	        allowNull: false
	      }
	    });
  	};
	return Survey;
};


