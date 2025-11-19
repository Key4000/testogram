//****************************************************

//  Компонент комментария 

//****************************************************
//реакт
import React from 'react'
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
//Самодельные компоненты 
import Logo from "../components/Logo/Logo"
 

const ComItem  = ({name, text}) => {

const navigate = useNavigate() 

return (
 <Row>
    <Col md={1}>{name} -</Col>
    <Col md={10}>{text}</Col>
 </Row>
)

}
export default ComItem