//****************************************************

//  Контроллер подписки

//****************************************************

//----------Подключения--------------
//модели для запросов к ним 
const { Subscription } = require('../models/models')

//----------Контроллеры--------------
class SubscriptionController {

  //получить все подписки
  async getAll(req, res){
    const { userId } = req.query

    const subscription = await Subscription.findAndCountAll({
        where: { userId }
    })

    return res.json(subscription)
  }

  //добавить подписчика
  async add(req, res){
    const { name, subId, userId} = req.body

    const subscription = await Subscription.create({ name, subId,  userId })

    return res.json(subscription)
  }

}

module.exports = new SubscriptionController()
