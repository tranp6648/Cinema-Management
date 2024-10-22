import { Screen } from "../Url/api";

const baseUrl=Screen();
export const GetScreenAdmin=async(Id,token)=>{
    try{
        const response=await fetch(`${baseUrl}GetScreenAdmin/${Id}`,{
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
    }catch(error){
        console.log(error)
    }
}
export const GetDetailScreen=async(idscreen)=>{
try{
const response=await fetch(`${baseUrl}ShowDetailSeat/${idscreen}`,{
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
export const CreateScreen=async(screen)=>{
    try{
        const response=await fetch(`${baseUrl}CreateScreen`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
           
            },
            body:JSON.stringify(screen)
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