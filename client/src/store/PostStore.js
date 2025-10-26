//****************************************************

//  Хранилище постов

//****************************************************
import { makeAutoObservable } from "mobx"

export default class PostStore {
  constructor() {

    //посты
    this._posts = []
    
    //
    makeAutoObservable(this)
  }

  //сеттеры
  setPosts(posts) {
    this._posts = posts
  }
  //гетеры
  get posts() {
    return this._posts
  }
  
}