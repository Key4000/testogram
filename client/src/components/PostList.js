//****************************************************

//  Компонент лента публикаций 


//****************************************************
//реакт 
import React from 'react'
import { observer } from 'mobx-react-lite'
import { Row } from 'react-bootstrap';
//свои компоненты
import PostItem from './PostItem'
//mobx
import { useContext } from 'react';
import { useInView } from 'react-intersection-observer';
import { Context } from '../index';

const PostList = observer((id) => {

const [posts, setPosts] = useState([]);
const [page, setPage] = useState(1);
const [loading, setLoading] = useState(false);
//чтобы подгружать новую порцию данных если жуно будет 
let offset = 0

const { ref, inView } = useInView({
     // Загружать только один раз
    rootMargin: '200px', // Загрузить заранее, когда до конца останется 200px
  });

const { sub } = useContext(Context)

const fetchPost = async () => {
 if (loading) return; // Предотвращаем повторную загрузку
 setLoading(true);
 //подгружаем все подписки  
 fetchSubscription(id).then(data => 
 {
  sub.setSubscription(data.rows)
  sub.setCountSubscription(data.count)
  sub.subscription.map(person =>
  {
   //здесь мы должны достать из person userId, и передать в функцию получения публикаций 
   fetchOneDate(person.subId, offset).then(data => 
   {
     //сюда еще можно автар добавить? 
     getName(post.userId).then(dataTwo => { data.userName = dataTwo })
     //передаем старый массив с публикациями подписок 
     setPosts([...posts, data])})
  } 
 } 
    setPage(prevPage => prevPage + 1);
    setLoading(false);
  };



useEffect(() => {
  if (inView) {
    fetchPost(); // Вызываем функцию загрузки новых данных
  }
}, [inView]); // Запускаем эффект при изменении видимости

return (
<Row>
{posts.map(post => 
  <PostItem 
     key={post.id} 
     publication={post}
     userId = {post.userId}
  /> 
}) 
<div ref={ref} style={{ height: '40px' }}></div>
</Row>
    )
})

export default PostList