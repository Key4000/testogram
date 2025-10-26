//****************************************************

//  запросы по публикациям, Axios

//****************************************************

import {$authHost} from './index'


//Получаем все публикации пользователя 
export const fetchPublication = async (userId, page, limit = 10 ) => {
  const {data} = await $authHost.get('api/publication', {params : {
    userId, page, limit
  }})
  return data 
}

//Получаем одну публикацию 
export const fetchLast = async (userId, offset) => {
  const {data} = await $authHost.get('api/publication/last', {params:{
    userId}, offset
  })
  //возвращаем только первый эл-т массива в котором хранится объект
  return data[0]
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
export const fetchCom = async (publicationId ) => {
  const {data} = await $authHost.get('api/comment/' , {params:{
    publicationId 
  }})
  return data 
} 


