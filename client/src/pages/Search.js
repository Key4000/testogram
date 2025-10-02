//****************************************************

//  Страница с поиском

//****************************************************
//все что с реактом
import React from 'react'
import { Container,  Card, Form} from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { fetchUser } from '../http/userAPI'
import { observer } from 'mobx-react-lite'
import { PROFILE _ROUTE } from  '../utils/consts'

const Search = observer(() => {
//
const [search, setSearch] = useState ('')
const [person, setPerson] = useState (null)

const navigate = useNavigate()

const click = async () => {
  try{
    fetchUser(search).then(data => {
      setPerson(data)
    })
  } catch (e) {
    alert(e.response.data.message)
  } 
}

return (
<Container>
<Form className="d-flex flex-column">
  <Form.Control
    className="mt-3"
    placeholder="Введите имя профиля..."
    value={search}
    onChange={e => setSearch(e.target.value)}
  />
  <Button
    style={{ width: 'auto' }}
    variant="outline-dark"
    onClick={click}
  >
    Найти
  </Button>
<Form/>
{search? 
<Card>
  <h2>
      То, что вы искали:
  </h2>
  <div>
    //это будет ссылка на того пользователя, которого искали
   <span onClick={navigate(PROFILE_ROUTE + '/' + person. id)}>{person.name}</span>
  </div>
</Card>
:
<div>
  По вашему запросу ничего не найдено
</div>
  
} 
}
</Container>
)
})

export default Search ;