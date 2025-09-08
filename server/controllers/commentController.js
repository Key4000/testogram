//****************************************************

//  Контроллер коммента(логика)

//****************************************************

//----------Подключения--------------

//модели для запросов к ним 
const { Comment } = require('../models/models')


//----------Контроллеры--------------
class CommentController {
  
  //получение всех комментов публикации 
  async getAll(req, res){
    const { publicationId } = req.query
    
    const  = await Comment.findAndCountAll({
        where: { publicationId }
    })
    
    return res.json(comments)
  }
  
  //добавление подписчика пользователю
  async add(req, res){
    const { publicationId } = req.body
    
    const comment = await Comment.create({ publicationId })
    
    return res.json(comment)
  }
  
  //получение одного подписчика пользователя
  async getOne(req , res){
    //id подписчика 
    const { id } = req.params
    
    const comment = await Comment.findOne({
       where: { id }
    })
    
    return res.json(comment)
  }
}

module.exports = new CommentController()