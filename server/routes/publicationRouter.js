// ***********************************************

//  роутер публикации

// ***********************************************
//----------Подключения--------------

//подключаем експресс и создаем экземпляр роутера 
const Router = require('express')
const router = new Router()
//Подключаем контроллер с функциями(логикой)
const publicationController =  require('../controllers/publicationController')

//------------Маршруты-----------------

//получение всех публикаций данного пользователя 
router.get('/', publicationController.getAll)

//создание публикации 
router.post('/', publicationController.create)

//получение одной публикации по id данного пользователя 
router.get('/:id', publicationController.getOne)


module.exports = router