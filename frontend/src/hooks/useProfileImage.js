
const uploadImage = async (imageFile) =>{
    const formData = new FormData();
    formData.append('image',imageFile);

    try{
        const response = await fetch("/api/auth/upload-image",{
            method:"POST",
            body:formData
        })
        const data = await response.json()
        console.log(data)

        return data;

    }catch(error){
        console.log("error uploading image",error.message)
    }
}

export default uploadImage