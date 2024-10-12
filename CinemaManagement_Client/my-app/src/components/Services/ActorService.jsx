import { Actor } from "../Url/api";
const baseUrl=Actor();
export const  GetActorNotIn=async(id)=>{
try{
const response=await fetch(`${baseUrl}GetActorNotIn/${id}`,{
    method:'Get',
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
export const UpdateActor=async(id,actor,token)=>{
    try{
        const response=await fetch(`${baseUrl}UpdateActor/${id}`,{
            method:'Put',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
            body:actor
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
export const DeleteActor=async(id,token)=>{
    try{
        const response=await fetch(`${baseUrl}DeleteActor/${id}`,{
            method:'Delete',
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
    }catch(error){
        console.log(error);
    }
}
export const CreateActor=async(actor,token)=>{
    try{
        const response=await fetch(`${baseUrl}AddActor`,{
            method:'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
            body:actor
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
export const GetActor=async(token)=>{
    try{
        const response=await fetch(`${baseUrl}GetActor`,{
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