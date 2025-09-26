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
  img: {type: DataTypes.STRING, allowNull: false}, 
})

//Модель публикации 
const Publication = sequelize.define('publication', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  userName: {type: DataTypes.STRING},
  img: {type: DataTypes.STRING, allowNull: false}, 
  text: {type: DataTypes.STRING}
})

//Модель подписчиков
const Subscriber = sequelize.define('subscriber', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
  name: {type: DataTypes.STRING},
  subId: {type: DataTypes.INTEGER}
})

//Модель подписок
const Subscription = sequelize.define('subscriber', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
  name: {type: DataTypes.STRING},
  subId: {type: DataTypes.INTEGER}
})

//Модель комментария 
const Comment = sequelize.define('comment', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  text: {type: DataTypes.STRING, allowNull: false}
})

//Модель лайка 
const Like = sequelize.define('like', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  isClick: {type: DataTypes.BOOLEAN, allowNull: false}
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
User.hasMany(Subscriber)
Subscriber.belongsTo(User)

//Пользователь - Подписка (Один ко многим)
User.hasMany(Subscription)
Subscription.belongsTo(User)

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
  Subscriber,
  Subscription
}




 