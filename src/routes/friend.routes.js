import FriendController from '../controllers/friend.controller.js';
import express from 'express';

const friendRoutes = express.Router();

const friendController = new FriendController();
//Alterando rotas de email para id 
friendRoutes.get('/:id', friendController.getFriendInfo.bind(friendController));
friendRoutes.post('/create', friendController.createFriend.bind(friendController));
friendRoutes.put('/:id', friendController.updateFriend.bind(friendController));
friendRoutes.delete('/:id', friendController.deleteFriend.bind(friendController));
friendRoutes.get('/getFriendListByCustomerId/:id', friendController.getFriendListByCustomerId.bind(friendController));


export default friendRoutes;
