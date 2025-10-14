//****************************************************
//  Компонент ленты коментов
//****************************************************
//реакт 
import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Row } from 'react-bootstrap';
import { useEffect } from 'react';
//свои компоненты
import ComItem from './ComItem'
//запросы 
import { fetchCom } from '../http/publicationAPI'
import { getAvatar, getName } from '../http/userAPI'


const ComList = observer(({ postId }) => {

  const [coms, setComs] = useState([])


  useEffect(() => {
    //запрос на массив комментов
    fetchCom(postId).then(comments => {
      //пробегаем по массиву и делаем запрос по конкретному комменту
      comments.map(comment => {
        //добавляем аватар к объекту  
        getAvatar(comment.userId).then(data => { comment.avatar = data })
        //добавляем имя к объекту 
        getName(comment.userId).then(data => { comment.name = data })
        //добавляем улучшенный объект в массив 
        coms.push(comment)
      })
    })
  }, [])

  return (
    <Row>
      {coms.map(com => {
        <ComItem
          avatar={com.avatar}
          name={com.name}
          text={com.text}
        />
      })
      }
    </Row>)
})

export default ComList