//****************************************************

//  Хранилище пользователя 

//****************************************************
import { makeAutoObservable } from "mobx"

export default class UserStore {
   constructor() {
      //авторизован ли 
      this._isAuth = false
      //объект пользователя 
      this._user = {}
      //картинка пользователя
      this._avatar = ''
      //имя пользователя
      this._name = ''

      makeAutoObservable(this)
   }
   //сеттеры
   setIsAuth(bool) {
      this._isAuth = bool
   }
   setUser(user) {
      this._user = user
   }
   setAvatar(img) {
      this._avatar = img
   }
   setName(name) {
      this._name = name
   }

   //гетеры
   get isAuth() {
      return this._isAuth
   }
   get user() {
      return this._user
   }
   get avatar() {
      return this._avatar
   }
   get name() {
      return this._name
   }
}