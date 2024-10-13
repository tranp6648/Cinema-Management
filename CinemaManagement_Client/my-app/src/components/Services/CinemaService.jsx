import { Cinema } from "../Url/api";

const baseUrl = Cinema();
export const CreateCinema = async (Cinema, token) => {
    try {
        const response = await fetch(`${baseUrl}AddCinema`, {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(Cinema)
        })
        if (!response.ok) {
            const responseBody = await response.json();
            console.log(responseBody)
            return responseBody;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}
export const UpdateCinema = async (id, Cinema, token) => {
    try {
        const response = await fetch(`${baseUrl}UpdateCinema/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(Cinema)
        })
        if (!response.ok) {
            const responseBody = await response.json();
            console.log(responseBody)
            return responseBody;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}
export const GetCinema = async (token) => {
    try {
        const response = await fetch(`${baseUrl}GetCinema`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        if (!response.ok) {
            const responseBody = await response.json();
            console.log(responseBody)

        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}