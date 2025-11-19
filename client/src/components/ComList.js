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
      let arr = []
      comments.map(comment => {
        let obj = comment
        getAvatar(comment.userId).then(data => { obj.avatar = data })
        getName(comment.userId).then(data => { obj.userName = data })
        arr.push(obj)
      })
      setComs(arr)
    })
  }, [])

  return (
    <Row style={{ width: '' }}>

      {coms.map(com =>
        <ComItem
          avatar={com.avatar}
          name={com.name}
          text={com.text}
        />
      )
      }
    </Row>)
})

export default ComList