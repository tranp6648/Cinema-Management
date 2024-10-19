import { Feedback } from "../Url/api";

const baseUrl = Feedback();
export const AvgFeedback=async(id)=>{
    try{
        const response=await fetch(`${baseUrl}AvgFeedback/${id}`,{
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
export const GetFeedback = async (id) => {
    try {
        const response = await fetch(`${baseUrl}GetFeedback/${id}`, {
            method: 'Get',
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
        console.log(error)
    }
}
export const CreateFeedback = async (Feed) => {
    try {
        const response = await fetch(`${baseUrl}CreateFeedback`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Feed)
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