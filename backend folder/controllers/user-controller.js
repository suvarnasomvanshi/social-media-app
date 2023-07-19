import User from "../model/User";
import bcrypt from "bcryptjs";


export const getAlluser = async(req,res,next) =>{

    let users;
    try{
        users = await User.find();
    }catch(err){
         console.log(err)
    }

    if(!users){
        return res.status(404).json({message: "No Users Found"});
    }

     return res.status(200).json({users});

}





export const signup = async (req,res,next) => {


   const {name,email,password} = req.body;


   let existingUser ;
   try{
         existingUser = await User.findOne({email})
   }catch(err){
         return console.log(err)
   }

   if(existingUser){
      return res.status(400).json({message:"User already exist! login instead"})
   }

   const hashedPassword = bcrypt.hashSync(password);

   const user = new User({
    name,
    email,
    password:hashedPassword,
    blog:[]
   });
    

    try{
      await user.save();
    }catch(err){
       return console.log(err)
    }
    return res.status(201).json({user});
   
}







export const login = async (req,res,next) => {

    const {email, password} = req.body;

    let existingUser ;

    try{
        existingUser = await User.findOne({email})
    }catch(err){
        return console.log(err)
    }

    if(!existingUser){
     return res.status(404).json({message:"User not  exist "})
    }
    

    const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password);
    
    if(!isPasswordCorrect){
        res.status(400).json({message:"incorrect password"})
    }
    return res.status(200).json({message:"login successful"})

}

