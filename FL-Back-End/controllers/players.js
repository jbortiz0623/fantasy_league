const express = require('express')
const router = express.Router()

const db = require('../models');

router.get('/', (req, res) => {
    db.Player.find({})
        .then(players => res.json(players))
});
router.get('/:number', (req, res) => {
    db.Player.find({Number: req.params.number})
        .then(players => res.json(players))
});

router.get('/:id', (req,res) => {
    db.Player.findOne({_id:req.params.id})
        .exec((err,found) => res.json(found))
})

router.post('/', (req, res) => {
    var newPlayer = new db.Player({
        Number: req.body.Number, 
        Name: req.body.Name,
        Position: req.body.Position,
        Age: req.body.Age,
        Height: req.body.Height,
        Weight: req.body.Weight,
        College: req.body.College,
        Salary: req.body.Salary
    })
    //saved player to my database
    newPlayer.save((err, savedPlayer) =>{
        if (err) { res.status(500).json({error:err}); }
        res.redirect('/');
    });
});

router.put('/', (req,res) => {
    let playerId = req.params.id;
    let updateplayer = req.body;
    db.Player.findOneAndUpdate(
        {_id: playerId},
        updateplayer,
        {new:true},
        (err, updateplayer)=> {
          if (err) {return console.log('internal error', err) ; }
          res.json(updateplayer);
    });
});

router.delete('/:id', (req,res)=>{
    let playerId = req.params.id;
    db.Player.deleteOne(
      {_id: playerId},
      (err, deletedplayer) => {
        if(err) { return console.log(err) }
        res.json(deletedplayer);
    });
});

module.exports = router