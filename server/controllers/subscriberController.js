//****************************************************

//  Контроллер подписчика(логика)

//****************************************************

//----------Подключения--------------

//модели для запросов к ним 
const { Subscriber } = require('../models/models')


//----------Контроллеры--------------
class SubscriberController {
  //получение всех подписчиков пользователя 
  async getAll(req, res){
    const { userId } = req.query
    
    const subscribers = await Subscriber.findAndCountAll({
        where: { userId }
    })
    
    return res.json(subscribers)
  }
  
  //добавление подписчика пользователю
  async add(req, res){
    const { userId } = req.body
    
    const subscriber = await Subscriber.create({ userId })
    
    return res.json(subscriber)
  }
  
  //получение одного подписчика пользователя
  async getOne(req , res){
    //id подписчика 
    const { id } = req.params
    
    const subscriber = await Subscriber.findOne({
       where: { id }
    })
    
    return res.json(subscriber)
  }
}

module.exports = new SubscriberController()