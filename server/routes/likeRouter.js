// ***********************************************

//  роутер лайка

// ***********************************************
//----------Подключения--------------

//подключаем експресс и создаем экземпляр роутера 
const Router = require('express')
const router = new Router()
//Подключаем контроллер с функциями(логикой)

const likeController =  require('../controllers/likeController')

//------------Маршруты-----------------

//получение всех комментов публикации
router.get('/', likeController.getAll)

//добавление коммента публикации 
router.post('/', likeController.add)

//получение одного коммента публикации 
router.get('/:id', likeController.getOne)


module.exports = router