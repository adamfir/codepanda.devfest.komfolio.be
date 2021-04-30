module.exports = (sequelize, DataTypes) => {
  const schema = sequelize.define(
    "skill",
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
      Rate: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "skills",
      createdAt: 'CreatedAt',
      updatedAt: 'UpdatedAt',
      name: {
        singular: "skill",
        plural: "skills",
      },
    }
  )

  schema.associate = (models) => {
    models.skill.belongsTo(models.user, {
      onDelete: "CASCADE",
      foreignKey: "UserID",
      targetKey: "ID",
    });
  };

  return schema;
}