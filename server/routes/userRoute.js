var express = require('express');
var router = express.Router();

let Trap = require('../models/Trap');
let bisectionmodel = require('../models/bisectionmodel');
let Newtonraphson = require('../models/Newton-raphson');
let Graphical = require('../models/Graphical');
let CompositeSimpson = require('../models/CompositeSimpson');
let Backwardh = require('../models/Backwardh');

/* GET users listing. */

/////////////////////////////////////////////////////////////

router.get('/showtrap', function(req, res, next) {
 
  Trap.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});

router.post('/addtrap',(req,res)=>{
  console.log(req.body);
  let doc = new Trap(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

router.get('/showbisectionmodel', function(req, res, next) {
 
  bisectionmodel.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});

router.post('/bisectionmodel',(req,res)=>{
  console.log(req.body);
  let doc = new bisectionmodel(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

router.get('/showGraphical', function(req, res, next) {
 
  Graphical.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});

router.post('/Graphical',(req,res)=>{
  console.log(req.body);
  let doc = new Graphical(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})


router.get('/showNewtonraphson', function(req, res, next) {
 
   Newtonraphson.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })

});

router.post('/Newtonraphson',(req,res)=>{
  console.log(req.body);
  let doc = new Newtonraphson(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

router.get('/showCompositeSimpson', function(req, res, next) {
 
  CompositeSimpson.find().sort({age:1}).exec((err,data)=>{
   console.log(data);
   return res.json({success:true,data:data});
 })

});

router.post('/CompositeSimpson',(req,res)=>{
 console.log(req.body);
 let doc = new CompositeSimpson(req.body);
 doc.save((err,data)=>{
   if(err) throw err;
   res.send({success:true});
 })
})

router.get('/showBackwardh', function(req, res, next) {
 
  Backwardh.find().sort({age:1}).exec((err,data)=>{
   console.log(data);
   return res.json({success:true,data:data});
 })

});

router.post('/Backwardh',(req,res)=>{
 console.log(req.body);
 let doc = new Backwardh(req.body);
 doc.save((err,data)=>{
   if(err) throw err;
   res.send({success:true});
 })
})


/////////////////////////////////////////////////////////////

module.exports = router;
