import { Order } from "../Url/api";

const baseUrl = Order();
export const RejectOrder=async(id,order)=>{
    try{
        const response=await fetch(`${baseUrl}RejectOrder/${id}`,{
            method:'Post',
            headers: {
                'Content-Type': 'application/json',
               
            },
            body: JSON.stringify(order)
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
export const SeatOrderReject=async(id)=>{
    try{
        const response=await fetch(`${baseUrl}SeatOrderReject/${id}`,{
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
    }catch(err){
        console.log(err)
    }
}
export const CountOrderAdmin=async(id)=>{
    try{
        const response=await fetch(`${baseUrl}CountOrderAdmin/${id}`,{
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
    }catch(err){
        console.log(err)
    }
}
export const HistoryOrder=async(id)=>{
    try{
        const response=await fetch(`${baseUrl}HistoryOrder/${id}`,{
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
    }catch(err){
        console.log(err)
    }
}
export const TransferOrder=async(orderCode)=>{
    try{
        const response=await fetch(`${baseUrl}TranferOrder/${orderCode}`,{
            method:'PUT',
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
    }catch(err){
        console.log(err)
    }
}
export const OrderDesc=async(token)=>{
    try{
        const response=await fetch(`${baseUrl}OrderDesc`,{
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
export const GetCoutorder=async(datetime,token)=>{
    try{
        const response=await fetch(`${baseUrl}GetCoutorder/${datetime}`,{
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
export const GetCoutOrderAdmin=async(datetime,id)=>{
    try{
        const response=await fetch(`${baseUrl}GetCoutOrderAdmin/${datetime}/${id}`,{
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
    }catch(err){
        console.log(err)
    }
}
export const CountOrder=async(token)=>{
    try{
        const response=await fetch(`${baseUrl}CountOrder`,{
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
export const GetComboSeatDetail=async(id,token)=>{
    try{
        const response=await fetch(`${baseUrl}GetComboSeatDetail/${id}`,{
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
export const GetSeatDetailOrder=async(id,token)=>{
    try{
        const response=await fetch(`${baseUrl}GetSeatDetailOrder/${id}`,{
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
export const GetAccountDetailOrder=async(id,token)=>{
    try{
        const response=await fetch(`${baseUrl}GetAccountDetailOrder/${id}`,{
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
export const UpdateOrderStatus=async(id,email,token)=>{
    try{
        const response=await fetch(`${baseUrl}UpdateOrderStatus/${email}/${id}`,{
            method:'PUT',
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
export const GetOrderByAdmin=async(id,token)=>{
    try{
        const response=await fetch(`${baseUrl}GetOrderAdmin/${id}`,{
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
export const CreateOrder=async(Order)=>{
    try {
        const response = await fetch(`${baseUrl}CreateOrder`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Order)
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