// ***********************************************

//  роутер комментариев

// ***********************************************
//----------Подключения--------------

//подключаем експресс и создаем экземпляр роутера 
const Router = require('express')
const router = new Router()
//Подключаем контроллер с функциями(логикой)

const commentController =  require('../controllers/commentController')

//------------Маршруты-----------------

//получение всех комментов публикации
router.get('/', commentController.getAll)

//добавление коммента публикации 
router.post('/', commentController.add)

//получение одного коммента публикации 
router.get('/:id', commentController.getOne)


module.exports = router