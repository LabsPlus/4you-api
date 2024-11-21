import FriendRepository from '../repositories/friend.repository.js';

class FriendService {
    constructor() {
        this.friendRepository = new FriendRepository();
    }

    async getFriendInfo(friendEmail) {
        return await this.friendRepository.getFriendInfo(friendEmail);
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

    async updateFriend(friend) {

        if (!friend) {
            throw new Error('Friend is required');
        }
        if (!friend.email) {
            throw new Error('Email is required');
        }
        try {
            return await this.friendRepository.updateFriend(friend);
        } catch (error) {
            throw new Error('Error updating friend: ' + error.message);
        }
    }

    async deleteFriend(friendEmail) {
        return await this.friendRepository.deleteFriend(friendEmail);
    }
}

export default FriendService;
