import { ComboItem } from "../Url/api";

const baseUrl=ComboItem();
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