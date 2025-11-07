//****************************************************
//  модальное окно с постом 
//****************************************************
import Modal from "react-bootstrap/Modal";
import { Context } from '../../index';
import InputCom from '../InputCom'
import ComList from '../ComList'
import Like from '../Like'
import { useContext, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import Logo from "../Logo/Logo";
import { useNavigate } from "react-router-dom";
import { PROFILE_ROUTE } from "../../utils/consts";

const PostWindow = ({ show, onHide, post, avatar}) => {
  //Получаем хранилища
  const { user } = useContext(Context)
  const navigate = useNavigate()

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        {show && <Row>
          <Col>
            <Image src={process.env.REACT_APP_API_URL + post.img} />
          </Col>
          <Col>
            <Logo src={avatar}></Logo>
            <span
              onClick={navigate(PROFILE_ROUTE + '/' + post.userId)}
              className="post-name"
            >
              {post.userName}
            </span>

            <ComList
              postId={post.id}
            />
            <Like
              publicationId={post.id}
              userId={user.user.id}
              whomId={post.userId}
            />
            <InputCom
              postId={post.id}
              userId={user.user.id}
              whomId={post.userId}
            />
          </Col>
        </Row>}
      </Modal.Body>
      <Modal.Footer>
            <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>  
         </Modal.Footer>
    </Modal>
  )
}

export default PostWindow;