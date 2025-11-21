//****************************************************

//  Контроллер лайка(логика)

//****************************************************

//----------Подключения--------------

//модели для запросов к ним 
const { Like } = require('../models/models')


//----------Контроллеры--------------
class LikeController {
  
  //получение всех лайков пользователя 
  async getAll(req, res){
    const { whomId } = req.query
    
    const like = await Like.findAll({
        where: { whomId }
    })
    
    return res.json(like)
  }
  
  //добавление лайка к посту 
  async add(req, res){
    const { publicationId, whomId, userId} = req.body
    
    const like = await Like.create({ publicationId, whomId, userId })
    
    return res.json(like)
  }
  
  
}

module.exports = new LikeController()