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

//получение всех лайков пользователя
router.get('/', likeController.getAll)

//добавление лайка к посту 
router.post('/', likeController.add)



module.exports = router