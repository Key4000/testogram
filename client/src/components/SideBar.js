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
 <div style={{position: 'fixed', display: 'flex', width: '100px', justifyContent : 'center'}}>
   <Row>
     <Image height={30} width={30}  src={home}/>
   </Row>
   <Row>
     <Image height={30} width={30} src={search} />
   </Row>
   <Row>
     <Image height={30} width={30} src={like} />
   </Row>
   <Row>
     <Logo src={process.env.REACT_APP_API_URL + user.user.img} />
   </Row>
   
 </div>
  )
}) 

export default SideBar