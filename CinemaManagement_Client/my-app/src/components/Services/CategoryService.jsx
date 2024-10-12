import { Category } from "../Url/api";
const baseUrl=Category();
export const AddCategoryMovie=async(Category,token)=>{
    try{
        const response=await fetch(`${baseUrl}Add`,{
            method:'Post',
            headers:{
                 'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(Category)
        })
        if (!response.ok) {
            const responseBody = await response.json();
            console.log(responseBody)
            return responseBody;
        }
        const data = await response.json();
        return data;
    }catch(error){
        console.log(error);
    }
}
export const DeleteCategory=async(id,token)=>{
    try{
        const response=await fetch(`${baseUrl}DeleteCategory/${id}`,{
            method:'Delete',
            headers:{
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
        console.log(error);
    }
}
export const UpdateCategory=async(id,Category,token)=>{
    try{
        const response=await fetch(`${baseUrl}UpdateCategory/${id}`,{
            method:'Put',
            headers:{
                'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`
           },
           body: JSON.stringify(Category)
        })
        if (!response.ok) {
            const responseBody = await response.json();
            console.log(responseBody)
            return responseBody;
        }
        const data = await response.json();
        return data;
    }catch(error){
        console.log(error);
    }
}
export const GetCategory=async(token)=>{
    try{
        const response=await fetch(`${baseUrl}GetCategory`,{
            method:'Get',
            headers:{
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