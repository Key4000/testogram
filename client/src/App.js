//****************************************************

//  Точка входа в приложение 

//****************************************************
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import { Row, Spinner, Col } from "react-bootstrap";
import { check } from "./http/userAPI";
import { Context } from './index';

//свои компоненты 
import AppRouter from "./components/AppRouter";


const App = observer(() => {
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    check().then(data => {
      //добавляем юзера в хранилище
      user.setUser(data)
      user.setIsAuth(true)
    }).finally(() => setLoading(false))
  }, [user])


  if (loading) {
    <Spinner animation='grow' />
  }

  return (
    <BrowserRouter >
        <AppRouter />
    </BrowserRouter>
  );
})



export default App;