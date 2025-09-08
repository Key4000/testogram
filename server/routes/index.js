// ***********************************************

//  Основной роутер , связующее звено , 
//  для подроутеров

// ***********************************************
const Router = require('express')
const router = new Router()

//подключаем подроутеры
const userRouter = require('./userRouter')
const publicationRouter = require('./publicationRouter')
const subscriberRouter = require('./subscriberRouter')


//указываем подроутеры , и маршруты по которым они будут отрабатывать
router.use('/user', userRouter)
router.use('/publication', publicationRouter)
router.use('/subscriber', subscriberRouter)


module.exports = router