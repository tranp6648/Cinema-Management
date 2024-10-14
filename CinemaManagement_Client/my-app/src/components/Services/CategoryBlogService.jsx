import {CategoryBlogApi} from '../Url/api'
const baseUrl=CategoryBlogApi();
export const CreateCategoryBlog=async(CategoryBlog)=>{
    try{
        const response=await fetch(`${baseUrl}CreateCategoryBlog`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
          
            },
            body: JSON.stringify(CategoryBlog)
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
export const GetCategoryBlog=async()=>{
    try{
        const response=await fetch(`${baseUrl}GetCategoryBlog`,{
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