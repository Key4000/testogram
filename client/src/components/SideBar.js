//****************************************************
//  Компонент боковой панели публикаций 
//****************************************************

//реакт 
import { Image, Row } from 'react-bootstrap';
import { useContext, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
//картинки
import home from '../assets/home.png'
import search from '../assets/search.png'
import like from '../assets/like2.png'
//роуты 
import { MAIN_ROUTE, SEARCH_ROUTE, LIKE_ROUTE, PROFILE_ROUTE } from '../utils/consts'
//свои компоненты 
import Logo from './Logo/Logo'
import { Context } from '../index';
//

const SideBar = observer(() => {

  const { user } = useContext(Context)
  const navigate = useNavigate()

  return (
    <div style={{ position: 'fixed', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
      <Row>
        <Image onClick={() => navigate(MAIN_ROUTE)} height={30} width={30} src={home} style={{ cursor: 'pointer' }} />
      </Row>
      <Row>
        <Image onClick={() => navigate(SEARCH_ROUTE)} height={30} width={30} src={search} style={{ cursor: 'pointer' }} />
      </Row>
      <Row>
        <Image onClick={() => navigate(LIKE_ROUTE)} height={30} width={30} src={like} style={{ cursor: 'pointer' }} />
      </Row>
      <Link to={PROFILE_ROUTE + '/' + user.user.id} reloadDocument style={{ cursor: "pointer" , textDecoration: "none" }}>
        <Logo src={process.env.REACT_APP_API_URL + user.avatar} />
      </Link>
    </div>
  )
})

export default SideBar