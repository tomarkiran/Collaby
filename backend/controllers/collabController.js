import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import  ErrorHandler from "../middlewares/error.js";
import { Collab} from "../models/collabSchema.js";
import {User} from "../models/userSchema.js";

// export const getAllCollabs = catchAsyncError(async (req, res, next) => {
//     const Collabs = await Collab.find({expired: false});
//     res.status(200).json({
//         success: true,
//         Collabs,
//     });
// });




///extraaa
export const getAllCollabs = catchAsyncError(async (req, res, next) => {
    const {  country, city, expired } = req.query;
    // category,
    const filterCriteria = {
        // ...(category),
        ...(country && { country }),
        ...(city && { city }),
        ...(expired !== undefined && { expired: expired === 'false' }),
    };

    const Collabs = await Collab.find(filterCriteria);
    res.status(200).json({
        success: true,
        Collabs,
    });
});

export const postCollabs = catchAsyncError(async(req, res ,next)=> {
    const {role} = req.user;
    if(role === "Influencer"){
        return next(new ErrorHandler("Collab seeker is not allowed to access this resources!", 
        400
    )
);
    }

    const {
        title, 
        description,
        category,
        platforms,
        reach,
        country, 
        city, 
        fixedPayment, 
        paymentFrom , 
        paymentTo
     } = req.body;

    if(!title || !description || !category || !country){
        return next(new ErrorHandler("Please provide all details", 400));
    }

    if((! paymentFrom || ! paymentTo) && !fixedPayment){
        return next(
            new ErrorHandler("Please either provide fixed payment or  payment range!!")
        );
    }

    if(paymentFrom && paymentTo && fixedPayment){
        return next(
            new ErrorHandler("Cannot enter fixed and ranged payment together")
        );
    }

    const postedBy = req.user._id;
    const Collabs = await Collab.create({
        title, 
        description,
        category,
        platforms,
        reach,
        country, 
        city, 
        fixedPayment, 
        paymentFrom , 
        paymentTo,
        postedBy
    })

    res.status(200).json({
        sucess: true,
        message: "Collab post posted successfully",
        Collabs
    });
});

export const getmyCollabs = catchAsyncError(async(req, res, next) =>{
    const {role} = req.user;
    if(role === "Influencer"){
        return next(new ErrorHandler("Collab seeker is not allowed to access this resources!", 
        400
    )
  );
 }

 const myCollabs = await Collab.find({postedBy: req.user._id});
 res.status(200).json ({
    success: true,
    myCollabs
 });
});


export const updatePost = catchAsyncError(async(req, res, next)=> {
    const {role} = req.user;
    if(role === "Influencer"){
        return next(
            new ErrorHandler(
                "Collab seeker is not allowed to access this resources!", 
                400
    )
  );
 }

 const {id} = req.params;
 let Collabs = await Collab.findById(id);
 if(!Collabs){
    return next(
        new ErrorHandler(
            "OOPS!! Collab not found", 
            404
        )
    );
 }
 Collabs = await Collab.findByIdAndUpdate(id, req.body, {
    new : true,
    runValidators: true,
    useFindAndModify: false
 })
 res.status(200).json({
    success: true,
    Collabs,
    message: "Post updated successfully",
 });
});

export const deletePost = catchAsyncError(async(req, res, next)=> {
    const {role} = req.user;
    if(role === "Influencer"){
        return next(
            new ErrorHandler(
                "Collab seeker is not allowed to access this resources!", 
                400
    )
  );
 }

 const {id} = req.params;
 let Collabs = await Collab.findById(id);
 if(!Collabs){
    return next(
        new ErrorHandler(
            "OOPS!! Collab not found", 
            404
        )
    );
 }

 await Collabs.deleteOne();
 res.status(200).json ({
    sucess: true,
    message: "Post deleted successfully"
 });
});

export const getSinglePost = catchAsyncError(async(req, res , next)=> {
    const {id} = req.params;

    try {
        const Collabs = await Collab.findById(id);
        if(!Collabs){
            return next(new ErrorHandler("This post not found", 404));
        }
        res.status(200).json({
            success: true,
            Collabs,
        })
    } catch (error) {
      return next(new ErrorHandler("Invalid ID/CastError"))  
    }
})
