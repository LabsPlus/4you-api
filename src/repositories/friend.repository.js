import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

class FriendRepository {
    constructor() {
        this.databaseUrl = process.env.DATABASE_URL;

        this.prisma = new PrismaClient({
            datasources: {
                db: {
                    url: this.databaseUrl,
                },
            },
        });
    }

    async getFriendInfo(friendId) {
        try {
            return await this.prisma.friend.findUnique({
                where: {
                    id: friendId,
                },
            });
        } catch (error) {
            throw new Error("Error getting friend info: " + error.message);
        }
    }

    async createFriend(friend) {
        try {
            return await this.prisma.friend.create({
                data: friend,
            });
        } catch (error) {
            throw new Error("Error creating friend: " + error.message);
        }
    }

    async updateFriend(friendId, friendData) {
        try {
            return await this.prisma.friend.update({
                where: {
                    id: friendId, 
                },
                data: friendData, 
            });
        } catch (error) {
            throw new Error("Error updating friend: " + error.message);
        }
    }

    async deleteFriend(friendId) {
        try {
            return await this.prisma.friend.delete({
                where: {
                    id: friendId,
                },
            });
        } catch (error) {
            throw new Error("Error deleting friend: " + error.message);
        }
    }

    async getFriendListByCustomerId(customerId) {
        try {
            return await this.prisma.friend.findMany({
                where: {
                    customer_id: customerId,
                },
            });
        } catch (error) {
            throw new Error("Error getting friend list by customer ID: " + error.message);
        }
    }
}

export default FriendRepository;
