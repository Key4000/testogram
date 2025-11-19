//****************************************************
//  модальное окно с постом 
//****************************************************
import Modal from "react-bootstrap/Modal";
import { Context } from '../../index';
import InputCom from '../InputCom'
import ComList from '../ComList'
import Like from '../Like'
import { useContext, useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import Logo from "../Logo/Logo";
import { getName } from "../../http/userAPI";

const PostWindow = ({ show, onHide, post, avatar, name }) => {
  //Получаем хранилища
  const { user } = useContext(Context)

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="xl"
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body style={{ display: "flex" }}>
        {show && <Row style={{ display: "flex" }}>
          <Col>
            <Image src={process.env.REACT_APP_API_URL + post.img} width={700} />
          </Col>
          <Col>
            <Logo src={process.env.REACT_APP_API_URL + avatar}></Logo>
            <span
              className="post-name"
              style={{ marginRight: "40px" }}
            >
              {name}
            </span>
            <div style={{ maxWidth: "100px", height: "auto" }} >
              {post.text}
            </div>
            {console.log("post.id - ", post.id)}
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
    </Modal>
  )
}

export default PostWindow;