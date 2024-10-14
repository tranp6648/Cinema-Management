import { Blog } from "../Url/api";

const baseUrl=Blog();
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