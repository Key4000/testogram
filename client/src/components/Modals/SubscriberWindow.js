//****************************************************
//  модальное окно с подписчиками
//****************************************************
import { Modal, ListGroup } from 'react-bootstrap';
import { Context } from '../../index';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { PROFILE_ROUTE } from '../../utils/consts'
import { observer } from 'mobx-react-lite'
import Logo from '../Logo/Logo'
import { getAvatar, getName } from '../../http/userAPI';


const SubscriberWindow = observer(({ show, onHide }) => {

  //Получаем хранилище
  const { sub } = useContext(Context)

  const navigate = useNavigate();

  useEffect(() => {
    //подгружаем имена и аватарки к подпискам
    sub.subscriber.map(person => {
      getAvatar(person.subId).then(data => {
        console.log("test1 - ", data)
        person.avatar = data.img
      })
      getName(person.subId).then(data => {
        console.log("test2 - ", data)
        person.name = data.name
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
      </Modal.Header>
      <Modal.Body>
        {show && <ListGroup>
          {sub.subscriber.map(person =>
            <ListGroup.Item
              style={{ cursor: "pointer" }}
              key={person.id}
            >
              <Logo src={process.env.REACT_APP_API_URL + person.avatar}></Logo>
              какое то не понятное поведение здесь!
              <div
                onClick={navigate(PROFILE_ROUTE + '/' + person.id)} 
              >
              {person.name}
              </div>
              {console.log("inside list - ", person)}
            </ListGroup.Item>
          )}
        </ListGroup>}
      </Modal.Body>
    </Modal>
  )
})

export default SubscriberWindow;