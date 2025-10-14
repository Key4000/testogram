//****************************************************
//  Компонент боковой панели публикаций 
//****************************************************

//реакт 
import { Image, Row } from 'react-bootstrap';
import { useContext} from 'react' 
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
//картинки
import home from '../assets/home.png'
import search from  '../assets/search.png'
import like from '../assets/like2.png'
//роуты 
import { MAIN_ROUTE,  SEARCH_ROUTE, LIKE_ROUTE, PROFILE_ROUTE } from '../utils/consts' 
//свои компоненты 
import Logo from './Logo/Logo'
import { Context } from '../index';
//

const SideBar = observer(() => {

const { user } = useContext(Context) 
const navigate = useNavigate() 

return(
 <div className = "" >
   <Row>
     <Image src={home} onClick={navigate(MAIN_ROUTE)}/>
   </Row>
   <Row>
     <Image src={search} onClick={navigate(SEARCH_ROUTE)}/>
   </Row>
   <Row>
     <Image src={like} onClick={navigate(LIKE_ROUTE)}/>
   </Row>
   <Row>
     <Logo width={"80px"} height={"80px"} src={user.user.img} onClick={navigate(PROFILE_ROUTE + '/' + user. user.id)}/>
   </Row>
   
 </div>
  )
}) 

export default SideBar