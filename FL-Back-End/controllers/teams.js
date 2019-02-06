const express = require('express')
const router = express.Router()

const db = require('../models')

router.get('/', (req,res) => {
    db.Team.find({})
        .populate('players')
        .exec((err,teams) => res.json(teams))
});

router.get('/:id', (req,res) => {
    db.Team.findOne({_id:req.params.id})
    .populate('players')
        .exec((err,found) => res.json(found))
})

router.post('/create',  (req,res) => {
    console.log(req.body)
    db.Team.create(req.body, (err, team) => {
        if(err) return console.log(err);
        res.json(team);
    })
});

router.put('/:id', (req,res) => {
    let teamId = req.params.id;
    let updateteam = req.body;
    db.Team.findOneAndUpdate(
        { _id: teamId },
        updateteam,
        {new:true} 
    ).then((team) => {
        if (!team) { res.status(401).json({error:err})
        } else {
            res.json(updateteam)
        }
    })
})

router.delete('/:id', (req,res)=>{
    let teamId = req.params.id;
    db.Team.deleteOne(
      {_id: teamId},
      (err, deletedteam) => {
        if(err) { return console.log(err) }
        res.json(deletedteam);
    });
});


module.exports = router