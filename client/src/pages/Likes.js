//****************************************************

//  Страница с лайками 

//****************************************************
//все что с реактом
import React from 'react'
import { Container } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite'
import { Context } from '../index';
//запросы
import { fetchLike } from '../http/publicationAPI'
import { getOne } from '../http/userAPI'


//роуты 
import { } from '../utils/consts'

const Likes = observer(() => {

  const [likes, setLikes] = useState(null)

  const { user } = useContext(Context)

  // useEffect(() => {
  //   fetchLike(user.user.id).then(likes => {
  //     //подгружаем все лайки, что поставили данному пользователю
  //     likes.map(like => {
  //       //здесь запрос на пользователя с like.userId
  //       getOne(like.userId).then(person => {
  //         //добавляем в объект с лайками имя того, кто поставил лайк 
  //         like.name = person.name
  //       })
  //     })
  //   }
  // }, [])

  return (
    <Container>
      <ListGroup>
        {likes.map(like =>
          <ListGroup.Item
            style={{ cursor: "pointer" }}
            key={like.id}
          >
            {like.name}
          </ListGroup.Item>
        )}
      </ListGroup>
    </Container>
  )
})

export default Likes;