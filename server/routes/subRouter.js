// ***********************************************

//  роутер подписчика

// ***********************************************
//----------Подключения--------------

//подключаем експресс и создаем экземпляр роутера 
const Router = require('express')
const router = new Router()
//Подключаем контроллер с функциями(логикой)

const SubController =  require('../controllers/subController')

//------------Маршруты-----------------

//получить всех подписчиков
router.get('/scriber', SubController.getAllScriber)
//получить все подписки
router.get('/scription', SubController.getAllScription)
//добавление подписки
router.post('/', SubController.add)

module.exports = router
