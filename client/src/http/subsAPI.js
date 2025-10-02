//****************************************************

//  запросы по подпискам, подписчикам, Axios

//****************************************************

import {$authHost, $host} from './index'

//получаем все подписки 
export const fetchSubscription = async (userId) => {
  const {data} = await $authHost.get('api/subscription', params:{
    userId
  })
  return data 
} 

//получаем всех подписчиков
export const fetchSubscriber = async (userId) => {
  const {data} = await $authHost.get('api/subscriber', params:{
    userId
  })
  return data 
} 

