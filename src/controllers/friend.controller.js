import express from 'express';
import FriendService from '../services/friend.service.js';

class FriendController {
    constructor() {
        this.friendService = new FriendService();
    }

    async getFriendInfo(req, res) {
        try {
            const friendId = parseInt(req.params.id); //Alterando para id
            const friend = await this.friendService.getFriendInfo(friendId); //Alterando para receber id 
            res.status(200).json(friend);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createFriend(req, res) {
        try {
            const friend = req.body;
            const newFriend = await this.friendService.createFriend(friend);
            res.status(201).json(newFriend);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateFriend(req, res) {
        try {
            const friendId = parseInt(req.params.id);
            const friendData = req.body;
            if (!friendId) {
                return res.status(400).json({ error: 'Friend ID is required'})
            }
            const updatedFriend = await this.friendService.updateFriend(friendId, friendData);
            res.status(200).json(updatedFriend);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteFriend(req, res) {
        try {
            const friendId = parseInt(req.params.id);
            await this.friendService.deleteFriend(friendId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getFriendListByCustomerId(req, res) {
        try {
            const customerId = parseInt(req.params.id);
            if (isNaN(customerId)) {
                return res.status(400).json({ error: "Invalid customer ID" });
            }
    
            const friends = await this.friendService.getFriendListByCustomerId(customerId);
            res.status(200).json(friends);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
}

export default FriendController;
