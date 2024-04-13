const express = require('express')

const router = express.Router() 

router.get('/',(req,res)=>{
    console.log(req.url);
    res.json({message: "not available"})
})

module.exports = router