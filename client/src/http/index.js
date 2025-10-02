import axios from 'axios'

//первый instance для запросов не требующих авторизации (public)
const $host = axios.create({
    baseURL : process.env.REACT_APP_API_URL, 
})


//instance только для авторизованных запросов
const $authHost = axios.create({
    baseURL : process.env.REACT_APP_API_URL 
}) 

//перехватчик для того чтобы автоматически подставлять токен авторизации к 2 instance
const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

//вещаем перехватичик который подставляет токен авторизации в хедер запроса
$authHost.interceptors.request.use(authInterceptor)

export{
    $host, 
    $authHost
}