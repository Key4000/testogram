//****************************************************

//  Компонент лента публикаций 


//****************************************************
//реакт 
import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Row , Image } from 'react-bootstrap';
//свои компоненты
import PostItem from './PostItem'
//mobx
import { useContext } from 'react';
import { useInView } from 'react-intersection-observer';
import { Context } from '../index';
import { fetchLast, fetchPublication } from '../http/publicationAPI';
import { fetchSubscription } from '../http/subsAPI';
import { getName } from '../http/userAPI';

const PostList = observer(({ id }) => {

  // const [posts, setPosts] = useState([]);
  // const [page, setPage] = useState(1);
  // const [loading, setLoading] = useState(false);
  // //чтобы подгружать новую порцию данных если нужно будет 
  // let offset = 0

  const { ref, inView } = useInView({
    // Загружать только один раз
    rootMargin: '200px', // Загрузить заранее, когда до конца останется 200px
  });

  const { sub , post } = useContext(Context)

  // const fetchPost = async () => {
  //   if (loading) return; // Предотвращаем повторную загрузку
  //   setLoading(true);
  //   //подгружаем все подписки  
  //   await fetchSubscription(id, 10, page).then(data => {
  //     sub.setSubscription(data.rows)
  //     sub.setCountSubscription(data.count)
      
  //     sub.subscription.map(person => {
  //       //здесь мы должны достать из person userId, и передать в функцию получения публикаций 
  //       fetchLast(person.subId, offset).then(data => {
  //         //сюда еще можно автар добавить? 
  //         getName(data.userId).then(dataTwo => { data.userName = dataTwo })
  //         //передаем старый массив с публикациями подписок 
  //         post.setPosts([...post.posts, data])
  //       })

  //       return null
  //     })
  //   })
  //   setPage(prevPage => prevPage + 1);
  //   setLoading(false);
  // };
  // useEffect(() => {
  //   if (inView) {
  //     fetchPost(); // Вызываем функцию загрузки новых данных
  //   }
  // }, [inView]); // Запускаем эффект при изменении видимости

  useEffect(() => {
   fetchPublication(id, 1, 10).then(data => {
     post.setPosts(data.rows)
     post.setCount(data.count)
   }) 
  }, [])

  return (  
  <div>
    { 
      post.posts.map(post => 
        <PostItem
          key={post.id}
          publication={post}
          userId={post.userId}
        />
      )  
    }
    <div ref={ref} style={{ height: '40px' }}>test</div>
  </div>  
  )
})

export default PostList
