// ***********************************************

//  роутер подписки

// ***********************************************
//----------Подключения--------------

//подключаем експресс и создаем экземпляр роутера 
const Router = require('express')
const router = new Router()
//Подключаем контроллер с функциями(логикой)

const subscriptionController =  require('../controllers/subscriptionController')

//------------Маршруты-----------------

//получить всех подписок
router.get('/', subscriptionController.getAll)
//добавление подписки
router.post('/', subscriptionController.add)


module.exports = router
