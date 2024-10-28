import { ShowTime } from "../Url/api";

const BaseUrl = ShowTime();
export const CountShowTime=async(id)=>{
    try{
        const response=await fetch(`${BaseUrl}CountShowTimeAdmin/${id}`,{
            method:'GET',
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
        console.log(error)
    }
}
export const GetShowTime=async(id)=>{
    try{
        const response=await fetch(`${BaseUrl}GetShowTime/${id}`,{
            method:'GET',
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
        console.log(error)
    }
}
export const CountShowtime=async(token)=>{
    try{
        const response=await fetch(`${BaseUrl}CountShowTime`,{
            method:'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
        })
        if (!response.ok) {
            const responseBody = await response.json();
            return responseBody;
        }

        const data = await response.json();
        return data;
    }catch(err){
        console.log(err)
    }
}
export const GetSeat=async(id)=>{
    try{
        const response=await fetch(`${BaseUrl}GetSeat/${id}`,{
            method:'GET',
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
        console.log(error)
    }
}
export const GetInfo=async(datetime,id)=>{
    try{
        const response=await fetch(`${BaseUrl}GetInfo/${datetime}/${id}`,{
            method:'GET',
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
        console.log(error)
    }
}
export const GetAllTime=async(id)=>{
    try{
        const response=await fetch(`${BaseUrl}GetAllTime/${id}`,{
            method:'GET',
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
        console.log(error)
    }
}
export const UpdateShowTime=async(id,showtime)=>{
    try{
        const response=await fetch(`${BaseUrl}UpdateShowTime/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(showtime)
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
export const CreateShowTime = async (showtime) => {
    try {
        const response = await fetch(`${BaseUrl}CreateShowTime`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(showtime)
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