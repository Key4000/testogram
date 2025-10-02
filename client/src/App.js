//****************************************************

//  Точка входа в приложение 

//****************************************************
//реакт 
import { BrowserRouter } from "react-router-dom"
import AppRouter from "./components/AppRouter"
import { observer } from 'mobx-react-lite'
import { useContext, useState, useEffect } from 'react';
//свои компоненты 
import SideBar from "./components/SideBar"


import { Context } from './index';
import { check } from "./http/userAPI";
import { Spinner } from "react-bootstrap";


const App = observer(() => {
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(true)


useEffect(() => {
        check().then(data => {
            //добавляем юзера в хранилище
            user.setUser(data)
            user.setIsAuth(true)
        }).finally(() => setLoading(false))
    }, [])


  if (loading) {
    <Spinner animation='grow' />
  }
  return (
    <BrowserRouter>
      <Row className ="mt-3">
               <Col md={2}>
                   <SideBar/>
               </Col> 
               <Col md={10}>
                   <AppRouter /> 
               </Col>
               <Col md={2}>
          
               </Col>
            </Row>
    </BrowserRouter>
  );
})

export default App;