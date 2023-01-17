const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080;
const studentArray=require("./InitialData")
// app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
// your code goes here
app.get("/api/student",(req,res)=>{
    res.status(200).json(studentArray);
})
app.get("/api/student/:id",(req,res)=>{
    // const data=studentArray.filter((value)=>{
    //     return value.id==req.params.id;
    // })
    // if(data.length){
    //     res.status(200).json(data[0]);
    // }
    // else{
    //     res.status(400).json({
    //                 message:"failed"
    //             })
    // }
    
    const data=studentArray.findIndex((value)=>{return value.id==req.params.id})

    // console.log(data);
    if(data>=0 && studentArray[data])
    {
        res.status(200).json(studentArray[data]);
    }
    else{
        res.status(400).json({
            message:"failed"
        })
    }
   
})
let count=7;
app.post("/api/student",(req,res)=>{
    count++;
    const newId=count;
    const {name="",currentClass="",division=""}=req.body;
   if(name!="" && currentClass!="" && division!=""){
    
    const data={
        id:newId,
        name:name,
        currentClass:currentClass,
        division:division
    }
    studentArray.push(data);
    
    res.status(200).json({
       data
   })
   }
   else{
    res.status(400).json({
      message:"bad request"
      
    })
   }

})
app.put("/api/student/:id",(req,res)=>{
    const identity=req.params.id;
    
    if(identity>=1 && identity<=count) 
    {
        const data=studentArray.findIndex((value)=>{return value.id==identity});

            studentArray[data].name=req.body.name?req.body.name:studentArray[data].name;  
            studentArray[data].currentClass=req.body.currentClass?req.body.currentClass:studentArray[data].currentClass;
            studentArray[data].division=req.body.division?req.body.division:studentArray[data].division;
       
        res.status(200).json(studentArray[data])
    }
    else{
        res.status(400).json({
            message:"failed"
        })
    }

})

app.delete("/api/student/:id",(req,res)=>{
    let identity=req.params.id;
    let index=studentArray.findIndex((values)=>{return values.id==identity});
    if(index>=0)
    {
        const data=studentArray.splice(index,1);
        res.status(200).json({data});

    }
    else{
        res.status(400).json({
            message:"failed"
        });
    }
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   