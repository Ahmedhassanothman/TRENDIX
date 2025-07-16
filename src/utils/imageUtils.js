// Utility functions for handling images
export const getImageUrl = (imageName) => {
  try {
    return `/photoname/${imageName}`;
  } catch (error) {
    console.error('Error loading image:', error);
    return '/photoname/placeholder.png'; // Alternative image if the original image does not exist
  }
};

// Check if the image exists
export const checkImageExists = async (imageUrl) => {
  try {
    const response = await fetch(imageUrl);
    return response.ok;
  } catch {
    return false;
  }
};

// Load image safely
export const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}; 