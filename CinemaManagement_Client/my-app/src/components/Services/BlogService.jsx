import { Blog } from "../Url/api";

const baseUrl=Blog();
export const CountBlog=async(token)=>{
    try{
        const response=await fetch(`${baseUrl}CountBlog`,{
            method:'GET',
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
    }catch(err){
        console.log(err)
    }
}
export const GetDetailBlog=async(id)=>{
    try{
        const response=await fetch(`${baseUrl}DetailBlog/${id}`,{
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
export const GetBlogStatus=async()=>{
    try{
        const response=await fetch(`${baseUrl}GetBlogStatus`,{
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
export const GetBlog=async(token)=>{
    try{
        const response=await fetch(`${baseUrl}GetBlog`,{
            method:'GET',
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
        console.log(error)
    }
}
export const UpdateBlog=async(id,Blog,token)=>{
    try{
        const response=await fetch(`${baseUrl}UpdateBlog/${id}`,{
            method:'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
            body:Blog
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
export const UpdateStatus=async(id,Status)=>{
    try{
        const response=await fetch(`${baseUrl}UpdateStatus/${id}`,{
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
          
            },
            body: JSON.stringify(Status)
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
export const AddBlog=async(Blog,token)=>{
    try{
        const response=await fetch(`${baseUrl}CreateBlog`,{
            method:'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
            body:Blog
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