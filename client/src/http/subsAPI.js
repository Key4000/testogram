//****************************************************

//  запросы по подпискам, подписчикам, Axios

//****************************************************

import {$authHost} from './index'

//получаем все подписки 
export const fetchSubscription = async (userId, limit = 10, page) => {
  const {data} = await $authHost.get('api/sub/scription', {params:{
    userId, page, limit
  }})
  return data 
} 

//получаем всех подписчиков
export const fetchSubscriber = async (userId, page, limit = 10) => {
  const {data} = await $authHost.get('api/sub/scriber', {params:{
    userId, page, limit 
  }})
  return data 
} 