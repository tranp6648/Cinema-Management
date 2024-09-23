import axios from "axios";
import { Account } from "../Url/api";
const baseUrl=Account();
export const Login=async(Account)=>{
    try{
        const response=await fetch(`${baseUrl}Login`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Account)
        })
        if (!response.ok) {
            const responseBody = await response.json();
            return responseBody;
        }

        const data = await response.json();
        return data;
    }catch(error){
        console.error("failed:"+error);
        throw error;
    }
}
export const Register=async(Account)=>{
    try{
        const response=await fetch(`${baseUrl}Register`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Account)
        })
        if (!response.ok) {
            const responseBody = await response.json();
            return responseBody;
        }

        const data = await response.json();
        return data;
    }catch(error){
        console.error("failed:"+error);
        throw error;
    }
}
export const ChangePasswordService=async(ChangePassword)=>{
    try{
        const response=await fetch(`${baseUrl}ChangePassword`,{
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ChangePassword)
        })
        if(!response.ok){
            const responseBody=await response.json();
            return responseBody;
        }
        const data=await response.json();
        return data;
    }catch(error){
        console.error("failed:"+error);
        throw error;
    }
}
export const CheckOTP=async(OTPCheck)=>{
    try{
        const response=await fetch(`${baseUrl}CheckOTP`,{
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(OTPCheck)
        })
        if (!response.ok) {
            const responseBody = await response.json();
            return responseBody;
        }

        const data = await response.json();
        return data;
    }catch(error){
        console.log(error)
    }
}
    export const Forget=async(Email)=>{
        try{
            const response=await fetch(`${baseUrl}ForgetPassword/${Email}`,{
                method:'Put',
                headers: {
                    'Content-Type': 'application/json',
                },

            })
            if (!response.ok) {
                const responseBody = await response.json();
                return responseBody;
            }
    
            const data = await response.json();
            return data;
            
        }catch(error){
            console.error("failed: "+error);
            throw error;
        }
    }