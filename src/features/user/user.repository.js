import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

class UserRepository{
async signUp(newUser){
try{
    //1. Get the database
    const db = getDB();

    //2. Get the collection
    const collection = db.collection("users");
 
    //3.Insert the collection.
    await collection.insertOne(newUser);
    return newUser;
}catch(err){
    throw new ApplicationError("Something went wrong", 503);
}
}

// signIn(email, password){
//     const user = users.find((u) => u.email == email && u.password == password);
//     return user;
// }
}

export default UserRepository