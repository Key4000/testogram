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
//генерирует случайные id , которые не повторяются 
const uuid = require('uuid')
const path = require('path')


const generateJwt = (id, email) => {
    return jwt.sign(
        { id, email },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}

//----------Контроллеры--------------
class UserController {

    //регистрация 
    async registration(req, res, next) {
        const { email, password, name } = req.body
        //- - - - - - валидация - - - - -
        //если пароля и емейла нету
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        //проверить если такой емейл есть
        let candidate = await User.findOne({ where: { email } })
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        //проверить если такое имя есть
        candidate = await User.findOne({ where: { name } })
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким именем уже существует'))
        }
        //- - - - - - - - - 

        //хешируем пароль (пароль, сколько раз хешируем - 5 раз)
        const hashPassword = await bcrypt.hash(password, 5)

        //создаем пользователя
        const user = await User.create({ email, password: hashPassword, name })


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
        // - - - - - - - валидация - - - - - 
        if (!user) {
            next(ApiError.internal('пользователь с таким email не найден'))
        }
        //сравниваем пароли(1 аргумент, пароль что написал пользователь, 2 пароль из базы данных)
        let comparePassword = bcrypt.compareSync(password, user.password)
        //если пароли не совпадают выдаем ошибку через функцию некст 
        if (!comparePassword) {
            next(ApiError.internal('Пароль не верный'))
        }
        // - - - - - - - - 

        //генерируем jwt токен userid basketid
        const token = generateJwt(user.id, user.email)

        //возвращаем json
        return res.json({ token })
    }

    //функция сводится к перезаписи токена
    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.email)
        return res.json({ token })
    }

    //получить фото профиля
    async getImg(req, res) {

        const { id } = req.params

        const user = await User.findOne({ where: { id } })

        const avatar = user.get('img')

        return res.json({ img: avatar })
    }

    //получить имя пользователя по id 
    async getName(req, res) {

        const { id } = req.params

        const user = await User.findOne({ where: { id } })

        const userName = user.get('name')

        return res.json({ name: userName })


    }
    //добавить фото профиля
    async addImg(req, res, next) {

        try {
            const { id } = req.body

            const { img } = req.files

            //генерируем уникальное имя картинке
            let fileName = uuid.v4() + ".jpg"
            //перемещаем картинку в папку со статикой (resolve адаптирует указанный путь к операционной системе )
            //__dirname - путь до текущей папки, '..' - возвращают на дерикторию ниже в server 
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const user = await User.findOne({ id })

            user.img = fileName

            await user.save()

            return 200
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new UserController()