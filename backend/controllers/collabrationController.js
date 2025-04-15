import {catchAsyncError} from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js"
import {Collabration} from "../models/collabrationSchema.js"
import cloudinary from "cloudinary"
import { Collab } from "../models/collabSchema.js"

export const getAllCollabrations = catchAsyncError(async(req, res, next) => {
    const {role} = req.user;
    if(role === "Influencer"){
        return next(new ErrorHandler("Applicant cannot access this resource", 400));
    }

    const {_id} = req.user;
    const collabrations = await Collabration.find({"collaboratorID.user": _id});
    res.status(200).json({
        success: true,
        collabrations
    });
});

export const influencerAllCollabrations = catchAsyncError(async(req, res, next) => {
    const { role } = req.user;
    if(role === "Collaborator"){
        return next(new ErrorHandler("Cannot excess influencer information ", 400));
    }

    const { _id } = req.user;
    const collabrations = await Collabration.find({"influencerID.user": _id});
    res.status(200).json({
        success: true,
        collabrations
    });
});

export const influencerDeleteCollabrations = catchAsyncError(async(req, res ,next) =>{
    const {role} = req.user;
    if(role === "Collaborator"){
        return next(new ErrorHandler("Cannot delete influencerion ", 400));
    }
    const {id} = req.params;
    const collabrations = await Collabration.findById(id);
    if(!collabrations){
        return next(new ErrorHandler("Oops !! Collabration not found", 404));
    }

    await collabrations.deleteOne();
    res.status(200).json({
        success: true,
        message: "Collabration deleted successfully",
    });

});

export const postCollabration = catchAsyncError(async(req, res, next) => {

    const {role} = req.user;
    if(role === "Collaborator"){
        return next(new ErrorHandler("Collabrator is not allowed to access this resources ", 400));
    }

    if(! req.files || Object.keys(req.files).length === 0){
        return next(new ErrorHandler("InfluenceBio file required"));
    }

    const {resume} = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];

    if(!allowedFormats.includes(resume.mimetype)){
        return next(new ErrorHandler("Invalid file format. Please upload file in png/ jpg/ webp format.",400));
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
        resume.tempFilePath
    );
    console.log(cloudinaryResponse);
    if( !cloudinaryResponse || cloudinaryResponse.error){
        console.error("Cloudinary Error:", cloudinaryResponse.error || "Unknown Cloudinary Error");
        return next(new ErrorHandler("Failed to upload resume", 500))
    }

    const {name , email, mediaPlatforms ,linkToPlatforms, phone , address , collabId } = req.body;
    const influencerID = {
        user: req.user._id,
        role: "Influencer"
    };
    if(!collabId){
        return next(new ErrorHandler("Collab not found", 404));
    }

    const collabDetails = await Collab.findById(collabId);
    if(!collabDetails){
        return next(new ErrorHandler("Collab not found", 404));
    }

    const collaboratorID = {
        user: collabDetails.postedBy,
        role: "Collaborator",
    };

    //   
    if(!name || !email  || !address || !influencerID || !resume) {
        return next(new ErrorHandler("Please fill all feilds!! ", 404));
    }

    const collabrations = await Collabration.create ({
        name , 
        email, 
        mediaPlatforms,
        linkToPlatforms, 
        phone , 
        address , 
        influencerID ,
        collaboratorID,
        resume: {
            public_id: cloudinaryResponse.public_id ,
            url:  cloudinaryResponse.secure_url,
        },
    });

    res.status(200).json({
        success: true,
        message: "Collabration submitted",
        collabrations,
    });
});