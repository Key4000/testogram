//****************************************************

//  Страница с поиском

//****************************************************
//все что с реактом
import React from 'react'
import { Container, Card, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { Link} from 'react-router-dom'
import { fetchLink, getName } from '../http/userAPI'
import { observer } from 'mobx-react-lite'
import { PROFILE_ROUTE } from '../utils/consts'
import SideBar from '../components/SideBar';

const Search = observer(() => {

  const [search, setSearch] = useState('')
  const [id, setId] = useState(-1)
  const [name, setName] = useState('')

  const click = async () => {
    try {
      fetchLink(search).then(data => {
        setId(data[0].id)
        getName(data[0].id).then(data => setName(data))
      })
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  return (
    <div>
      <SideBar />
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
        </Form>
        {search ?
          <Card>
            <h4>
              То, что вы искали:
            </h4>
            <div>
              <Link to={PROFILE_ROUTE + '/' + id} reloadDocument style={{ marginLeft: "20px", cursor: "pointer", color: "black", textDecoration: "none" }}>{name}</Link>
            </div>
          </Card>
          :
          <div>
            По вашему запросу ничего не найдено
          </div>

        }
      </Container>
    </div>
  )
})

export default Search;