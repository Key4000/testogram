// ***********************************************

//  роутер пользователя (все маршруты по пользователю)

// ***********************************************
//----------Подключения--------------

//подключаем експресс и создаем экземпляр роутера 
const Router = require('express')
const router = new Router()
//Подключаем контроллер с функциями(логикой)
const userController =  require('../controllers/userController')
//подключаем мидлвейр с проверкой токена на валидность
const authMiddleware = require('../middleware/authMiddleware')

//------------Маршруты-----------------

//маршрут регистрации
router.post('/registration', userController.registration)
//маршрут авторизация
router.post('/login', userController.login)
//проверка авторизации пользователя
router.get('/auth', authMiddleware, userController.check)
//получить картинку профиля
router.get('/img/:id', userController.getImg)
//получить имя пользователя по id
router.get('/name/:id', userController.getName)
//получить имя пользователя по id
router.post('/img', userController.addImg)
//получить id пользователя по имени
router.get('/link/:name', userController.getLink)



module.exports = router