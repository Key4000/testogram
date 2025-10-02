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
import { Context } from '../index';

const PostList = observer(() => {
    
    const { subscription } = useContext(Context)

return (
<Row>
{subscription.posts.map(publication => {
     <PostItem 
       key={publication.id} 
       publication={publication}
       userId = {publication.userId}
      />
})
} 
</Row>
    )
})

export default PostList