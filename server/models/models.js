// ******************************************
// Здесь описываются модели данных 
// 
// То, как они хранятся в Базе данных
// 
// ******************************************

//получаем объект подключения к бд ,чтобы по нему создавать модели (таблицы в бд)
const sequelize = require('../db')
const {DataTypes} = require('sequelize')

//Модель пользователя 
const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  email: {type: DataTypes.STRING, unique: true, },
  password: {type: DataTypes.STRING,},
  name: {type: DataTypes.STRING, unique: true, },
  img: {type: DataTypes.STRING}, 
})

//Модель публикации 
const Publication = sequelize.define('publication', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  img: {type: DataTypes.STRING, allowNull: false}, 
  text: {type: DataTypes.STRING}
})

//Модель подписки
const Sub = sequelize.define('sub', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  subId: {type: DataTypes.INTEGER}
})


//Модель комментария 
const Comment = sequelize.define('comment', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  text: {type: DataTypes.STRING, allowNull: false}, 
  whomId: {type: DataTypes.INTEGER}
})

//Модель лайка 
const Like = sequelize.define('like', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  whomId: {type: DataTypes.INTEGER}
})

// *********************************************************

// Описание того , как модели , которые описаны наверху ^

// связаны друг с другом: один ко многим , многие ко многим 

// и т.д.

// *********************************************************

//Пользователь - Лайк (один к одному) 
User.hasOne(Like)
Like.belongsTo(User)

//Пользователь - Коммент (один к одному) 
User.hasOne(Comment)
Comment.belongsTo(User)

//Пользователь - Подписчик (Один ко многим)
User.hasMany(Sub)
Sub.belongsTo(User)

//Пользователь - Публикация(Один ко многим)
User.hasMany(Publication)
Publication.belongsTo(User)

//Публикация - Лайк(Один ко многим)
Publication.hasMany(Like)
Like.belongsTo(Publication)

//Публикация - Коммент(Один ко многим)
Publication.hasMany(Comment)
Comment.belongsTo(Publication)

module.exports = {
  User, 
  Publication ,
  Like,
  Comment, 
  Sub
}




 