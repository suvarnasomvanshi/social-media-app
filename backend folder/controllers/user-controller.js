import User from "../model/User";


export const getAlluser = async(res,req,next) =>{
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