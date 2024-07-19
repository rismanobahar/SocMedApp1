//THIS FILE IS CONTAINING FUNCTIONS THAT WILL SHOWS THE USER'S(YOU) DATA E.G BIODATA, FRIENDLIST, ADD&REMOVE FRIENDS

import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => { //showing your data on homepage(left side of the page)
    try{
        const { id } = req.params; //request your id data
        const user = await User.findById(id); //waiting to find user by Id
        res.status(200).json(user); //success
    } catch (err) {
        res.status(404).json({ message: err.message }); //error
    }
}

export const getUserFriends = async (req, res) => { //showing your friend list at the right side of the page
    try{
      const { id } = req.params; //request your id parameter
      const user = await User.findById(id); //waiting to find user by Id

      const friends = await Promise.all( //await for all friends to be found and will render after all friend list found with Promise function
        user.friends.map((id) => User.findById(id))
      );
      const formattedFriends = friends.map( //format friend id information in a proper way at the frontend
        ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
        } 
      );  // pulls all data consisted from friend list
      res.status(200).json(formattedFriends); //success
    } catch (err) {
      res.status(404).json({ message: err.message }); //error
    }
}

/* UPDATE */
export const addRemoveFriend = async (req, res) => { //A function to add or remove friend
    try{
        const { id, friendId } = req.params; //request id parameter
        const user = await User.findById(id); //waiting for your Id
        const friend = await User.findById(friendId); //waiting to find friendId

        if (user.friends.includes(friendId)) { //check if friendId is included with user(you) id
            user.friends = user.friends.filter((id) => id !== friendId); //if friend included in user id, it will be deleted
            friend.friends = friend.friends.filter((id) => id !== id); //if user id included in the friend id, it will be deleted from friend id attribute
        }else {
            user.friends.push(friendId); //if the friendId is not included in user id, it will be added into user id attribute
            friend.friends.push(id); //if the id is not included in friend id, it will be added into friend id attribute
        }
        await user.save(); //waiting for user to finish saving the friend id 
        await friend.save(); //waiting for friend to finish saving user id

        const friends = await Promise.all( //make sure all the friend appear
          user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map( //format friend id information in a proper way at the frontend
          ({ _id, firstName, lastName, occupation, location, picturePath }) => {
          return { _id, firstName, lastName, occupation, location, picturePath };
          }
        );
        
        res.status(200).json(formattedFriends); //success
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}