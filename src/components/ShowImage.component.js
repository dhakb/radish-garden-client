import {useEffect, useState} from "react";
import axios from "axios";

import {API_BASE_URL} from "../constants";
const ShowImage = () => {
    const [image, setImage] = useState("")

    useEffect(() => {
        const fetchImage = async () => {

            try {
               const response =  await axios.get(`${API_BASE_URL}/api/upload/`)
                setImage(response.data)
            } catch (err) {
                console.log(err)
            }
        }

        fetchImage()

    }, [])

    console.log(image.filename)
    return (
        <div>
            Helloo image
            <img src={`${API_BASE_URL}/api/upload/`+image.filename} alt=""/>
        </div>
    );
};

export default ShowImage;