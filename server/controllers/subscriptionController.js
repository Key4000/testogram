//****************************************************

//  Контроллер подписки(логика)

//****************************************************

//----------Подключения--------------

//модели для запросов к ним 
const { Subscription } = require('../models/models')


//----------Контроллеры--------------
class SubscriptionController {
  
  //получение всех подписчиков пользователя 
  async getAll(req, res){
    const { userId } = req.query
    
    const subscriptions = await Subscription.findAndCountAll({
        where: { userId }
    })
    
    return res.json(subscriptions)
  }
  
  //добавление подписчика пользователю
  async add(req, res){
    const { userId } = req.body
    
    const subscription = await Subscription.create({ userId })
    
    return res.json(subscription)
  }
  
  //получение одного подписчика пользователя
  async getOne(req , res){
    //id подписчика 
    const { id } = req.params
    
    const subscription = await Subscription.findOne({
       where: { id }
    })
    
    return res.json(subscription)
  }
}

module.exports = new SubscriptionController()