module.exports = (sequelize, DataTypes) => {
  const SelectBox = sequelize.define(
    'Select',
    {
      type: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      describe: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
    },
    {
      underscored: true,
      timestamps: false,
    }
  );

  return SelectBox;
};
