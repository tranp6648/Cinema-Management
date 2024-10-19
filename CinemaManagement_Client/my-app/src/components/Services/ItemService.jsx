import { Item } from "../Url/api";

const baseUrl=Item();
export const GetItem=async()=>{
    try{
        const response=await fetch(`${baseUrl}GetItem`,{
            method:'Get',
            headers: {
                'Content-Type': 'application/json',
            }
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
export const AddItemCombo=async(createitem)=>{
    try{
        const response=await fetch(`${baseUrl}CreateItem`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(createitem)
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