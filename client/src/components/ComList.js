//****************************************************

//  Компонент ленты коментов


//****************************************************
//реакт 
import React from 'react'
import { observer } from 'mobx-react-lite'
import { Row } from 'react-bootstrap';
//свои компоненты
import ComItem from './ComItem'
//mobx
import { useContext } from 'react';
import { Context } from '../index';

const ComList = observer(() => {
    
return (
<Row>
{ .map => {
     <ComItem 
       
      />
})
} 
</Row>
    )
})

export default ComList