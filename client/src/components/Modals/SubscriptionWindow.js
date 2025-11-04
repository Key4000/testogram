//****************************************************

//  модальное окно с подписками 

//****************************************************
import React, { useEffect } from 'react'
import { Container, Modal, ListGroup } from 'react-bootstrap';
import { Context } from '../../index';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { PROFILE_ROUTE } from '../../utils/consts'
import { observer } from 'mobx-react-lite'
import Logo from '../Logo/Logo'
import { getAvatar, getName } from "../../http/userAPI"


const SubscriptionWindow = observer(({ show, onHide }) => {

  //Получаем хранилище
  const { sub } = useContext(Context)

  const navigate = useNavigate();

  let subArr = []

   useEffect(() => {
     //подгружаем имена и аватарки к подпискам
     sub.subscription.map(person => {
       getAvatar(person.subId).then(data => { person.avatar = data })
       getName(person.subId).then(data => { person.name = data })
     })
   }, [])

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
         {show && <ListGroup>
          {sub.subscription.map(person =>
            <ListGroup.Item
              style={{ cursor: "pointer" }}
              key={person.id}
              // onClick={navigate(PROFILE_ROUTE + '/' + person.subId)}
            >
              <Logo src={person.avatar}></Logo>
              {person.name}
            </ListGroup.Item>
          )}
        </ListGroup>}
      </Modal.Body>
    </Modal>
  )
})

export default SubscriptionWindow;