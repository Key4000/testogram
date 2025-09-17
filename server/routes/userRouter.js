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
router.get('/getImg', userController.getImg)
//получить всех пользователей по name 
router.get('/', userController.getAll)




module.exports = router