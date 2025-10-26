//****************************************************

//  Страница с регистрацией 

//****************************************************
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { REGISTRATION_ROUTE, LOGIN_ROUTE, MAIN_ROUTE } from '../utils/consts'
import { login, registration, getAvatar, getName } from '../http/userAPI'
import { observer } from 'mobx-react-lite'
import { useNavigate } from "react-router-dom"
import { useContext, useState } from 'react';
import { Context } from '../index'
import { Button, Card, Col, Container, Form, Image, Row } from 'react-bootstrap'
import startimg from '../assets/startimg.png'


const Auth = observer(() => {
  const navigate = useNavigate()
  const { user } = useContext(Context)

  //получаем объект со строкой запроса 
  const location = useLocation()
  //проверка, страницу авторизации или регистрации показывать 
  const isLogin = location.pathname === LOGIN_ROUTE
  //состояния с почтой и паролем 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')


  //по нажатию отправляем запросы либо на авторизацию, либо на регистрацию 
  const click = async () => {
    try {
      let data
      if (isLogin) {
        data = await login(email, password)
      } else {
        data = await registration(email, password, name)
      }

      //добавляем юзера в хранилище
      user.setUser(data)
      user.setIsAuth(true)

      //запрос на получение картинки по id пользователя
      await getAvatar(data.id).then(data => {
        //добавляем аватар в хранилище
        user.setAvatar(data.img)
      })

      //запрос на получение имени по id пользователя
      await getName(data.id).then(data => {
        //добавляем аватар в хранилище
        user.setName(data.name)
      })

      //основная страница 
      navigate(MAIN_ROUTE)

    } catch (e) {
      alert(e.response.data.message)
    }
  }

  return (
    <Container>
      <Row className='d-flex flex-nowrap justify-content-center align-items-center'>
        <Col>

          <Card style={{ width: 600 }} className="p-5">
            <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
            <Form className="d-flex flex-column">
              <Form.Control
                className="mt-3"
                placeholder="Введите ваш email..."
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <Form.Control
                className="mt-3"
                placeholder="Введите ваш пароль..."
                value={password}
                onChange={e => setPassword(e.target.value)}
                type='password'
              />
              {!isLogin && <Form.Control
                className="mt-3"
                placeholder="Введите ваше имя..."
                value={name}
                onChange={e => setName(e.target.value)}
              />}
              <Row
                className='d-flex flex-nowrap justify-content-between mt-3'
              >
                {isLogin ?
                  <div style={{ width: 'auto' }}> Нет аккаунта?
                    <NavLink to={REGISTRATION_ROUTE}>Зарегестрируйтесь</NavLink>
                  </div> :
                  <div style={{ width: 'auto' }}> Есть аккаунт?
                    <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
                  </div>
                }
                <Button
                  style={{ width: 'auto' }}
                  variant="outline-success"
                  onClick={click}
                >
                  {isLogin ? "Войти" : "Регистрация"}
                </Button>
              </Row>
            </Form>
          </Card>
        </Col>
        <Col className='d-flex'>
          <Image src={startimg} height={"800px"} width={"800px"} />
        </Col>
      </Row>


    </Container>
  )
})

export default Auth;