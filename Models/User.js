import mongoose from 'mongoose'

const AuthSchema  =new mongoose.Schema(
    {
        name : {
            type : String ,
            required : true,
            unique : true
        },
        email : {
            type : String,
            required : true,
            unique : true,
        },
       
        password:{
            type : String,
            required : true,
            unique : true,
            
        }
    }
)

const UserSchema  =new mongoose.Schema(
    {
        name : {
            type : String ,
            required : true,
            unique : true
        },
        email : {
            type : String,
            required : true,
            
        },
       
        role:{
            type: String,
            default: "user"
            
        }
    }
)



const Auth = mongoose.model('Auth', AuthSchema);
const User = mongoose.model('User', UserSchema);

export { Auth, User };