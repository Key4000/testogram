//****************************************************

//  Точка входа в приложение 

//****************************************************
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { check, getAvatar} from "./http/userAPI";
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
      getAvatar(user.user.id).then(data => user.setAvatar(data))
    }).finally(() => setLoading(false))
  }, [])




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