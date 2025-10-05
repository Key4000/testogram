//****************************************************

//  Контроллер коммента(логика)

//****************************************************

//----------Подключения--------------

//модели для запросов к ним 
const { Comment } = require('../models/models')


//----------Контроллеры--------------
class CommentController {

  //получение всех комментов публикации 
  async getAll(req, res) {
    const { publicationId } = req.params

    const comments = await Comment.findAll({
      where: { publicationId }
    })

    return res.json(comments)
  }

  //добавление комментария публикации 
  async add(req, res) {
    const { publicationId, text, userId, whomId } = req.body

    const comment = await Comment.create({ publicationId, text, userId, whomId})

    return res.json(comment)
  }

  
}

module.exports = new CommentController()