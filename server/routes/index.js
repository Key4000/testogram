// ***********************************************

//  Основной роутер , связующее звено , 
//  для подроутеров

// ***********************************************
const Router = require('express')
const router = new Router()

//подключаем подроутеры
const userRouter = require('./userRouter')
const publicationRouter = require('./publicationRouter')
const subscribeRouter = require('./subscribeRouter')
const likeRouter = require('./likeRouter')
const commentRouter = require('./commentRouter')


//указываем подроутеры , и маршруты по которым они будут отрабатывать
router.use('/user', userRouter)
router.use('/publication', publicationRouter)
router.use('/subscribe', subscribeRouter)
router.use('/like', likeRouter)
router.use('/comment', commentRouter)


module.exports = router