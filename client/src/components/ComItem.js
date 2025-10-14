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

const ComItem  = ({avatar, name, text}) => {

const navigate = useNavigate() 

return (
<>
 <Row>
   <Logo 
     src={avatar}
     onClick={navigate(PROFILE_ROUTE + '/' + userId)}
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