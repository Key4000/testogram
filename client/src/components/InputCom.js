//****************************************************

//  ввод комментария 

//****************************************************
import { useState } from 'react'
import { addCom } from '../../http/publicationAPI'
import { Context } from '.. /../index';

const InputCom = ({ postId, userId, whomId }) => {

//состояние отправки коммента  
 const [ com, setCom] = useState('')
//состояние кнопки 
const [isButton, setIsButton] = useState(false) 

//функция отправки комментария
const send = async () => { 
   try{
     const data = await addCom({
       publicationId: postId, 
       userId: userId, 
       text: com, 
       whomId: whomId
     })
   } catch(e) {
     alert(e.response.data.message)
   }
 }

return (
<>
 <Form.Control
   placeholder="Оставьте комментарий..."
   value={com}
   onChange={e => 
   {setCom(e.target.value)
    setIsButton(e.target.value !== '')}}
 />
 {isButton && <Button
    style={{ width: 'Auto' }}
    variant="outline-dark"
    onClick={send}>
 Опубликовать
 </Button>} 
</>
)
}

export default InputCom;