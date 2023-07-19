import Blog from "../model/Blog";
import User from "../model/User";

export const getAllBlogs = async(req,res,next)=>{
    let blogs;

    try{
        blogs = await Blog.find();
    }catch(err){
       return console.log(err)
    }
    if(!blogs){
        return res.status(404).json({message : "No blogs found"})
    }
    return res.status(200).json({blogs})
}




export const addBlog = async(req,res,next)=>{

    const {title,description,image,user} = req.body;
    
    let existingUser;
    try{
        existingUser = await User.findById(user);
    }catch(err){
        return console.log(err)
    }
    if(!existingUser){
       return res.status(400).json({message:"Unable to find User by this ID"})
    }
    const blog = new Blog({
        title,
        description,
        image,
        user,
    });

    try{
        await blog.save();
    }catch(err){
        return console.log(err);
    }

    return res.status(200).json({blog});
}




export const updateBlog = async(req,res,next) =>{

const {title,description} = req.body;
const blogId = req.params.id;

let blog;

try{
    blog = await Blog.findByIdAndUpdate(blogId,{
        title,
        description
    })
}catch(err){
    return console.log(err)
}

if(!blog){
    return res.status(500).json({message:"unable to update to blog"})
}
return res.status(200).json({ blog });

}




export const getById = async(req,res,next) =>{
    const id = req.params.id;

    let blog;

    try{
       blog = await Blog.findById(id);
     }catch(err){
      console.log(err)
     }

     if(!blog){
        return res.status(404).json({message:"blog not found"})
     }
    return res.status(200).json({blog});

}



export const deleteBlog = async (req,res,next)=>{
    const id = req.params.id;

    let blog;

    try{
        blog = await Blog.findByIdAndRemove(id)
    }catch(err){
        return console.log(err)
    }
    if(!blog){
        return res.status(500).json({message:"unable to delete"})
    }
    return res.status(200).json({message:"blog deleted"})
}