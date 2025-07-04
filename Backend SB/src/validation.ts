import {z} from "zod";
export const SignupSchema=z.object({
    username:z.string().email({message:"Username must be valid email"}),
    password:z.string().min(6,{message:"Password must be atleast 6 characters"})
});
export const SigninSchema=SignupSchema;