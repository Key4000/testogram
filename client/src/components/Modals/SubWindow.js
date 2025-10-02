//****************************************************

//  модальное окно с подписчиками, подписками 

//****************************************************
import React from 'react'
import { Container,  Modal, ListGroup } from 'react-bootstrap';
import { Context } from '.. /../index';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { PROFILE_ROUTE } from '.. /../utils/consts'
import { observer } from 'mobx-react-lite'


const SubWindow = observer(({ show, onHide,  isSubscriber }) => {

//Получаем хранилище
const { subscriber,  subscription } = useContext(Context)


return (
<Modal
  show={show}
  onHide={onHide}
  centered
 >
<Modal.Header closeButton>
</Modal.Header>
<Modal.Body>
 {isSubscriber? 
  <ListGroup> 
  {subscriber.subscriber.map(person =>
   <ListGroup.Item
     style={{ cursor: "pointer" }}
     key={person.id}
     onClick={navigate(PROFILE_ROUTE+ '/' + person.subId)}
    >
    {person.name}
    </ListGroup.Item>
   )} 
  </ListGroup>
  :
  <ListGroup>
       {subscription.subscription.map(person =>
     <ListGroup.Item
       style={{ cursor: "pointer" }}
       key={person.id}
       onClick={navigate(PROFILE_ROUTE+ '/' + person.subId)}
     >
     {person.name}
     </ListGroup.Item>
   )}
  </ListGroup>
</Modal.Body>
</Modal>
   )
}) 

export default SubWindow;