//****************************************************

//  Компонент комментария 

//****************************************************
//реакт
import React from 'react'
import { Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
//Самодельные компоненты 
import Logo from "../components/Logo/Logo"
//роуты 
import { PROFILE_ROUTE } from '../utils/consts' 

const ComItem  = (props) => {
  
const navigate = useNavigate() 
  
return (
<div>
 <Row>
   <Logo src={props.avatar}></Logo>
   {props.name}
 </Row>
 <Row>
   
 </Row>
</div>

)

}
export default ComItem