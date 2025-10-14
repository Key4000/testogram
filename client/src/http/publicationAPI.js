//****************************************************

//  запросы по публикациям, Axios

//****************************************************

import {$authHost, $host} from './index'


//Получаем все публикации пользователя 
export const fetchPublication = async (userId, page, limit = 10 ) => {
  const {data} = await $authHost.get('api/publication', {params : {
    userId, page, limit
  }})
  return data 
}

//Получаем одну публикацию 
export const fetchOneDate = async (userId, offset) => {
  const {data} = await $authHost.get('api/publication/oneDate', {params:{
    userId, offset
  }})
  return data 
}


//Получить все лайки пользователя
export const fetchLike = async (whomId) => {
  const {data} = await $authHost.get('api/like', {params:{
    whomId
  }})
  return data 
}

//добавить коментарий 
export const addCom = async (comment) => {
  const {data} = await $authHost.post('api/comment', comment )
  return data 
}

//получить все коментарии поста по id 
export const fetchCom = async (id) => {
  const {data} = await $authHost.get('api/comment/' + id )
  return data 
} 


