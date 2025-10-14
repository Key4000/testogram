//****************************************************
//  модальное окно с постом 
//****************************************************
import { useState } from 'react'
import Modal from "react-bootstrap/Modal";
import { Context } from '.. /../index';
import { InputCom } from '../inputCom'
import { ComList } from '../ComList'
import { Like } from '../Like'

const PostWindow = ({ show, onHide, post,  avatar }) => {
  
//Получаем хранилища
const { user } = useContext(Context)

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
  <Image src={process.env.REACT_APP_API_URL + post.img + "/600px400"} />
 </Col>
 <Col>
  <Logo src={avatar}></Logo>
  <span 
      onClick={navigate(PROFILE_ROUTE+ '/' + post.userId)}
      className="post-name" 
    >
    {post.userName}
  </span>
  
<ComList
 postId = {post.id}
/>
<Like 
  publicationId = {post.id}
  userId = {user.user.id}
  whomId = {post.userId}
/>
<InputCom 
 postId = {post.id}
 userId = {user.user.id} 
 whomId = {post.userId}
/>
 </Col>
</Row>
</Modal.Body>
</Modal>
   )
}

export default PostWindow;