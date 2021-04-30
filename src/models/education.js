module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define(
    "education",
    {
      ID: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
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
      tableName: "educations",
      createdAt: 'CreatedAt',
      updatedAt: 'UpdatedAt',
      name: {
        singular: "education",
        plural: "educations",
      },
    }
  )

  schema.associate = (models) => {
    models.education.belongsTo(models.user, {
      onDelete: "CASCADE",
      foreignKey: "UserID",
      targetKey: "ID",
    });
  };

  return schema;
}