import express from "express";
const app = express();
app.get('/',(req,res)=>{
res.send("Welocm to E-com API");    
})

app.listen(3200,()=>{
   console.log("Server is running on port 3200");
}); 

