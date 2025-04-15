import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose
    .connect(process.env.MONGO_URI, {
        dbName: "MERN_STACK_COLLABRATION_SEEKING",
    })
    .then(()=> {
        console.log("Connected to database! ");
    })
    .catch((err) => {
        console.log(`Some error occured while database connection : ${err} `);
    });
};