// ***********************************************

//  Основной роутер , связующее звено , 
//  для подроутеров

// ***********************************************
const Router = require('express')
const router = new Router()

//подключаем подроутеры
const userRouter = require('./userRouter')
const publicationRouter = require('./publicationRouter')
const subscriberRouter = require('./subRouter')
const likeRouter = require('./likeRouter')
const commentRouter = require('./commentRouter')


//указываем подроутеры , и маршруты по которым они будут отрабатывать
router.use('/user', userRouter)
router.use('/publication', publicationRouter)
router.use('/sub', subscriberRouter)
router.use('/like', likeRouter)
router.use('/comment', commentRouter)


module.exports = router