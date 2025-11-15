//****************************************************

//  пользовательские запросы, Axios

//****************************************************
import {$authHost, $host} from './index'
import {jwtDecode} from 'jwt-decode'

export const registration = async (email, password, name) => {
 const {data} = await $host.post('api/user/registration', {email, password, name})
 localStorage.setItem('token', data.token)
 return jwtDecode(data.token)
}

export const login = async (email, password) => {
 const {data} = await $host.post('api/user/login', {email, password})
 localStorage.setItem('token', data.token)
 return jwtDecode(data.token) 
}

export const check = async () => {
 const {data} = await $authHost.get('api/user/auth')
 localStorage.setItem('token', data.token)
 return jwtDecode(data.token) 
}

//получить всех пользователей, по имени 
export const fetchLink = async (name) => {
  const {data} = await $authHost.get('api/user/link/' + name)

  console.log("data-API--",data)
  return data
}

//получить аватар по id 
export const getAvatar = async (id) =>
{
  const {data} = await $authHost.get('api/user/img/' + id )

  return data
}

//получить имя пользователя по id 
export const getName = async (id) =>
{
  const {data} = await $authHost.get('api/user/name/' + id )

  return data
}
