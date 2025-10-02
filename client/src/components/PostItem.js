//****************************************************

//  Компонент одной публикации

//****************************************************
//реакт
import React from 'react'
import { useContext, useState} from 'react';
import { Context } from '../index';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
//запросы 
import { getAvatar, getName} from '../http/userAPI';
import { fetchCom } from '../http/publicationAPI'; 
//Самодельные компоненты 
import Logo from "../components/Logo/Logo"
import { PostWindow } from '../components/modals/PostWindow'
//роуты 
import { PROFILE_ROUTE } from '../utils/consts' 

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

 //навигация 
 const navigate = useNavigate()
 
 //хранилища 
 const { user} = useContext(Context)
 
 //функция отправки комментария
 const send = async () => { 
   try{
     const data = await addCom({
       publicationId: publication.id
       userId: user.user.id, 
       text: sendCom
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
    getAvatar(publication.userId).then(data => setAvatar(data. img))
    getName(publication.userId).then(data => setName(data.name))
    fetchCom(publication.userId).then(data => {
      setCom(data.rows)
      setCountCom(data.count)
    })
 }, []) 
  
 return (
<>
  <Card style={{ width: '40vw' }}>
  <Card.Header>
  <Logo src={avatar}></Logo>
  <span 
      onClick={navigate(PROFILE_ROUTE+ '/' + publication.userId)}
      className="post-name" 
    >
    {name}
  </span>
  </Card.Header>
<Card.Img src={process.env.REACT_APP_API_URL + publication.img + "/600px400"}/>
<Card.Body>
  <Card.Text>
   <span 
     className="post-name" 
     onClick={navigate(PROFILE_ROUTE+ '/' + publication.userId)}
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
<PostWindow 
  show={postVisible} 
  onHide={() => setPostVisible(false)} 
  post={publication}
  avatar={user.user.avatar
  comments={com} 
  countCom = {countCom} 
/>
</>
 )

}
export default PostItem