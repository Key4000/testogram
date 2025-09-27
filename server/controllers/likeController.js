//****************************************************

//  Контроллер лайка(логика)

//****************************************************

//----------Подключения--------------

//модели для запросов к ним 
const { Like } = require('../models/models')


//----------Контроллеры--------------
class LikeController {
  
  //получение всех комментов публикации 
  async getAll(req, res){
    const { publicationId } = req.query
    
    const like = await Like.findAll({
        where: { publicationId }
    })
    
    return res.json(like)
  }
  
  //добавление подписчика пользователю
  async add(req, res){
    const { publicationId } = req.body
    
    const like = await Like.create({ publicationId })
    
    return res.json(like)
  }
  
  //получение одного подписчика пользователя
  async getOne(req , res){
    //id подписчика 
    const { id } = req.params
    
    const like = await Like.findOne({
       where: { id }
    })
    
    return res.json(like)
  }
}

module.exports = new LikeController()