//****************************************************

//  Страница с профилем

//****************************************************
//все что с реактом
import React from 'react'
import { Container } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom'
import { useInView } from 'react-intersection-observer';
import { observer } from 'mobx-react-lite'
import { Context } from '../index';
//запросы
import { fetchSubscriber } from '../http/subsAPI'
//свои 
import  Logo  from "../components/Logo/Logo"
import  PostWindow  from '../components/Modals/PostWindow'



const Profile = observer(() => {

//состояния для отображения модальных окон
const [postVisible, setPostVisible] = useState(false)
const [subscriptionVisible, setSubscriptionVisible] = useState(false)
const [subscriberVisible, setSubscriberVisible] = useState(false)
//для отправки поста в модальное окно
const [sendPost, setSendPost] = useState(null)
//для бесконечного скролла 
const [posts, setPosts] = useState([]);
const [page, setPage] = useState(1);
const [loading, setLoading] = useState(false); 


const { ref, inView } = useInView({
     // Загружать только один раз
    rootMargin: '200px', // Загрузить заранее, когда до конца останется 200px
  }); 
//берем id из параметра 
const { id } = useParams()

//Получаем хранилища
const { user } = useContext(Context)

const fetchPost = async () => {
 if (loading) return; // Предотвращаем повторную загрузку
 setLoading(true);
 //подгружаем ещё порцию постов 

 
 setPage(prevPage => prevPage + 1);
    setLoading(false);
  };

useEffect(() => {
//подгружаем подписчиков 
let bufSub 
let person = {}
let sub = []
let bufUser   
  
fetchSubscriber(id).then(data => {
  //берём одно значение subId, так как оно повторяется
  bufSub = data.rows[0].subId
  sub = data.rows.map(person => {
    //записываем userId, который станет subId ,здесь мы меняем значения, чтобы было удобно работать 
    bufUser = person.userId
    person.userId = bufSub
    person.subId = bufUser
  })
  sub.setSubscriber(sub)
  sub.setCountSubscriber(data.count)
})
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