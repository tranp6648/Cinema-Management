
import { Account } from "../Url/api";
const baseUrl = Account();
export const GetAccountAdmin=async(token)=>{
    try{
        const response=await fetch(`${baseUrl}GetAccountAdmin`,{
            method:'Get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        if (!response.ok) {
            const responseBody = await response.json();
            console.log(responseBody)
            return responseBody;
        }
        const data = await response.json();
        return data;
    }catch(error){
        console.log(error)
    }
}
export const ProfileAccount = async (id, token) => {
    try {
        const response = await fetch(`${baseUrl}ProfileAccount/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
       
        if (!response.ok) {
            const responseBody = await response.json();
            console.log(responseBody)
            return responseBody;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}

export const ChangeProfile = async (id, UpdateProfile, token) => {
    try {
        const response = await fetch(`${baseUrl}UpdateProfile/${id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(UpdateProfile)
        })
        if (!response.ok) {
            const responseBody = await response.json();
            return responseBody;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("failed:" + error);
        throw error;
    }
}
export const UploadPhoto = async (id, Photo, token) => {
    try {
        const formData = new FormData();
        formData.append("photo", Photo)
        const response = await fetch(`${baseUrl}UploadAvatar/${id}`, {
            method: 'POST',
            headers: {

                'Authorization': `Bearer ${token}`
            },
            body: formData
        })
        if (!response.ok) {
            const responseBody = await response.json();
            return responseBody;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("failed:" + error);
        throw error;
    }
}
export const Login = async (Account) => {
    try {
        const response = await fetch(`${baseUrl}Login`, {
            method: 'POST',
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
    } catch (error) {
        console.error("failed:" + error);
        throw error;
    }
}
export const Register = async (Account) => {
    try {
        const response = await fetch(`${baseUrl}Register`, {
            method: 'POST',
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
    } catch (error) {
        console.error("failed:" + error);
        throw error;
    }
}
export const ChangePasswordService = async (ChangePassword) => {
    try {
        const response = await fetch(`${baseUrl}ChangePassword`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ChangePassword)
        })
        if (!response.ok) {
            const responseBody = await response.json();
            return responseBody;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("failed:" + error);
        throw error;
    }
}
export const CheckOTP = async (OTPCheck) => {
    try {
        const response = await fetch(`${baseUrl}CheckOTP`, {
            method: 'PUT',
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
    } catch (error) {
        console.log(error)
    }
}
export const Forget = async (Email) => {
    try {
        const response = await fetch(`${baseUrl}ForgetPassword/${Email}`, {
            method: 'Put',
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

    } catch (error) {
        console.error("failed: " + error);
        throw error;
    }
}