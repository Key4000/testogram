//****************************************************

//  Хранилище постов

//****************************************************
import { makeAutoObservable } from "mobx"

export default class PostStore {
  constructor() {

    //посты
    this._posts = []
    //кол-во
    this._count = 0
    
    //
    makeAutoObservable(this)
  }

  //сеттеры
  setPosts(posts) {
    this._posts = posts
  }
  setCount(num) {
    this._count = num
  }
  //гетеры
  get posts() {
    return this._posts
  }
  get count() {
    return this._count
  }
  
  
}