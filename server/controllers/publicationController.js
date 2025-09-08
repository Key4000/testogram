//****************************************************

//  Контроллер публикаций(логика)

//****************************************************

//----------Подключения--------------

//для обработки ошибок 
const ApiError = require('../error/ApiError')

//модели для запросов к ним 
const { Publication, User } = require('../models/models')


//генерирует случайные id , которые не повторяются 
const uuid = require('uuid')
const uuid = require('path')


//----------Контроллеры--------------
class PublicationController {

    //получение всех публикаций данного пользователя 
    async getAll(req, res, next) {
      //в запросе мы должны передать id пользователя ,чьи посты 
      const { userId } = req.query
     
      //отправляем запрос в бд 
      const publications = await Publication.findAll({
         where: { userId }
      })
     
      return res.json(publications)
    }
    
    //создание публикации
    async create(req, res, next){
      try{
        const {userName, text, userId} = req.body
        const {img} = req.files
      
         //генерируем уникальное имя картинке
        let fileName = uuid.v4() + ".jpg"
         //перемещаем картинку в папку со статикой (resolve адаптирует указанный путь к операционной системе )
          //__dirname - путь до текущей папки, '..' - возвращают на дерикторию ниже в server 
        img.mv(path.resolve(__dirname, '..', 'static', fileName))
      
        const publication = await Publication.create({
            userName , text , userId, img: fileName
           })
      
       return res.json(publication)
      } catch (e) {
        next(ApiError.badRequest(e.message))
      }
      
      
    }

    //получение одной публикации по id данного пользователя 
    async getOne(req , res){
      //id самой публикации 
      const { id } = req.params
      
      //отправляем запрос в бд 
      const publication = await Publication.findOne({
         where: { id }
      })
     
      return res.json(publication)
    }


}

module.exports = new PublicationController()