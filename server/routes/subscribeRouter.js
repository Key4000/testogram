// ***********************************************

//  роутер подписки

// ***********************************************
//----------Подключения--------------

//подключаем експресс и создаем экземпляр роутера 
const Router = require('express')
const router = new Router()
//Подключаем контроллер с функциями(логикой)

const subscribeController =  require('../controllers/subscribeController')

//------------Маршруты-----------------

//получить все подписки пользователя
router.get('/subscription', subscribeController.getSubscription)
//получить всех подписчиков пользователя  
router.get('/subscriber', subscribeController.getSubscriber)
//добавление пользователю подписки на другого пользователя 
router.post('/', subscribeController.add)


//получение одного подписки пользователя
// router.get('/:id', subscriptionController.getOne)


module.exports = router