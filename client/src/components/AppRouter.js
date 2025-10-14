//****************************************************

//   Здесь описана логика навигации по страницам

//****************************************************

import React from 'react'
import { Routes, Route} from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes'
import { Context } from '../index'
import { useContext } from 'react';
import { MAIN_ROUTE } from '../utils/consts'
import {observer} from "mobx-react-lite";

const AppRouter = observer(() => {
    const { user } = useContext(Context)
    return (
        <>
            <Routes>
                {user.isAuth && authRoutes.map(({ path, Component }) =>
                    <Route key={path} path={path} element={<Component />} exact />
                )}
                {publicRoutes.map(({ path, Component }) =>
                    <Route key={path} path={path} element={<Component />} exact />
                )}
            </Routes>
            <Route to={MAIN_ROUTE} />
        </>

    )
});

export default AppRouter;