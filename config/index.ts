export default {
    // MongoDB connection configuration and authentication
    db: {
        url: process.env.MONGODB_URL || "mongodb://localhost:27017/change-this",
    },
};
