const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const cloudinaryUploadMultiple = async (filesToUpload) => {
  try {
    let imageUrls = [];
    for (const file of filesToUpload) {
      const data = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
      });
      imageUrls.push(data);
    }
    console.log(imageUrls);
    return imageUrls;
  } catch (error) {
    console.log(error);
    return new Error(`Internal server Error (cloudinary)`);
  }
};
//Clouninary Upload Image
const cloudinaryUploadImage = async (fileToUpload) => {
  try {
    const data = await cloudinary.uploader.upload(fileToUpload, {
      resource_type: "auto",
    });
    return data;
  } catch (error) {
    console.log(error);
    return new Error(`Internal server Error (cloudinary)`);
  }
};
//Clouninary Remove Image
const cloudinaryRemoveImage = async (imagePublicId) => {
  try {
    const data = await cloudinary.uploader.destroy(imagePublicId);
    return data;
  } catch (error) {
    console.log(error);
    return new Error(`Internal server Error (cloudinary)`);
  }
};
//Clouninary Remove Multiple Image
const cloudinaryRemoveMultipleImage = async (PublicIds) => {
  try {
    const data = await cloudinary.v2.api.delete_resources(PublicIds);
    return data;
  } catch (error) {
    console.log(error);
    return new Error(`Internal server Error (cloudinary)`);
  }
};

module.exports = {
  cloudinaryUploadMultiple,
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
  cloudinaryRemoveMultipleImage,
};
