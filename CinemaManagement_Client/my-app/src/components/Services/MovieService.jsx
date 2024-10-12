import { Movie } from "../Url/api";
const baseUrl = Movie();
export const AddActorToMovie = async (Actor) => {
    try {
        const response = await fetch(`${baseUrl}AddActorMovie`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Actor)
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
export const DeleteMovie = async (Id, token) => {
    try {
        const response = await fetch(`${baseUrl}DeleteMovie/${Id}`, {
            method: 'Delete',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(Movie)

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
export const UpdateMovie = async (Id, Movie, token) => {
    try {
        const response = await fetch(`${baseUrl}UpdateMovie/${Id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(Movie)
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
export const CreateMovie = async (Movie, token) => {
    try {
        const response = await fetch(`${baseUrl}AddMovie`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(Movie) // Send JSON stringified data
        });

        if (!response.ok) {
            const responseBody = await response.json();
            return responseBody;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};
export const GetMovie = async (token) => {
    try {
        const response = await fetch(`${baseUrl}GetMovie`, {
            method: 'Get',
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
    } catch (error) {
        console.log(error)
    }
}