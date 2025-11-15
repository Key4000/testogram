//****************************************************

//  Страница с профилем

//****************************************************
//все что с реактом
import React, { useEffect } from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom'
import { useInView } from 'react-intersection-observer';
import { observer } from 'mobx-react-lite'
import { Context } from '../index';
//запросы
import { fetchSubscriber, fetchSubscription } from '../http/subsAPI'
//свои 
import Logo from "../components/Logo/Logo"
import PostWindow from '../components/Modals/PostWindow'
import SubscriberWindow from '../components/Modals/SubscriberWindow'
import SubscriptionWindow from '../components/Modals/SubscriptionWindow'
import SideBar from '../components/SideBar';
import { fetchPublication } from '../http/publicationAPI';
import { getAvatar, getName } from '../http/userAPI';



const Profile = observer(() => {
  //----------------модальные окна------------------
  //состояния для отображения модальных окон
  const [postVisible, setPostVisible] = useState(false)
  const [subscriptionVisible, setSubscriptionVisible] = useState(false)
  const [subscriberVisible, setSubscriberVisible] = useState(false)
  //для отправки поста в модальное окно
  const [sendPost, setSendPost] = useState(null)
  //-----------------------------------------------
  //берем id из параметра 
  const { id } = useParams()
  //Получаем хранилища
  const { sub } = useContext(Context)
  //имя пользователя
  const [userName , setUserName] = useState("")
  //ава пользователя
  const [userImg , setUserImg] = useState("")
  //-----------подгружаем посты----------------------------
  //посты
  const [posts, setPosts] = useState([]);
  //кол-во постов
  const [countPosts, setCountPosts] = useState(0);
  //страницы
  const [page, setPage] = useState(1);
  //
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true, // Загружать только один раз
    rootMargin: '200px', // Загрузить заранее, когда до конца останется 200px
  });
  const fetchPost = async () => {
    if (loading) {
      return null
    }; // Предотвращаем повторную загрузку
    setLoading(true);
    //подгружаем все посты
    await fetchPublication(id, page, 10).then(data => {
      setPosts(data.rows)
      setCountPosts(data.count)
    })
    setPage(prevPage => prevPage + 1);
    setLoading(false);
  };
  useEffect(() => {
    if (inView) {
      fetchPost(); // Вызываем функцию загрузки новых данных
    }
  }, [inView]); // Запускаем эффект при изменении видимости
  //---------------------------------------------------------

  //подгружаем пользователя
  useEffect(() => {
    getAvatar(id).then(data => {
      setUserImg(data)
    })
    getName(id).then(data => {
      setUserName(data)
    })
  }, [])

  //подгружаем подписчиков 
  useEffect(() => {
    fetchSubscriber(id).then(data => {
      if(!data) return 
      //берём одно значение subId, так как оно повторяется
      let bufUser = data.rows[0].subId
      let dataSub = data.rows.map(data => {
        let person = {}
        //записываем userId, который станет subId ,здесь мы меняем значения, чтобы было удобно работать 
        let bufSub = data.userId
        person.userId = bufUser
        person.subId = bufSub
        return person
      })
      sub.setSubscriber(dataSub)
      sub.setCountSubscriber(data.count)
    })

  }, [])

  //подгружаем подписки
  useEffect(() => {
    fetchSubscription(id).then(data => {
      sub.setSubscription(data.rows)
      sub.setCountSubscription(data.count)
    })
  }, [])


  return (
    <>
      <SideBar />
      <Container>
        <Row>
          <Col md={4}>
            <Logo src={process.env.REACT_APP_API_URL + userImg}></Logo>
          </Col>
          <Col md={12}>
            <Row>
              <span>{userName}</span>
            </Row>
            <Row>
              <span>{countPosts} публикаций</span>
              <span style={{ cursor: 'pointer' }} onClick={() => {
                setSubscriberVisible(true)
              }}> {sub.countSubscriber} подписчиков</span>
              <span style={{ cursor: 'pointer' }} onClick={() => {
                setSubscriptionVisible(true)
              }}> {sub.countSubscription} подписок</span>
            </Row>
          </Col>
        </Row>
        <Row className="d-flex" >
          {
            posts.map(publication =>
              <Image

                key={publication.id}
                onClick={() => {
                  setSendPost(publication)
                  setPostVisible(true)
                }}
                style={{ cursor: 'pointer', width: '600px' }}
                src={process.env.REACT_APP_API_URL + publication.img}
              />)
          }
          <div ref={ref} style={{ height: '40px' }}>test</div>
        </Row>
        <PostWindow
          show={postVisible}
          onHide={() => setPostVisible(false)}
          post={sendPost}
          avatar={userImg}
          name={userName}
        />
        <SubscriberWindow
          show={subscriberVisible}
          onHide={() => setSubscriberVisible(false)}
        />
        <SubscriptionWindow
          show={subscriptionVisible}
          onHide={() => setSubscriptionVisible(false)}
        />
      </Container>
    </>
  )
})

export default Profile; 