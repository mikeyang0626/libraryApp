
const express = require('express');
const router = express.Router();


const categories = [
    { id: 1, name: 'medic' },
    { id: 2, name: 'literature' },
    { id: 3, name: 'science' },
];

router.get('/', (req, res) => {
    res.send(categories);
});

router.get('/:id', (req, res) =>{
    //look up
    let category = categories.find( c => parseInt(req.params.id) === c.id) ;
   
    // if not existing, return 404
    if ( !category ) return res.status(404).send(`ID: ${req.params.id} not found.`);
    //return category
    res.send(category);
});

router.post('/', (req, res) => {
    //validate
    let { error } = validateCategory(req.body);
    //if not valid, return 400 - bad request
    if ( error ) return res.status(400).send(error.details[0].message);

    // add category
    let category = {
        id: categories.length + 1,
        name: req.body.name
    } 
    categories.push(category);
    // return category
    res.send(category);
});

router.put('/:id', (req, res) => {
    //look up
    let category = categories.find( c => parseInt(req.params.id) === c.id) ;
    // if not exsiting, return 404
    if ( !category ) return res.status(404).send(`This ID: ${req.params.id} doesn't exsit.`);
    //validate
    let { error } = validateCategory(req.body);
    // if not valid , return 400
    if ( error ) return res.status(400).send(error.details[0].message);
    // update
    category.name = req.body.name;
    // return
    res.send(category);
} );

router.delete('/:id', (req, res) => {
    //look up
    let category = categories.find( c => parseInt(req.params.id) === c.id) ;
    // if not exsit, return 404
    if ( !category ) return res.status(404).send(`This ID: ${req.params.id} doesn't exsit.`);
    //delete
    let index = categories.indexOf(category);
    categories.splice(index, 1);
    //return
    res.send(category);
});


function validateCategory(category){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(category, schema);

}

module.exports = router;