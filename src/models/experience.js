module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define(
    "experience",
    {
      ID: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      Position: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Organization: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      StartDate: {
        type: DataTypes.DATE,
      },
      EndDate: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "experiences",
      createdAt: 'CreatedAt',
      updatedAt: 'UpdatedAt',
      name: {
        singular: "experience",
        plural: "experiences",
      },
    }
  )

  schema.associate = (models) => {
    models.experience.belongsTo(models.user, {
      onDelete: "CASCADE",
      foreignKey: "UserID",
      targetKey: "ID",
    });
  };

  return schema;
}