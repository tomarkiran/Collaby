import mongoose from "mongoose";
import validator from "validator";

const collabrationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name"],
        minLength: [3, "Nmae must contain atleast 3 characters"],
        maxLength: [25, "Nmae must not exceed 25 characters"],
    },
    email: {
        type: String,
        validator: [validator.isEmail, "Please provide valid email"],
        required : [true, "Please provide your email"],
    },
    mediaPlatforms:{
        type: String,
        required: [true, "Please provide your social media platform"],

    },
    linkToPlatforms: {
        type: String,
        // const myUrl = new URL('https://www.example.com/path?name=ChatGPT&age=2');
        required: [true, "Please provide your social media platform links"],
    },
    phone: {
        type: Number,   
        required: [true, "Please provide your phone number"]
    },
    address: {
        type: String,
        required: [true, "Please provide your address"]
    },
    resume : {
        public_id : {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true
        }
    },
    influencerID: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        role: {
            type: String,
            enum: ["Influencer"],
            required: true
        }
    },
    collaboratorID: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        role: {
            type: String,
            enum: ["Collaborator"],
            required: true
        }
    }
});

export const Collabration = mongoose.model("Collabration", collabrationSchema);