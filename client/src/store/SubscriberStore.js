//****************************************************

//  Хранилище подписчиков

//****************************************************
import {makeAutoObservable} from "mobx"

export default class SubscriberStore{
    constructor(){
      
        //подписчики
        this._subscriber = []
        //кол-во подписчиков 
        this._count = 0
        //публикации подписчики  
        this._posts = []
        //кол-во публикаций подписчиков
        this._countPosts = 0
        //
        makeAutoObservable(this)
    }

    //сеттеры
    setSubscriber(subscriber){
      this._subscriber = subscriber
    }
    setCount(count){
      this._count = count
    }
    setPosts(posts){
      this._posts = posts
    }
    setCountPosts(count){
      this._countPosts = count
    } 
    //гетеры
    get subscriber(){
      return this._subscriber
    }
    get count(){
      return this._count
    }
    get posts(){
        return this._posts
    }
    get countPosts(){
      return this._countPosts
    }
}