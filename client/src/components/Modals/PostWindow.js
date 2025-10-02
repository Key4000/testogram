//****************************************************

//  модальное окно с постом 

//****************************************************
import { useState } from 'react'
import Modal from "react-bootstrap/Modal";
import { Post } from '../Post'
import { addCom } from '../../http/publicationAPI'
import { Context } from '.. /../index';

const PostWindow= ({ show, onHide, post,  avatar, }) => {
  
//состояние отправки коммента  
 const [sendCom, setSendCom] = useState('')
//состояние кнопки 
const [isButton, setIsButton] = useState(false) 
//Получаем хранилища
const { user } = useContext(Context)
 
//функция отправки комментария
const send = async () => { 
   try{
     const data = await addCom({
       publicationId: post.id
       userId: user.user.id, 
       text: sendCom
       whomId: post.userId
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


return (
<Modal
  show={show}
  onHide={onHide}
  centered
 >
<Modal.Header closeButton>
</Modal.Header>
<Modal.Body>
<Row> 
 <Col>
    <Post 
    avatar = {avatar} 
    img = {post.img}
    size = {"600px400"}
    text = {post.text}
 />
 </Col>
 <Col>
    //******************
 //сюда надо добавить ленту коментов
 //******************
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
 </Col>
</Row>
</Modal.Body>
</Modal>
   )
}

export default PostWindow;