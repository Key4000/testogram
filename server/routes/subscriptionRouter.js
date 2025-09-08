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

//получение всех подписок пользователя
router.get('/', subscriptionController.getAll)

//добавление подписки пользователю
router.post('/', subscriptionController.add)

//получение одного подписки пользователя
router.get('/:id', subscriptionController.getOne)


module.exports = router