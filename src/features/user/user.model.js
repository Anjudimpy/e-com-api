import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export class UserModel{
    constructor(name, email, password, type){
        this._id = Math.floor(Math.random() * 1000000);
        this.name= name;
        this.email = email;
        this.password = password;
        this.type = type;
        
    }


static getAll(){
    return users;
}

}

var users= [
    {
        id:1,
        name:'Seller User',
        email:'seller@gmail.com',
        password:'Password1',
        type:'seller',
    },
     {
        id:2,
        name:'Customer User',
        email:'customer@gmail.com',
        password:'Password1',
        type:'customer',
    }
]