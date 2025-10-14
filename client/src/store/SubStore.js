//****************************************************

//  Хранилище подписчиков, подписок 

//****************************************************
import {makeAutoObservable} from "mobx"

export default class SubStore{
    constructor(){

  //подписчики
  this._subscriber = []
  //кол-во подписчиков 
  this._countSubscriber = 0
  //подписки
  this._subscription = []
  //кол-во подписок 
  this._countSubscription = 0
  //
  makeAutoObservable(this)
    }

  //сеттеры
  setSubscriber(subscriber){
    this._subscriber = subscriber
  }
  setCountSubscriber(count){
    this._countSubscriber = count
  }
  setSubscription(subscription)
    {
      this._subscription = subscription
    }
  setCountSubscription(count)
    {
      this._countSubscription = count
    }
  //гетеры
  get subscriber(){
    return this._subscriber
  }
  get countSubscriber(){
    return this._countSubscriber
  }
  get subscription(){
    return this._subscription 
  }
  get countSubscription(){
    return this._countSubscription
  }
}