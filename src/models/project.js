module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define(
    "project",
    {
      ID: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      Title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      Position: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ShowcaseURL: {
        type: DataTypes.STRING,
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
      tableName: "projects",
      createdAt: 'CreatedAt',
      updatedAt: 'UpdatedAt',
      name: {
        singular: "project",
        plural: "projects",
      },
    }
  )

  schema.associate = (models) => {
    models.project.belongsTo(models.user, {
      onDelete: "CASCADE",
      foreignKey: "UserID",
      targetKey: "ID",
    });
  };

  return schema;
}