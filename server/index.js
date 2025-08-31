// ******************************************************

// Основной файл , с которого происходит запуск сервера

// cors - чтобы отправлять запросы с браузера 

// ******************************************************

// Все подключения
require('dotenv').config()
//express
const express = require('express') 
//sequelize для работы с бд
const sequelize = require('./db')
//cors , чтобы отправлять запросы 
const cors = require('cors')
//express-fileupload , для загрузки статики
const fileUpload = require('express-fileupload')
// path для работы с путями (переменной path)
const path = require('path')

//Модели данных в базе данных 
const models = require('./models/models')
//подключаем основной роутер, который тянет за собой подроутеры
const router = require('./routes/index')
//подключаем middleware обработки(handling) ошибок
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

//----------------------------------------------------------

//  Тело сервера

//----------------------------------------------------------

//берём порт из файла с переменными окружения ,либо если там нету то 5000
const PORT = process.env.PORT || 5000

//создаем сам экспресс 
const app = express()

//--------------------------------------------------------------


//  Зона middleware , здесь все обработчики 

//  Обработчики ошибок должны быть последними в очереди

//--------------------------------------------------------------

//Подключаем корс для отправки запросов 
app.use(cors())
//промежуточное ПО , чтобы парсить json формат 
app.use(express.json())

//регистрируем middleware , чтобы загружать файлы на сервер(загрузка статики)
app.use(fileUpload({ }))

//явно указываем , что файлы из папки static раздавать как статику
app.use(express.static(path.resolve(__dirname, 'static')))

//подключаем роутер , и первым параметро указываем маршурт по которому роутер отрабатывает 
app.use('/api', router)

//обработка ошибок , последний middleware
app.use(errorHandler)

//-----------------------------------------------------------------------------


//  Запуск сервера , функция запуска

//-----------------------------------------------------------------------------
const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()