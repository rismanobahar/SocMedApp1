//THIS FILE CONTAINING FUNCTIONS FOR USER FEED, E.G DASHBOARD POSTs, CREATE POST, GET POST FROM CERTAIN USER

import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE POST */
export const createPost = async (req, res) => {
    try {
      const { userId, description, picturePath } = req.body;
      const user = await User.findById(userId);
      const newPost = new Post({
        userId,
        firstName: user.firstName,
        lastName: user.lastName,
        location: user.location,
        description,
        userPicturePath: user.picturePath,
        picturePath,
        likes: {},
        comments: [],
      });
      await newPost.save();
  
      const post = await Post.find();
      res.status(201).json(post);
    } catch (err) {
      res.status(409).json({ message: err.message });
    }
  };

/* READ POST */
export const getFeedPosts = async (req, res) => { //gets and reads user's post at feed
    try{
        const post = await Post.find(); //waiting to find post
        res.status(200).json(post); //if success, shows all post on feed
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getUserPosts = async (req, res) => {  //gets and shows certain user post
    try{
        const { userId } = req.params; //request userId data
        const post = await Post.find({ userId }); //waiting to find user post by userId attibute
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

/* UPDATE */
export const likePost = async (req, res) => { //a function for user giving like on post
    try{
    const { id } = req.params; //request id
    const { userId } = req.body; //request for your Id to be sent
    const post = await Post.findById(id); //waiting for selected post to be found by Id
    const isLiked = post.likes.get(userId); //if the like button pressed, your Id will be inserted into like list

    if(isLiked){ //if button like is pressed
        post.likes.delete(userId);  //delete your Id from the like list if you already liked this and choose to click like again
    }else{
        post.likes.set(userId, true); //if you have not press like button yet, your Id will inserted into like list
    }

    const updatedPost = await Post.findByIdAndUpdate( //update post
        id,
        { likes: post.likes }, //show number of likes
        { new: true } //set the new data as true
    );

    res.status(200).json(updatedPost); //update the post if success
    }catch (err) {
    res.status(404).json({ message: err.message });
    }
};