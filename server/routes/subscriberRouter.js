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

//получить всех подписчиков
router.get('/', subscriberController.getAll)
//добавление подписчика
router.post('/', subscriberController.add)


module.exports = router
