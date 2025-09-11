//****************************************************

//  Контроллер подписки(логика)

//****************************************************

//----------Подключения--------------

//модели для запросов к ним 
const { Subscribe } = require('../models/models')


//----------Контроллеры--------------
class SubscriptionController {
  
  //получить все подписки пользователя  
  // НА ФРОНТЕ ПЕРЕДАЕМ userId , ПОЛУЧАЕМ ОБЪЕКТ И ИЗ НЕГО БЕРЁМ susbcribeId , ЭТО И БУДУТ НАШИ ПОДПИСКИ
  async getSubscription(req, res){
    const { userId } = req.query
    
    const subscriptions = await Subscribe.findAndCountAll({
        where: { userId }
    })
    
    return res.json(subscriptions)
  }

  //получить всех подписчиков пользователя  
  // НА ФРОНТЕ ПЕРЕДАЕМ userId , ПОЛУЧАЕМ ОБЪЕКТ И ИЗ НЕГО БЕРЁМ ТОЖЕ userId , ЭТО И БУДУТ НАШИ ПОДПИСЧИКИ 
  async getSubscriber(req, res){
    //получаем id пользователя текущего
    const { userId } = req.query

    //но передаем его как id подписки
    const subscribeId = userId

    const subscribers = await Subscribe.findAndCountAll({
        where: { subscribeId }
    })
    
    return res.json(subscribers)
  }
  
  //добавление пользователю подписки на другого пользователя 

  async add(req, res){
    const { userId, subscribeId } = req.body

    //------ЗДЕСЬ НАДО СДЕЛАТЬ ВАЛИДАЦИЮ НА ПОВТОРЕНИЕ ПОДПИСКИ , ТАКОГО НЕ ДОЛЖНО БЫТЬ---------

    const subscribe = await Subscribe.create({ userId, subscribeId })
    
    return res.json(subscribe)
  }
  
  //получить конкретную подписку пользователя
  // async getOne(req , res){
  //   //id подписчика 
  //   const { id } = req.params
    
  //   const subscription = await Subscription.findOne({
  //      where: { id }
  //   })
    
  //   return res.json(subscription)
  // }
}

module.exports = new SubscriptionController()