const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    isAdmin:{type:Boolean,required:true,default:false},
    pic:{type:String,required:true,default:"https://res.cloudinary.com/dturufwfz/image/upload/v1674209720/tkizaer68qzepkvho4zq.png",}
},{timestamps:true});

userSchema.pre("save",async function (next){
    if(!this.isModified("possward")){
        next();
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
})
const User=mongoose.model("User",userSchema);

module.exports=User;