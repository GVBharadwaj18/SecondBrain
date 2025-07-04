import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { UserModel,ContentModel,LinkModel } from "./db";
import {JWT_PASSWORD} from "./config";
import {userMiddleware} from "./middleware";
import {random} from "./utils";
import { SigninSchema,SignupSchema } from "./validation";
import cors from "cors";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";



const app=express();
app.use(express.json());
app.use(cors());

//to store OTPs temporarily 
const otpStore:{[email:string]:{otp:string;expiresAt:number}}={};

const transporter=nodemailer.createTransport({
  service:"gmail",
  auth: {
    user: "youremail@gmail.com",
    pass: "your_app_password",  
  },
});

app.post("/api/v1/signup", async (req,res)=>{
    const parse = SignupSchema.safeParse(req.body);
    if (!parse.success) {
    res.status(400).json({ error: parse.error.errors });
    return;
    }
    const {username,password}=parse.data;
    const hashedPassword=await bcrypt.hash(password,10);
    try{
        await UserModel.create({
            username:username,
            password:hashedPassword
        })
        res.json({
            message:"User signed up successfully"
        })
    }catch(e){
        res.status(411).json({
            message:"User already exists"
        })
    }

})

app.post("/api/v1/signin", async(req,res)=>{
    const parsed = SigninSchema.safeParse(req.body);
    if (!parsed.success) {
    res.status(400).json({ error: parsed.error.errors });
    return;
}
    const {username,password}=parsed.data;
    const existingUser=await UserModel.findOne({
        username,
    })
    if(!existingUser){
        res.status(403).json({message:"Invalid Credentials"});
        return;
    }
    const isPasswordcorrect=await bcrypt.compare(password,existingUser.password || "");
    if (!isPasswordcorrect) {
    res.status(403).json({ message: "Invalid Password" });
    return;
}
    
    const token = jwt.sign({ id: existingUser._id }, JWT_PASSWORD);
     res.json({ token });
})

app.post("/api/v1/forgot-password/send-otp",async(req, res) => {
  const { email } = req.body;
  const user=await UserModel.findOne({ username: email });
  if (!user){
    res.status(404).json({ message:"User not found" });
    return;
  }
   const otp = Math.floor(100000 + Math.random()*900000).toString();
  otpStore[email] = {otp, expiresAt:Date.now()+5*60*1000 };

  await transporter.sendMail({
    from:"youremail@gmail.com",
    to:email,
    subject:"Your OTP to Reset Password",
    html:`<h3>Your OTP is: ${otp}</h3><p>This OTP will expire in 5 minutes.</p>`,
  });

  res.json({ message: "OTP sent to your email." });
});


app.post("/api/v1/forgot-password/reset",async(req, res)=>{
  const {email,otp,newPassword } = req.body;
  const record=otpStore[email];
  if (!record || record.otp !== otp || record.expiresAt < Date.now()) {
    res.status(400).json({ message:"Invalid or expired OTP." });
    return;
  }
   const hashedPassword = await bcrypt.hash(newPassword, 10);
  await UserModel.updateOne({ username: email }, { password: hashedPassword });

  //clear the otp after reseting the password
  delete otpStore[email];
  res.json({ message: "Password reset successfully." });
});

app.post("/api/v1/content",userMiddleware,async(req,res)=>{
    const link=req.body.link;
    const type=req.body.type;
    const title=req.body.title;
    await ContentModel.create({
        link,
        type,
        title:req.body.title,
    
        userId:req.userId,
        tags:[]
    })
    res.json({
        message:"Content added"
    })

})

app.get("/api/v1/content",userMiddleware,async(req,res)=>{
    const userId=new mongoose.Types.ObjectId(req.userId);
    const content=await ContentModel.find({
        userId:userId
    }).populate("userId","username")
    res.json({
        content
    })

})

app.delete("/api/v1/content",userMiddleware,async(req,res)=>{
    const link=req.body.link;
    await ContentModel.deleteOne({
        link,
        userId: req.userId
    })
    res.json({
        message:"Deleted"
    })
})

app.post("/api/v1/brain/share",userMiddleware,async(req,res)=>{
    const share=req.body.share;
    if(share){
        const existingLink=await LinkModel.findOne({
            userId:req.userId
        });
        if(existingLink){
            res.json({
                hash:existingLink.hash
            })
            return;
        }
        const hash=random(10);
        await LinkModel.create({
            userId:req.userId,
            hash:hash

        })
        res.json({
            hash
        })

    } else {
        await LinkModel.deleteOne({
            userId:req.userId
        });
        res.json({
            message:"Removed Link"
        })
    }
})

app.get("/api/v1/brain/:shareLink",async(req,res)=>{
    const hash=req.params.shareLink;
    const link=await LinkModel.findOne({
        hash
    });
    if(!link){
        res.status(411).json({
            message:"Sorry incorrect input"
        })
        return;
    }
    const content=await ContentModel.find({
        userId:link.userId
    })
    console.log(link);
    const user=await UserModel.findOne({
        _id:link.userId
    })
    if(!user){
        res.status(411).json({
            message:"user not found"
        })
        return;
    }
    res.json({
        username:user.username,
        content:content
    })
})

app.listen(3000);