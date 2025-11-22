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

  const [likes, setLikes] = useState(null)

  const { user } = useContext(Context)

  useEffect(() => {
    fetchLike(user.user.id).then(data => {
      setLikes(data)
    })
  }, [])

  useEffect(() => {
    if (likes) {
      likes.map(like => {
        getName(like.userId).then(data => like.name = data)
        getAvatar(like.userId).then(data => like.avatar = data)

      })
    }
  }, [])

  return (
    <div>
      <SideBar />
      <Container>
        <ListGroup>
          {likes && likes.map(person =>
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