import {useEffect, useState} from "react";
import axios from "axios";

const ShowImage = () => {
    const [image, setImage] = useState("")

    useEffect(() => {
        const fetchImage = async () => {

            try {
               const response =  await axios.get("https://radish-garden-api.netlify.app/.netlify/functions/index/api/upload/")
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
            <img src={'https://radish-garden-api.netlify.app/.netlify/functions/index/api/upload/image/'+image.filename} alt=""/>
        </div>
    );
};

export default ShowImage;