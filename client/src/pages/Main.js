//****************************************************

//  Основная страница с лентой публикаций

//****************************************************
//все что с реактом
import React from 'react'
import {Container, Card } from 'react-bootstrap';
import { useContext } from 'react';
import { Context } from '../index';
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react';
//запросы axios
import { fetchSubscription } from '../http/subsAPI';
import { fetchPublication } from '../http/publicationAPI';
//Свои компоненты
import { PostList } from '../components/PostList'


const Main = observer(() => {
  

//Получаем хранилище пользователя
const { subscription, user } = useContext(Context)

//----------
useEffect(() => {
  //подгружаем все подписки  
 fetchSubscription(userId).then(data => {
   subscription.setSubscription(data.rows)
   subscription.setCount(data.count)
   
   subscription.subscription.map(person =>
    {
     //здесь мы должны достать из person userId, и передать в функцию получения публикаций 
     fetchPublication(person.subId).then(data => 
       {
         //передаем старый массив с публикациями подписок
         subscription.setPosts([...subscription.posts, data.rows])
         //передаем старый count и плюсуем новый из data
         subscription.setCountPosts(subscription.countPosts + data.count)
         }
    })
 }
  
}, []) 


     
return (
<Container>
  <PostList/>
</Container>
)
})

export default Main ;