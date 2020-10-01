var express = require('express');
var router = express.Router();
let Todo = require('../models/todo');

router .get('/todos',function(req,res){
    Todo.find(function(err,todos){
        if(err){
            console.log(err);
        }else{
            res.json(todos);
        }
    })
})

router .post('/todos/add',function(req,res){
    let val=req.body.value;
    let done = req.body.done;
    let cat = req.body.category;
    let date = req.body.due_date;
    let todo = new Todo({
        value:val,
        due_date:date,
        category:cat,
        done:done
    });
    
    todo.save()
        .then(todo => {
            res.status(200).json({'todo': 'todo added successfully'});
            
        })
        .catch(err => {
            res.status(400).send('Adding a new todo failed');
        });
})

router .delete('/todos/delete/:id',function(req,res){
    Todo.findByIdAndRemove(req.params.id,function(err){
        if(err){
            console.log(err);
        }else{
            res.json({'message':'deleted successfully'});
        }
    })
})
module.exports = router ;
