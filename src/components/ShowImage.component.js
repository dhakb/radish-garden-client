import {useEffect, useState} from "react";
import axios from "axios";

const ShowImage = () => {
    const [image, setImage] = useState("")

    useEffect(() => {
        const fetchImage = async () => {

            try {
               const response =  await axios.get("http://localhost:8080/api/upload/")
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
            <img src={'http://localhost:8080/api/upload/image/'+image.filename} alt=""/>
        </div>
    );
};

export default ShowImage;