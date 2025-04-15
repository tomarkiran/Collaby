import mongoose from "mongoose";

const collabSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Please provide title for ad"],
        minLength: [3,"Title must contain atlest 3 characters"],
        maxLength: [50, "Title cannot exceed 50 characters"],
    },
    description:{
        type: String,
        required: [true, "Please provide required collabration description"],
        minLength: [3,"Title must contain atlest 50 characters"],
        maxLength: [250, "Title cannot exceed 250 characters"],
    },
    category:{
        type: String,
        required: [true, "Particular niche for collabration is required"],
    },
    platforms:{
        type: String,
        required: [true, "Please provide required platforms reach"],        
    },
    reach:{
        type: String,
        required: [true, "Please provide required subscribers/reach"]
    },
    country:{
        type: String,
        required: [true, "Please mention country"],
    },
    city: {
        type: String,
        required: [true, "Please mention city"],
    },
    fixedPayment: {
        type: Number,
        minLength: [3,"Payment for any collabration must be above 100"],
        minLength: [9,"Payment for any collabration can be upto 9 figure"],
    },
    paymentFrom: {
        type: Number,
        minLength: [3,"Staring Payment range for any collabration must be above 100"],
        minLength: [9,"Payment range for any collabration can be upto 9 figure"],
    },
    paymentTo: {
        type: Number,
        minLength: [3," Payment range for any collabration must be above 100"],
        minLength: [9,"Payment range for any collabration can be upto 9 figure"],
    },
    expired: {
        type: Boolean,
        default: false,
    },
    rolePostedOn: {
        type: Date,
        default: Date.now,
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },

});

export const Collab = mongoose.model("Collab", collabSchema);