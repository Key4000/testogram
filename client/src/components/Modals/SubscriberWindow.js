//****************************************************
//  модальное окно с подписчиками
//****************************************************
import { Modal, ListGroup } from 'react-bootstrap';
import { Context } from '../../index';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { PROFILE_ROUTE } from '../../utils/consts'
import { observer } from 'mobx-react-lite'
import Logo from '../Logo/Logo'
import { getAvatar, getName } from '../../http/userAPI';


const SubscriberWindow = observer(({ show, onHide }) => {

  //Получаем хранилище
  const { sub } = useContext(Context)

  useEffect(() => {
    //подгружаем имена и аватарки к подпискам
    sub.subscriber.map(person => {
      getAvatar(person.subId).then(data => {
        person.avatar = data
      })
      getName(person.subId).then(data => {
        person.name = data
      })
    })
  }, [show])

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
    >
      <Modal.Header closeButton>
        ПОДПИСЧИКИ
      </Modal.Header>
      <Modal.Body>
        {show && <ListGroup>
          {sub.subscriber.map(person =>
            <ListGroup.Item
              style={{ cursor: "pointer", display: "flex" }}
              key={person.id}
            >
              <Logo src={process.env.REACT_APP_API_URL + person.avatar}></Logo>
              <Link to={PROFILE_ROUTE + '/' + person.subId} reloadDocument style={{ marginLeft: "20px", cursor: "pointer", color: "black", textDecoration: "none" }}>{person.name}</Link>
            </ListGroup.Item>
          )}
        </ListGroup>}
      </Modal.Body>
    </Modal>
  )
})

export default SubscriberWindow;