module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define(
    "user",
    {
      ID: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Phone: {
        type: DataTypes.STRING,
      },
      Line: {
        type: DataTypes.STRING,
      },
      Description: {
        type: DataTypes.TEXT,
      },
      BirthDate: {
        type: DataTypes.DATE,
      },
      Address: {
        type: DataTypes.TEXT,
      },
      ProfileImage: {
        type: DataTypes.TEXT,
      },
      BackgroundImage: {
        type: DataTypes.TEXT,
      }
    },
    {
      tableName: "users",
      createdAt: 'CreatedAt',
      updatedAt: 'UpdatedAt',
      name: {
        singular: "user",
        plural: "users",
      },
    }
  )

  return User;
}