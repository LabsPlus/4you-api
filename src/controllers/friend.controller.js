import express from 'express';
import FriendService from '../services/friend.service.js';

class FriendController {
    constructor() {
        this.friendService = new FriendService();
    }

    async getFriendInfo(req, res) {
        try {
            const friendEmail = req.params.email;
            const friend = await this.friendService.getFriendInfo(friendEmail);
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
            const friend = req.body;
            const updatedFriend = await this.friendService.updateFriend(friend);
            res.status(200).json(updatedFriend);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteFriend(req, res) {
        try {
            const friendEmail = req.params.email;
            await this.friendService.deleteFriend(friendEmail);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getFriendListByCustomerEmail(req, res){

        try {
            const customerEmail = req.params.email;
            await this.friendService.getFriendListByCustomerEmail(customerEmail);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default FriendController;
