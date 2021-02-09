// implement your posts router here
const posts = require('./posts-model.js');
const express = require("express");

const router = express.Router();

router.get('/', (req, res) => {
    posts.find(req.query)
    .then(post => {
        res.status(200).json(post);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({message: "Error retrieving the posts"});
    });
});

router.get('/:id', (req, res) => {
    posts.findById(req.params.id)
    .then(post => {
        if(post){
            res.status(200).json(post);
        }else{
            res.status(404).json({message: `Post not found`})
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({message:`Error retrieving the post`});
    });
});

router.post('/', (req, res) => {
    posts.insert(req.body)
    .then(post => {
        res.status(201).json(post);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({message: `Error adding the post`});
    });
});


router.put('/:id', (req, res) => {
    const changes = req.body;
    posts.update(req.params.id, changes)
    .then(post => {
        if(post){
            res.status(200).json(post);
        }else{
            res.status(404).json({message: `The post could not be found`});
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({message: `Error updating the post`});
    });
});


router.delete('/:id', (req, res) => {
    posts.remove(req.params.id)
    .then(count => {
        if (count > 0){
            res.status(200).json({message: `The post has been nuked`});
        }else{
            res.status(404).json({message: `The post could not be found`});
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message:`Error removing the post`
        })
    });
});

router.get('/:id/comments', (req, res) => {
    posts.findPostComments(req.params.id)
    .then(post => {
        if(post){
            res.status(200).json(post);
        }else{
            res.status(404).json({message:`The comment could not be found`});
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({message: `There was an error retrieving the comment`});
    })
})


module.exports = router;
