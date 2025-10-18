//****************************************************

//  Контроллер публикаций(логика)

//****************************************************

//----------Подключения--------------

//для обработки ошибок 
const ApiError = require('../error/ApiError')

//модели для запросов к ним 
const { Publication } = require('../models/models')


//генерирует случайные id , которые не повторяются 
const uuid = require('uuid')
const path = require('path')


//----------Контроллеры--------------
class PublicationController {

  //получение всех публикаций данного пользователя 
  async getAll(req, res, next) {
    //в запросе мы должны передать id пользователя ,чьи посты 
    const { userId, limit, page } = req.query

    //отправляем запрос в бд 
    const publications = await Publication.findAndCountAll({
      where: { userId }, limit, page
    }
    )

    return res.json(publications)
  }

  //создание публикации
  async create(req, res, next) {
    try {
      const { text, userId } = req.body
      const { img } = req.files

      //генерируем уникальное имя картинке
      let fileName = uuid.v4() + ".jpg"
      //перемещаем картинку в папку со статикой (resolve адаптирует указанный путь к операционной системе )
      //__dirname - путь до текущей папки, '..' - возвращают на дерикторию ниже в server 
      img.mv(path.resolve(__dirname, '..', 'static', fileName))

      const publication = await Publication.create({
        text, userId, img: fileName
      })

      return res.json(publication)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }


  }

  //получение одной публикации по id  
  async getOne(req, res) {
    //id самой публикации 
    const { id } = req.params

    //отправляем запрос в бд 
    const publication = await Publication.findOne({
      where: { id }
    })

    return res.json(publication)
  }

  //получение одной последней   
  async getDate(req, res) {
    console.log(" ------------------------------------------------------------------------------------------------------- ")
    const { userId, offset } = req.query

    console.log(" - ", userId)
    console.log(" - ", offset)
    console.log(" ------------------------------------------------------------------------------------------------------- ")
    // //отправляем запрос в бд 
    // const publication = await Publication.findAll({
    //    where: { userId }, 
    //    order: [['createdAt', 'DESC']],
    //    limit: 1, 
    //    offset: offset      
    // })

    //отправляем запрос в бд 
    const publication = await Publication.findAndCountAll({
      where: { userId }
    }
    )

    return res.json(publication)
  }


}

module.exports = new PublicationController()