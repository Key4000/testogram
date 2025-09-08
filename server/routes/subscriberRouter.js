// ***********************************************

//  роутер подписчика

// ***********************************************
//----------Подключения--------------

//подключаем експресс и создаем экземпляр роутера 
const Router = require('express')
const router = new Router()
//Подключаем контроллер с функциями(логикой)
const subscriberController =  require('../controllers/subscriberController')

//------------Маршруты-----------------

//получение всех подписчиков пользователя
router.get('/', subscriberController.getAll)

//добавление подписчика пользователю
router.post('/', subscriberController.add)

//получение одного подписчика пользователя
router.get('/:id', subscriberController.getOne)


module.exports = router