import { ComboItem } from "../Url/api";

const baseUrl=ComboItem();
export const CountComboItem=async(token)=>{
    try{
        const response=await fetch(`${baseUrl}CountComboItem`,{
            method:'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
        })
        if (!response.ok) {
            const responseBody = await response.json();
            console.log(responseBody)
            return responseBody;
        }
        const data = await response.json();
        return data;
    }catch(err){
        console.log(err)
    }
}
export const ShowComboItem=async()=>{
    try{
        const response=await fetch(`${baseUrl}ShowComboItem`,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
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
export const UpdateActiveStatus=async(id,combo)=>{
    try{
        const response=await fetch(`${baseUrl}UpdateStatus/${id}`,{
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(combo)
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
export const UpdateComboItem=async(id,combo)=>{
    try{
        const response=await fetch(`${baseUrl}UpdateComboItem/${id}`,{
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(combo)
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
export const GetComboItem=async()=>{
    try{
        const response=await fetch(`${baseUrl}GetComboItem`,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
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
export const CreateCombo=async(combo)=>{
try{
const response=await fetch(`${baseUrl}CreateCombo`,{
    method:'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(combo)
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