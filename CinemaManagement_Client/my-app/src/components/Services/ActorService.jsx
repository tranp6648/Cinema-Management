import { Actor } from "../Url/api";
const baseUrl=Actor();
export const GetDetailActor=async(Id)=>{
    try{
        const response=await fetch(`${baseUrl}GetDetailActor/${Id}`,{
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
export const UpdateDescription = async (id, Description) => {
    try {
        const response = await fetch(`${baseUrl}UpdateDescription/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Description)
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
export const CountActor=async(token)=>{
    try{
        const response=await fetch(`${baseUrl}CountActor`,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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