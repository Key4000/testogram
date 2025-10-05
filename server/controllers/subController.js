//****************************************************

//  Контроллер подписчика

//****************************************************

//----------Подключения--------------

//модели для запросов к ним 
const { Sub } = require('../models/models')
const ApiError = require('../error/ApiError')

//----------Контроллеры--------------
class SubController {

  //получить всех подписчиков
  async getAllScriber(req, res) {
    const { userId } = req.query

    const subscriber = await Sub.findAndCountAll({
      where: { subId: userId }
    })

    return res.json(subscriber)
  }

  //получить всех подписчиков
  async getAllScription(req, res) {
    const { userId } = req.query

    const subscription = await Sub.findAndCountAll({
      where: { userId }
    })

    return res.json(subscription)
  }

  //добавить подписки
  async add(req, res, next) {
    try {
      const { subId, userId } = req.body

      if (subId === userId) return next(ApiError.badRequest("Нельзя подписаться на самого себя"))

      const sub = await Sub.create({ subId, userId })

      return res.json(sub)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

}

module.exports = new SubController()
