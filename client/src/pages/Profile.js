//****************************************************

//  Страница с профилем

//****************************************************
//все что с реактом
import React from 'react'
import { Container } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { useNavigate,  useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Context } from '../index';
//запросы
import { fetchPublication } from '../http/publicationAPI'
import { fetchSubscriber } from '../http/subsAPI'
//свои 
import { Logo } from "../components /Logo/Logo"
import { PostWindow } from '../components/modals/Publication'
import Subscriptions from '../components/modals/Subscriptions'
import Subscribers from '../components/modals/Subscribers'
//роуты 
import { SUBSCRIBERS_ROUTE,  SUBSCRIPTIONS_ROUTE } from  '../utils/consts' 

const Profile = observer(() => {

//состояния для отображения модальных окон
const [postVisible, setPostVisible] = useState(false)
const [subscriptionVisible, setSubscriptionVisible] = useState(false)
const [subscriberVisible, setSubscriberVisible] = useState(false)
//состояние поста
const [post, setPost] = useState(null)

//берем id из параметра 
const { id } = useParams()
//хук навигации 
const navigate = useNavigate()

//Получаем хранилища
const { subscription, user, publication, subscriber} = useContext(Context)

//----------
//подгружаем публикации, подписчиков (подписки мы подгрузили в Main)
useEffect(() => {
  //подгружаем публикации 
  fetchPublication(user.user.id).then( data => {
     publication.setPublications(data.rows)
     publication.setCount(data.count)})
  //подгружаем подписчиков 
  fetchSubscriber(user.user.id).then(data => {
     subscriber.setSubscriber(data.rows)
     subscriber.setCountOfSubs(data.count)})
   //
   subscription.setSubscription(subscription.subscription.map(person => {
     
   }))
}, []) 

return (
<Container>
<Row>
  <Col md={4}>
    <Logo src={user.user.avatar}></Logo>
  </Col>
  <Col md={12}>
    <Row>
      <span>{user.user.name}</span>
    </Row>
    <Row>
      <span>{publication.count} публикаций</span>
      <span onClick={() => {
       setSubscriberVisible(true)
     }}> {subscriber.countOfSubs} подписчиков</span>
      <span onClick={() => {
       setSubscriptionVisible(true)
     }}> {subscription.countOfSubs} подписок</span>
    </Row>
 </Col>
</Row>
<Row className="d-flex" >
{publicaton.publications.map(publication => {
<Image 
   onClick={() => {
       setPost(publication)
       setPostVisible(true)
     }
   } 
   src={process.env.REACT_APP_API_URL + publication.img + "/400px300"}
/>
})
} 
</Row>
<PostWindow
  show={postVisible} 
  onHide={() => setPostVisible(false)} 
  post={post}
  avatar={user.user.avatar}
/>
<SubWindow
  show={subscriptionVisible} 
  onHide={() => setSubscriptionVisible(false)}
  isSubscriber = {true}
/>
<SubWindow
  show={subscriptionVisible} 
  onHide={() => setSubscriptionVisible(false)}
  isSubscriber = {false}
/>

</Container>
)
})

export default Profile;