import { ShowTime } from "../Url/api";

const BaseUrl = ShowTime();
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