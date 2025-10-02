//****************************************************

//  Страница с лайками 

//****************************************************
//все что с реактом
import React from 'react'
import { Container } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Context } from '../index';
//запросы
import { fetchLike } from '../http/publicationAPI'
import { getOne } from '../http/userAPI' 
//свои 
import { Logo } from "../components /Logo/Logo"

//роуты 
import {  } from  '../utils/consts' 

const Like = observer(() => {

const [likes, setLikes] = useState(null)

const { user} = useContext(Context)

useEffect(() => {
 fetchLike(user.user.id).then(likes => {
   //подгружаем все лайки, что поставили данному пользователю
   likes.map(like => {
      //здесь запрос на пользователя с like.userId
      getOne(like.userId).then(person => {
        //добавляем в объект с лайками имя того, кто поставил лайк 
        like.name = person.name
      })
   })}
}, []) 

return (
<Container>
<ListGroup>
 {likes.map(like =>
   <ListGroup.Item
       style={{ cursor: "pointer" }}
       key={like.id}
       onClick={navigate(PROFILE_ROUTE+ '/' + like.userId)}
   >
   {like.name}
   </ListGroup.Item>
)}
</ListGroup>
</Container>
)
})

export default Like;