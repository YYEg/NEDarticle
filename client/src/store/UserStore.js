import {makeAutoObservable} from "mobx";

export default class UserStore{
    constructor() {
        this._isAuth = false
        this._user = {}
        this._username = ''
        this._isAdmin = false
        makeAutoObservable(this)
    }

    setIsAuth(bool){
        this._isAuth = bool
    }

    setUsername(username){
        this._username = username
    }

    setUser(user){
        this._user = user
    }
    get isAuth(){
        return this._isAuth
    }
    get user(){
        return this._user
    }

    setIsAdmin(bool){
        this._isAdmin = bool
    }

    get isAdmin(){
        return this._isAdmin
    }

    get username(){
        return this._username
    }

}