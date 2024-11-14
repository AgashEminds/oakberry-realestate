const User=require("../model/userSchema")

const getagent=async(req,res)=>{
    const query = { property_list: { $gt: 0 } }; 
    try{
    const agent=await User.find(query);
    res.status(200).json(agent) 
   }
   catch(error){
    res.status(500).json("sever error",error)
   }

}

module.exports=getagent;