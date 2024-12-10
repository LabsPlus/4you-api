import FriendRepository from '../repositories/friend.repository.js';

class FriendService {
    constructor() {
        this.friendRepository = new FriendRepository();
    }

    async getFriendInfo(friendId) {
        try {
        return await this.friendRepository.getFriendInfo(friendId);
    } catch (error) {
        throw new Error('Error fetching friend info:' +error.message);
    }
}

    async createFriend(friend) {
        if (!friend) {
            throw new Error('Friend is required');
        }
        try {
            return await this.friendRepository.createFriend(friend);
        } catch (error) {
            throw new Error('Error creating friend' + error.message);
        }
    }

    async updateFriend(friendId, friendData) {

        if (!friendId) {
            throw new Error('Friend is required');
        }
        if (!friendData) {
            throw new Error('Data is required');
        }
        try {
            return await this.friendRepository.updateFriend(friendId, friendData);
        } catch (error) {
            throw new Error('Error updating friend: ' + error.message);
        }
    }

    async deleteFriend(friendId) {
        try {
            return await this.friendRepository.deleteFriend(friendId);
        } catch (error) {
            throw new Error('Error deleting friend ' + error.message);
        }
    }

    async getFriendListByCustomerId(customerId) {
        if (!customerId) {
            throw new Error('Customer ID is required');
        }

        try {
            return await this.friendRepository.getFriendListByCustomerId(customerId);
        }
        catch (error) {
            throw new Error(`Error fetching friend list: ${error.message}`);

        }
    }
}

export default FriendService;
