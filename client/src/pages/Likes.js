//****************************************************

//  Страница с лайками 

//****************************************************
//все что с реактом
import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Container, ListGroup } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite'
import { Context } from '../index';
//запросы
import { fetchLike } from '../http/publicationAPI'
import { getAvatar, getName } from '../http/userAPI'


//роуты 
import { } from '../utils/consts'
import SideBar from '../components/SideBar';

const Likes = observer(() => {

  const [likes, setLikes] = useState([])

  const { user } = useContext(Context)

  useEffect(() => {
    fetchLike(user.user.id).then(data => {
      setLikes(data.rows)
      // let arr = []
      // //подгружаем все лайки, что поставили данному пользователю
      // data.rows.map(like => {
      //   let obj = {}
      //   getName(like.userId).then(data => obj.name = data)
      //   getAvatar(like.userId).then(data => obj.avatar = data)
      //   arr.push(obj)
      // })
      // setLikes(arr)
    })
  }, [])
  return (
    <div>
      <SideBar />
      <Container>
        <ListGroup>
          {likes.map(person =>
            <ListGroup.Item
              style={{ cursor: "pointer" }}
              key={person.id}
            >
              {console.log('test - ', person)}
              {person.id}
            </ListGroup.Item>
          )}
        </ListGroup>
      </Container>

    </div>
  )
})

export default Likes;