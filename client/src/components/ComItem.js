//****************************************************

//  Компонент комментария 

//****************************************************
//реакт
import React from 'react'
import { Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
//Самодельные компоненты 
import Logo from "../components/Logo/Logo"
 

const ComItem  = ({avatar, name, text}) => {

const navigate = useNavigate() 

return (
<>
 <Row>
   <Logo 
     src={avatar}
     style={{ cursor: "pointer" }}
   />
   {name}
 </Row>
 <Row>
    {text} 
 </Row>
</>
)

}
export default ComItem