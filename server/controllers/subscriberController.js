//****************************************************

//  Контроллер подписчика

//****************************************************

//----------Подключения--------------

//модели для запросов к ним 
const { Subscriber } = require('../models/models')


//----------Контроллеры--------------
class SubscriberController {

  //получить всех подписчиков
  async getAll(req, res){
    const { userId } = req.query

    const subscriber = await Subscriber.findAndCountAll({
        where: { userId }
    })

    return res.json(subscriber)
  }

  //добавить подписчика
  async add(req, res){
    const { name, subId, userId} = req.body

    const subscriber = await Subscriber.create({ name, subId,  userId })

    return res.json(subscriber)
  }

}

module.exports = new SubscriptionController()
