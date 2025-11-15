//****************************************************

//  Компонент одной публикации

//****************************************************
//реакт
import React, { useEffect } from 'react'
import { useContext, useState} from 'react';
import { Context } from '../index';
import { Button, Card, Form, Row , Image} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
//запросы 
import { getAvatar, getName} from '../http/userAPI';
import { addCom, fetchCom } from '../http/publicationAPI'; 
//Самодельные компоненты 
import Logo from "../components/Logo/Logo"
import PostWindow from '../components/Modals/PostWindow'
//роуты 
import Like from './Like';

const PostItem = ({ publication }) => {

 //состояния модального окна поста
const [postVisible, setPostVisible] = useState(false) 


//состояние кнопки 
const [isButton, setIsButton] = useState(false) 
//состояния имени и аватара 
 const [avatar, setAvatar] = useState('')
 const [name, setName] = useState('')
 //состояния массива с комментариями
 const [com, setCom] = useState([])
 const [countCom, setCountCom] = useState(0)
//состояние отправки коммента  
 const [sendCom, setSendCom] = useState('')

 //хранилища 
 const { user } = useContext(Context)

 //функция отправки комментария
 const send = async () => { 
   try{
     const data = await addCom({
       publicationId: publication.id,
       userId: user.user.id, 
       text: sendCom,
       whomId: publication.userId
     })
     //попробовать это, если комменты не подгружаются в модальное окно publication
     //fetchCom(publication.userId).then(data => {
      //setCom(data.rows)
    // setCountCom(data.count)
    //}) 

   } catch(e) {
     alert(e.response.data.message)
   }
 }

 useEffect(() => { 
    getAvatar(publication.userId).then(data => setAvatar(data))
    getName(publication.userId).then(data => setName(data))
    fetchCom(publication.id).then(data => {
      setCom(data.rows)
      setCountCom(data.count)
    }).finally(() => {
      setCom([])
      setCountCom(0)
    })
 }, []) 

 return (
<>
  <Card style={{ width: '40vw' }}>
  <Card.Header>
  <Logo src={process.env.REACT_APP_API_URL + avatar}></Logo>
  <span 
      className="post-name" 
    >
    {name}
  </span>
  </Card.Header>
<Image src={process.env.REACT_APP_API_URL + publication.img}/>
<Card.Body>
  <Like 
   publicationId = {publication.id}
   userId = {user.user.id}
   whomId = {publication.userId}
  /> 
  <Card.Text>
   <span 
     className="post-name" 
   >
   {name}
   </span> 
   {publication.text}
   </Card.Text>
   <span 
     onClick={() => setPostVisible(true)}
   >
    Посмотреть все {countCom} коментариев...
   </span>
   <Row>
    <Form.Control
      placeholder="Оставьте комментарий..."
      value={sendCom}
      onChange={e => {
        setSendCom(e.target.value)
        setIsButton(e.target.value !== '')   
       }}
     />
     {isButton && <Button
        style={{ width: 'Auto' }}
        variant="outline-dark"
        onClick={send}
      >
      Опубликовать
      </Button>} 
   </Row>
</Card.Body>
</Card>
{/* <PostWindow 
  show={postVisible} 
  onHide={() => setPostVisible(false)} 
  post={publication}
  avatar={user.user.avatar}
  comments={com} 
  countCom = {countCom} 
/> */}
</>
 )

}
export default PostItem