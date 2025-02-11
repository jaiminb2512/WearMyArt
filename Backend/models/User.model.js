import { model, Schema } from "mongoose";

const UserSchema = Schema({
    name : {
        type: String
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type: String,
        required : true,
    },
    isAdmin : {
        type: Boolean,
        default : false
    }
})

const User = model("User", UserSchema)
export default User