//****************************************************

// Маршруты авторизованных пользователей 

// и всех(публичные)

//****************************************************
import Main from './pages/Main'
import Auth from './pages/Auth'
import Search from './pages/Search'
import Profile from './pages/Profile'
import Like from './pages/Like'
import Subscribers from './pages/Subscribers'
import Subscriptions from './pages/Subscriptions'

import { MAIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SEARCH_ROUTE,  PROFILE_ROUTE, SUBSCRIPTIONS_ROUTE, SUBSCRIBERS_ROUTE } from './utils/consts'
//авторизованные роуты 
export const authRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: SEARCH_ROUTE,
        Component: Search
    },
    {
        path: LIKE_ROUTE,
        Component: Like
    },
    {
        path: PROFILE_ROUTE,
        Component: Profile
    },
    {
        path: SUBSCRIBERS_ROUTE,
        Component: Subscribers
    },
    {
        path: SUBSCRIPTIONS_ROUTE,
        Component: Subscriptions
    },
   
]
//свободные роуты 
export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
]