//****************************************************

//  Контроллер пользователя(логика)

//****************************************************

//----------Подключения--------------

//для обработки ошибок 
const ApiError = require('../error/ApiError')

//хеширование
const bcrypt = require('bcrypt')
//модели для запросов к ним 
const { User } = require('../models/models')
//токен авторизации 
const jwt = require('jsonwebtoken')


const generateJwt = (id, email) => {
    return jwt.sign(
        { id, email},
        process.env.SECRET_KEY,
        { expiresIn: '24h'}
    )
}

//----------Контроллеры--------------
class UserController {

    //регистрация 
    async registration(req, res, next) {
        const { email, password } = req.body
        //если пароля и емейла нету
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        //проверить если такой емейл есть
        const candidate = await User.findOne({ where: { email } })

        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        //хешируем пароль (пароль, сколько раз хешируем - 5 раз)
        const hashPassword = await bcrypt.hash(password, 5)

        //создаем пользователя
        const user = await User.create({ email, password: hashPassword })
        
        
        //генерируем токен
        const token = generateJwt(user.id, user.email)

        return res.json({ token })
    }

    //авторизация
    async login(req, res, next) {
        //вытаскиваем емаил и пасс из тела запроса  
        const { email, password } = req.body
        //ищем юзера по емэйлу 
        const user = await User.findOne({ where: { email } })

        if (!user) {
            next(ApiError.internal('пользователь с таким email не найден'))
        }
        //сравниваем пароли(1 аргумент, пароль что написал пользователь, 2 пароль из базы данных)
        let comparePassword = bcrypt.compareSync(password, user.password)
        //если пароли не совпадают выдаем ошибку через функцию некст 
        if (!comparePassword) {
            next(ApiError.internal('Пароль не верный'))
        }

        //генерируем jwt токен userid basketid
        const token = generateJwt(user.id, user.email)

        //возвращаем json
        return res.json({ token })
    }

    //функция сводится к перезаписи токена
    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.email)
        return res.json({token})
    }
    //получить фото профиля
    async getImg(req, res) {

        const {id} = req.query

        const img = await User.findOne({ where: { id } }) 

        return res.json(img)
    } 


}

module.exports = new UserController()