//****************************************************

//  модальное окно с подписками 

//****************************************************
import React, { useEffect } from 'react'
import { Container, Modal, ListGroup } from 'react-bootstrap';
import { Context } from '../../index';
import { useContext } from 'react';
import { observer } from 'mobx-react-lite'
import Logo from '../Logo/Logo'
import { getAvatar, getName } from "../../http/userAPI"


const SubscriptionWindow = observer(({ show, onHide }) => {

  //Получаем хранилище
  const { sub } = useContext(Context)

   useEffect(() => {
     //подгружаем имена и аватарки к подпискам
     sub.subscription.map(person => {
       getAvatar(person.subId).then(data => { person.avatar = data.img})
       getName(person.subId).then(data => { person.name = data.name })
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
>
  <Logo src={person.avatar}></Logo>
  <Link to={PROFILE_ROUTE + '/' + person.subId} reloadDocument style={{ marginLeft: "20px", cursor: "pointer", color: "black", textDecoration: "none" }}>{person.name}</Link>
</ListGroup.Item>
          )}
        </ListGroup>}
      </Modal.Body>
    </Modal>
  )
})

export default SubscriptionWindow;