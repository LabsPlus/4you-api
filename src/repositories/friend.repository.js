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

    async getFriendInfo(friendEmail) {

        return await this.prisma.friend.findUnique({
            where: {
                email: friendEmail,
            },
        });
    }
    async createFriend(friend) { 

        return await this.prisma.friend.creat({
            data: friend,
        });
    }
    async updateFriend(friend) {

        return await this.prisma.friend.update({
            where: {
                email: friend.email,
            },
        });
    }

    async deleteFriend(friendEmail) {
        
        return await this.prisma.friend.delete({
            where: {
                email: friendEmail
            }
        });
    }

    async getFriendListByCustomerEmail(customerEmail) {

        return await this.prisma.friend.findMany({
            where: {
                customer: {
                    email: customerEmail
                }
            }
        });
    }
}

export default FriendRepository;
