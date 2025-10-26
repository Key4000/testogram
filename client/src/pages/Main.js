//****************************************************
//  Основная страница с лентой публикаций
//****************************************************
//все что с реактом
import React from 'react'

import { Context } from '../index';
import { observer } from 'mobx-react-lite'
import { useContext } from 'react';
//Свои компоненты
import PostList from '../components/PostList'
import { Container } from 'react-bootstrap';
import SideBar from '../components/SideBar'


const Main = observer(() => {

  //Получаем хранилище пользователя
  const { user } = useContext(Context)

  return (
    <div className="d-flex">
      <SideBar/>
      <Container>
        <PostList
          id={user.user.id}
        />
      </Container>
    </div>

  )
})

export default Main;