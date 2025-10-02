//****************************************************

//  Хранилище публикаций 

//****************************************************
import {makeAutoObservable} from "mobx"

export default class PublicationStore{
    constructor(){
        //публикации пользователя
        this._publications = []
        //кол-во публикаций 
        this._count = 0
        
        makeAutoObservable(this)
    }
    //Сетеры для изменения значения 
    setPublications(publications){
        this._publications = publications
    }
    setCount(num){
        this._count = num
    }
    //гетеры для получения зачения
    get publications(){
        return this._publications 
    }
    get count(){
        return this._count
    }
}