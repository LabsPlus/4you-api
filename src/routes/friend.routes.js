import FriendController from '../controllers/friend.controller.js';
import express from 'express';

const friendRoutes = express.Router();

const friendController = new FriendController();

friendRoutes.get('/:email', friendController.getFriendInfo.bind(friendController));
friendRoutes.post('/create', friendController.createFriend.bind(friendController));
friendRoutes.put('/update', friendController.updateFriend.bind(friendController));
friendRoutes.delete('/:email', friendController.deleteFriend.bind(friendController));
friendRoutes.get('/getFriendListByCustomerEmail/:email', friendController.getFriendListByCustomerEmail.bind(friendController));

export default friendRoutes;
