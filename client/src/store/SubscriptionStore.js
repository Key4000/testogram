//****************************************************

//  Хранилище подписок 

//****************************************************
import {makeAutoObservable} from "mobx"

export default class SubscriptionStore{
    constructor(){
        
        //подписки
        this._subscription = []
        //кол-во подписок 
        this._count = 0
        //публикации подписок 
        this._posts = []
   0     //кол-во публикаций подписок
        this._countPosts = 0
        //
        makeAutoObservable(this)
    }

    //сеттеры
    setSubscription(subscription)
    {
      this._subscription = subscription
    }
    setCount(count)
    {
      this._count = count
    }
    setPosts(posts){
      this._posts = posts
    }
    setCountPosts(count){
      this._countPosts = count
    }
    
    //гетеры
    get subscription(){
      return this._subscription 
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