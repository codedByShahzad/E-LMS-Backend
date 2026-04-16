import {v2 as cloudinary} from "cloudinary"
import dotenv from "dotenv"
dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

export const uploadMedia = async(file)=>{
    try {
        const uploadResponse = await cloudinary.uploader.upload(file, {
            resource_type: "auto"
        })

        return uploadResponse

    } catch (error) {
        console.log(error)
    }
}

export const deleteMediaFromCloudinary = async (publicId)=>{
    try {
        const deleteMediaFromCloudinaryResponse = await cloudinary.uploader.destroy(publicId)

        return deleteMediaFromCloudinaryResponse
    } catch (error) {
        console.log(error)
    }
}

export const deleteVideoFromCloudinary = async (publicId) =>{
    try {
        const deleteVideoFromCloudinaryResponse = await cloudinary.uploader.destroy(publicId, {
            resource_type: "video"
        })

        return deleteVideoFromCloudinaryResponse
    } catch (error) {
        console.log(error)
    }
}