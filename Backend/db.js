import mongoose from 'mongoose';
const url='mongodb+srv://kamsuvenu2004:Paytm1234@cluster0.nzeowon.mongodb.net/paytm'
mongoose.connect(url)
.then(()=>{
    console.log("connected to mongodb");
})
.catch((error) => {  
    console.log("error in connecting db",error);
})

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:30
    },
    password:{
        type:String,
        required:true,
        minLength:6,

    },
    firstName:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    }
});
 export const User = mongoose.model("User",userSchema);

const accountSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})

 export const Account = mongoose.model('Account',accountSchema);



// module.exports = User;
// module.exports = { 
//     User };
// export default {User, Account};


