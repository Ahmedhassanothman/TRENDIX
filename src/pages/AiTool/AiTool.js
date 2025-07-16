import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { motion } from 'framer-motion';
import { FiUploadCloud, FiUpload, FiX } from 'react-icons/fi';
import { BsImage, BsCheck2Circle } from 'react-icons/bs';
import { RiComputerLine } from 'react-icons/ri';
import { XMarkIcon } from '@heroicons/react/24/outline';

const AiTool = () => {
  const [activeTool, setActiveTool] = useState('virtual-try-on');
  const [outfitImage, setOutfitImage] = useState(null);
  const [personalImage, setPersonalImage] = useState(null);
  const [virtualTryOnPrompt, setVirtualTryOnPrompt] = useState('');
  const [virtualTryOnResult, setVirtualTryOnResult] = useState(null);
  const [textToImagePrompt, setTextToImagePrompt] = useState('');
  const [textToImageResult, setTextToImageResult] = useState(null);
  const [avatarPrompt, setAvatarPrompt] = useState('');
  const [avatarResult, setAvatarResult] = useState(null);
  const [baseImage, setBaseImage] = useState(null);
  const [imageToImagePrompt, setImageToImagePrompt] = useState('');
  const [imageToImageResult, setImageToImageResult] = useState(null);
  const [isDragging, setIsDragging] = useState({ outfit: false, personal: false, base: false });
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ outfit: 0, personal: 0, base: 0 });
  const outfitInputRef = useRef(null);
  const personalInputRef = useRef(null);
  const baseInputRef = useRef(null);
  const location = useLocation();
  const prevLocation = location.state?.data;
  const initialTool = location.state?.initialTool;
  const [showResultModal, setShowResultModal] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');
  const [textToImageProgress, setTextToImageProgress] = useState(0);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Effect to set outfit image if passed in location state
  useEffect(() => {
    if (location.state?.outfitImage) {
      setOutfitImage(location.state.outfitImage);
    }
    // Set initial tool if passed in location state
    if (initialTool) {
      setActiveTool(initialTool);
    }
  }, [location.state, initialTool]);

  const handleUploadClick = (type) => {
    if (type === 'outfit') {
      outfitInputRef.current.click();
    } else if (type === 'personal') {
      personalInputRef.current.click();
    } else if (type === 'base') {
       baseInputRef.current.click();
    }
  };

  const handleFileChange = (event, type) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadstart = () => setUploadProgress(prev => ({ ...prev, [type]: 0 }));
      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          setUploadProgress(prev => ({
            ...prev,
            [type]: (e.loaded / e.total) * 100
          }));
        }
      };
      reader.onload = (e) => {
        if (type === 'outfit') {
          setOutfitImage(e.target.result);
        } else if (type === 'personal') {
          setPersonalImage(e.target.result);
        } else if (type === 'base') {
           setBaseImage(e.target.result);
        }
        setUploadProgress(prev => ({ ...prev, [type]: 100 }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e, type) => {
    e.preventDefault();
    setIsDragging(prev => ({ ...prev, [type]: true }));
  };

  const handleDragLeave = (e, type) => {
    e.preventDefault();
    setIsDragging(prev => ({ ...prev, [type]: false }));
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    setIsDragging(prev => ({ ...prev, [type]: false }));
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
         if (type === 'outfit') {
          setOutfitImage(e.target.result);
        } else if (type === 'personal') {
          setPersonalImage(e.target.result);
        } else if (type === 'base') {
           setBaseImage(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const optimizeImage = async (base64Image, maxWidth = 1024) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // حساب الأبعاد الجديدة مع الحفاظ على النسبة
        if (width > maxWidth) {
          height = (maxWidth * height) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // تحويل إلى blob بجودة عالية
        canvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/jpeg', 0.95);
      };
      img.src = base64Image;
    });
  };

  const handleVirtualTryOnSubmit = async () => {
    if (!outfitImage || !personalImage || !virtualTryOnPrompt) return;
    setIsProcessing(true);
    try {
      console.log('Starting submission process...');
      const formData = new FormData();
      
      // Convert images from base64 to files
      const clothesBlob = await fetch(outfitImage).then(r => r.blob());
      const personBlob = await fetch(personalImage).then(r => r.blob());
      
      // Create files from blobs
      const clothesFile = new File([clothesBlob], 'clothes.jpg', { type: 'image/jpeg' });
      const personFile = new File([personBlob], 'person.jpg', { type: 'image/jpeg' });
      
      // Add files to FormData
      formData.append('clothes', clothesFile);
      formData.append('person', personFile);
      formData.append('prompt', virtualTryOnPrompt);

      console.log('Data prepared, sending request...');
      
      // Add timeout to the fetch request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 200000); // 50 second timeout

      const response = await fetch('http://localhost:5000/generate-fashion-image', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
        },
      });

      clearTimeout(timeoutId);

      console.log('Server response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.text();
        console.error('Error response:', errorData);
        throw new Error(errorData || 'Failed to generate virtual try-on image');
      }

      const data = await response.json();
      console.log('Received data:', data);
      
      if (!data.image_url) {
        console.error('No image URL in response');
        throw new Error('No image URL received in response');
      }

      setVirtualTryOnResult(data.image_url);
      console.log('Image URL set successfully');
    } catch (error) {
      console.error('Virtual try-on error:', error);
      if (error.name === 'AbortError') {
        alert('Request timed out. Please try again.');
      } else if (error.message.includes('Failed to fetch')) {
        alert('Unable to connect to the server. Please check if the server is running and try again.');
      } else {
        alert(error.message || 'An error occurred while processing the images. Please try again.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTextToImageSubmit = async () => {
    if (!textToImagePrompt) return;
    setIsProcessing(true);
    try {
      console.log('إرسال الطلب...', { prompt: textToImagePrompt });
      
      const response = await fetch('http://localhost:5000/generate-text-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: textToImagePrompt
        })
      });

      const data = await response.json();
      console.log('الاستجابة:', data);

      if (!response.ok) {
        throw new Error(data.error || 'فشل في إنشاء الصورة');
      }

      if (!data.image_url) {
        throw new Error('لم يتم استلام رابط الصورة');
      }

      setTextToImageResult(data.image_url);
    } catch (error) {
      console.error('خطأ:', error);
      alert(error.message || 'حدث خطأ أثناء إنشاء الصورة. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAvatarSubmit = async () => {
    console.log('Attempting to generate avatar...');
    if (!personalImage) {
      alert('Please upload a personal image.');
      console.error('Error: Personal image is missing.');
      return;
    }
    if (!avatarPrompt) {
      alert('Please enter an avatar description (prompt).');
      console.error('Error: Avatar prompt is missing.');
      return;
    }

    setIsProcessing(true);
    try {
      console.log('Image and prompt are present. Proceeding with submission.');
      console.log('Starting submission process...');
      console.log('Image type:', typeof personalImage);
      console.log('Image length:', personalImage.length);
      console.log('Prompt:', avatarPrompt);

      const formData = new FormData();
      
      // Convert base64 image to Blob
      const base64Data = personalImage.split(',')[1];
      const byteCharacters = atob(base64Data);
      const byteArrays = [];
      
      for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);
        
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }
      
      const blob = new Blob(byteArrays, { type: 'image/jpeg' }); // Assuming JPEG type
      const file = new File([blob], 'face.jpg', { type: 'image/jpeg' });
      
      formData.append('face', file);
      formData.append('prompt', avatarPrompt);

      console.log('FormData prepared. Submitting...');
      const response = await fetch('http://localhost:5000/generate-avatar', {
        method: 'POST',
        body: formData
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response from server:', errorText);
        throw new Error(`Failed to generate avatar: ${errorText}`);
      }

      const data = await response.json();
      console.log('Received data:', data);
      
      if (!data.image_url) {
        console.error('Image URL not found in response data:', data);
        throw new Error('Image URL not found in response');
      }

      setAvatarResult(data.image_url);
      console.log('Image URL set successfully.');
    } catch (error) {
      console.error('Error generating avatar:', error);
      alert(error.message || 'An error occurred while processing the image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImageToImageSubmit = async () => {
    if (!baseImage || !imageToImagePrompt) {
      alert('يرجى تحميل الصورة وإدخال وصف الصورة');
      return;
    }

    setIsProcessing(true);
    try {
      console.log('بدء عملية الإرسال...');
      console.log('نوع الصورة:', typeof baseImage);
      console.log('طول الصورة:', baseImage.length);
      console.log('البرومبت:', imageToImagePrompt);

      const formData = new FormData();
      
      // تحويل الصورة من base64 إلى blob
      const base64Data = baseImage.split(',')[1];
      const byteCharacters = atob(base64Data);
      const byteArrays = [];
      
      for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);
        
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }
      
      const blob = new Blob(byteArrays, { type: 'image/jpeg' });
      const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
      
      formData.append('image', file);
      formData.append('prompt', imageToImagePrompt);

      console.log('تم تجهيز البيانات، جاري الإرسال...');
      const response = await fetch('http://localhost:5000/generate-img2img', {
        method: 'POST',
        body: formData
      });

      console.log('حالة الاستجابة:', response.status);
      console.log('نوع الاستجابة:', response.type);

      if (!response.ok) {
        const errorData = await response.text();
        console.error('تفاصيل الخطأ:', errorData);
        throw new Error(`فشل في إنشاء الصورة: ${errorData}`);
      }

      const data = await response.json();
      console.log('البيانات المستلمة:', data);
      
      if (!data.image_url) {
        console.error('الاستجابة الكاملة:', data);
        throw new Error('لم يتم العثور على رابط الصورة في الاستجابة');
      }

      setImageToImageResult(data.image_url);
      console.log('تم تعيين رابط الصورة بنجاح');
    } catch (error) {
      console.error('خطأ في إنشاء الصورة:', error);
      console.error('تفاصيل الخطأ:', error.stack);
      alert(error.message || 'حدث خطأ أثناء معالجة الصور. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClearOutfitImage = () => setOutfitImage(null);
  const handleClearPersonalImage = () => setPersonalImage(null);
  const handleClearBaseImage = () => setBaseImage(null);

  const closeModal = () => {
    setShowResultModal(false);
    setModalImageUrl('');
  };

  const renderVirtualTryOnTool = () => (
    <motion.div
      key="virtual-try-on"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white rounded-lg shadow-xl"
    >
      <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Virtual Try-On</h2>

      {/* Main content area with conditional layout */}
      <div className={`flex flex-col lg:flex-row gap-8 ${virtualTryOnResult ? '' : 'max-w-4xl mx-auto'}`}>
        {/* Left Panel: Inputs */}
        <div className={`flex-1 ${virtualTryOnResult ? 'lg:max-w-sm' : ''}`}>
          <div className="mb-6">
            <label htmlFor="virtual-try-on-prompt" className="block text-lg font-semibold text-gray-700 mb-2">Prompt</label>
            <textarea
              id="virtual-try-on-prompt"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 focus:border-transparent shadow-sm"
              placeholder="Describe the desired look or style..."
              value={virtualTryOnPrompt}
              onChange={(e) => setVirtualTryOnPrompt(e.target.value)}
            ></textarea>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div
              className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 ${isDragging.outfit ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 bg-gray-50'}`}
              onDragOver={(e) => handleDragOver(e, 'outfit')}
              onDragLeave={(e) => handleDragLeave(e, 'outfit')}
              onDrop={(e) => handleDrop(e, 'outfit')}
              onClick={() => handleUploadClick('outfit')}
            >
              <input
                type="file"
                ref={outfitInputRef}
                onChange={(e) => handleFileChange(e, 'outfit')}
                accept="image/*"
                className="hidden"
              />
              {!outfitImage ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                  <motion.div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center" whileHover={{ scale: 1.1, rotate: 180 }} transition={{ duration: 0.5 }}><FiUploadCloud className="w-8 h-8 text-blue-500" /></motion.div>
                  <div className="space-y-1"><h3 className="text-lg font-semibold text-gray-700">Upload Outfit Image</h3><p className="text-gray-500 text-sm">Drag & Drop or Click to Upload</p><p className="text-gray-500 text-xs">(JPG, JPEG, PNG)</p></div>
                </motion.div>
              ) : (
                <div className="relative w-full h-full">
                  <img src={outfitImage} alt="Outfit" className="w-full h-full object-contain rounded-lg"/>
                  <button onClick={handleClearOutfitImage} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"><XMarkIcon className="h-4 w-4" /></button>
                </div>
              )}
            </div>
            <div
              className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 ${isDragging.personal ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 bg-gray-50'}`}
              onDragOver={(e) => handleDragOver(e, 'personal')}
              onDragLeave={(e) => handleDragLeave(e, 'personal')}
              onDrop={(e) => handleDrop(e, 'personal')}
              onClick={() => handleUploadClick('personal')}
            >
              <input
                type="file"
                ref={personalInputRef}
                onChange={(e) => handleFileChange(e, 'personal')}
                accept="image/*"
                className="hidden"
              />
              {!personalImage ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                  <motion.div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center" whileHover={{ scale: 1.1, rotate: 180 }} transition={{ duration: 0.5 }}><FiUploadCloud className="w-8 h-8 text-blue-500" /></motion.div>
                  <div className="space-y-1"><h3 className="text-lg font-semibold text-gray-700">Upload Your Photo</h3><p className="text-gray-500 text-sm">Drag & Drop or Click to Upload</p><p className="text-gray-500 text-xs">(JPG, JPEG, PNG)</p></div>
                </motion.div>
              ) : (
                <div className="relative w-full h-full">
                  <img src={personalImage} alt="Personal" className="w-full h-full object-contain rounded-lg"/>
                  <button onClick={handleClearPersonalImage} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"><XMarkIcon className="h-4 w-4" /></button>
                </div>
              )}
            </div>
          </div>
          {outfitImage && personalImage && virtualTryOnPrompt && !isProcessing && !virtualTryOnResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mt-8"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleVirtualTryOnSubmit}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Try On Outfit'}
              </motion.button>
            </motion.div>
          )}
           {isProcessing && activeTool === 'virtual-try-on' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-8 flex flex-col items-center"
            >
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
              <p className="text-gray-700">Processing image...</p>
            </motion.div>
          )}
        </div>

        {/* Right Panel: Result */}
        {virtualTryOnResult && !isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1"
          >
            <p className="text-lg font-semibold mb-4 text-center lg:text-left">Result:</p>
            <div className="relative w-full max-w-2xl lg:max-w-3xl h-auto rounded-lg overflow-hidden shadow-xl bg-gray-100">
              <img
                src={virtualTryOnResult}
                alt="Virtual Try-On Result"
                className="w-full h-auto object-contain"
              />
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                <button
                  onClick={() => {
                    setModalImageUrl(virtualTryOnResult);
                    setShowResultModal(true);
                  }}
                  className="px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full font-semibold shadow-lg hover:bg-white transition-colors flex items-center gap-1"
                >
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                     <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                   </svg>
                   View Full Size
                </button>
                <button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = virtualTryOnResult;
                    link.download = 'virtual-try-on-result.jpg';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-full font-semibold shadow-lg hover:bg-blue-700 transition-colors flex items-center gap-1"
                >
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                     <path strokeLinecap="round" strokeLinejoin="round" d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                   </svg>
                   Download
                </button>
                <button
                  onClick={() => setVirtualTryOnResult(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full font-semibold shadow-lg hover:bg-gray-300 transition-colors flex items-center gap-1"
                >
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456-.45a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.141-2.043-2.242H10.51c-1.134.101-2.043 1.162-2.043 2.332v.917m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                   </svg>
                   Clear
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );

  const renderTextToImageTool = () => (
    <motion.div
      key="text-to-image"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl"
    >
      <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Text to Image</h2>

      <div className="mb-6">
        <label htmlFor="text-to-image-prompt" className="block text-lg font-semibold text-gray-700 mb-2">Enter your prompt:</label>
        <textarea
          id="text-to-image-prompt"
          rows="4"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 focus:border-transparent shadow-sm"
          placeholder="e.g., A futuristic city at sunset, digital art"
          value={textToImagePrompt}
          onChange={(e) => setTextToImagePrompt(e.target.value)}
        ></textarea>
      </div>

      {!textToImageResult && !isProcessing && (
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           className="text-center"
         >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleTextToImageSubmit}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
               disabled={isProcessing || !textToImagePrompt}
            >
               {isProcessing ? 'Processing...' : 'Generate Image'}
            </motion.button>
         </motion.div>
      )}

       {isProcessing && activeTool === 'text-to-image' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-8 flex flex-col items-center"
        >
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-gray-700 mb-2">Generating image...</p>
          <div className="w-full max-w-xs mx-auto">
            <div className="bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${textToImageProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-1">{textToImageProgress}%</p>
          </div>
        </motion.div>
      )}

      {textToImageResult && !isProcessing && (
         <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mt-8"
        >
          <p className="text-lg font-semibold mb-4">Result:</p>
          <button 
            onClick={() => {
               setModalImageUrl(textToImageResult);
               setShowResultModal(true);
            }}
            className="text-blue-600 underline text-xl hover:text-blue-800 transition-colors"
          >
            View Result Image
          </button>
           <button
            onClick={() => setTextToImageResult(null)}
            className="ml-4 px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-300 transition-colors"
          >
            Clear Result
          </button>
        </motion.div>
      )}
    </motion.div>
  );

  const renderAvatarGeneratorTool = () => (
    <motion.div
      key="avatar-generator"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-xl"
    >
      <h2 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Avatar Generator</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section: Image Upload */}
        <div className="flex flex-col items-center space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Picture</h3>
          <div
            className={`relative w-64 h-64 border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all duration-300 overflow-hidden ${
              isDragging.personal ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 bg-gray-50'
            }`}
            onDragOver={(e) => handleDragOver(e, 'personal')}
            onDragLeave={(e) => handleDragLeave(e, 'personal')}
            onDrop={(e) => handleDrop(e, 'personal')}
            onClick={() => handleUploadClick('personal')}
          >
            <input
              type="file"
              ref={personalInputRef}
              onChange={(e) => handleFileChange(e, 'personal')}
              accept="image/*"
              className="hidden"
            />
            {!personalImage ? (
              <div className="flex flex-col items-center justify-center h-full">
                <FiUploadCloud className="w-12 h-12 text-gray-400 mb-2" />
                <p className="text-gray-500 text-sm">Click to replace or drop a new image</p>
              </div>
            ) : (
              <div className="relative w-full h-full">
                <img
                  src={personalImage}
                  alt="Uploaded"
                  className="w-full h-full object-contain rounded-lg"
                />
                <button
                  onClick={handleClearPersonalImage}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Middle Section: Prompt and Controls */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Prompt</h3>
          <textarea
            rows="10"
            className="flex-grow w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 focus:border-transparent shadow-sm"
            placeholder="prompt: pretty woman wear t-shirt"
            value={avatarPrompt}
            onChange={(e) => setAvatarPrompt(e.target.value)}
          ></textarea>

          <div className="flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAvatarSubmit}
              className="px-8 py-3 bg-blue-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isProcessing || !personalImage || !avatarPrompt}
            >
              {isProcessing ? 'Generating...' : 'Generate'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setPersonalImage(null); setAvatarPrompt(''); setAvatarResult(null); }}
              className="px-8 py-3 bg-gray-300 text-gray-800 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={isProcessing}
            >
              Reset
            </motion.button>
          </div>
        </div>

        {/* Right Section: Result */}
        <div className="flex flex-col items-center space-y-4">
           <h3 className="text-lg font-semibold text-gray-700">Result</h3>
           <div className="relative w-64 h-64 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center overflow-hidden flex items-center justify-center bg-gray-50">
             {isProcessing && activeTool === 'avatar-generator' ? (
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
             ) : avatarResult ? (
                <img
                   src={avatarResult}
                   alt="Generated Avatar"
                   className="w-full h-full object-contain rounded-lg"
                />
             ) : (
                <BsImage className="w-12 h-12 text-gray-400" />
             )}
           </div>
           {avatarResult && (
              <button
                 onClick={() => {
                    setModalImageUrl(avatarResult);
                    setShowResultModal(true);
                 }}
                 className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                 View Result Image
              </button>
           )}
        </div>
      </div>

      {/* Optional: Processing Indicator outside grid if needed */}
      {/* <div className="mt-8 text-center">
        {isProcessing && activeTool === 'avatar-generator' && (
          <p className="text-gray-700">Generating avatar...</p>
        )}
      </div> */}
    </motion.div>
  );

  const renderImageToImageTool = () => (
     <motion.div
      key="image-to-image"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl"
    >
      <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Image to Image</h2>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
         <div
            className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 ${
              isDragging.base ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 bg-gray-50'
            }`}
            onDragOver={(e) => handleDragOver(e, 'base')}
            onDragLeave={(e) => handleDragLeave(e, 'base')}
            onDrop={(e) => handleDrop(e, 'base')}
            onClick={() => handleUploadClick('base')}
          >
            <input
              type="file"
              ref={baseInputRef}
              onChange={(e) => handleFileChange(e, 'base')}
              accept="image/*"
              className="hidden"
            />
            
            <div className="flex flex-col items-center justify-center h-full">
              {!baseImage ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-3"
                >
                  <motion.div 
                    className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 180 }}
                    transition={{ duration: 0.5 }}
                  >
                    <FiUploadCloud className="w-8 h-8 text-blue-500" />
                  </motion.div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-gray-700">
                      Upload Base Image
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Drag & Drop or Click to Upload
                    </p>
                     <p className="text-gray-500 text-xs">
                      (JPG, JPEG, PNG)
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div className="relative w-full h-full">
                  <img 
                    src={baseImage} 
                    alt="Base" 
                    className="w-full h-full object-contain rounded-lg"
                  />
                  <button
                    onClick={handleClearBaseImage}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="image-to-image-prompt" className="block text-lg font-semibold text-gray-700 mb-2">Enter your prompt:</label>
            <textarea
              id="image-to-image-prompt"
              rows="4"
              className="w-full flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 focus:border-transparent shadow-sm"
              placeholder="e.g., Change the style to oil painting"
              value={imageToImagePrompt}
              onChange={(e) => setImageToImagePrompt(e.target.value)}
            ></textarea>
          </div>
       </div>
       
       {((baseImage || imageToImagePrompt) && !isProcessing && !imageToImageResult) && (
          <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           className="text-center"
         >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleImageToImageSubmit}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
             disabled={isProcessing || (!baseImage && !imageToImagePrompt)}
          >
             {isProcessing ? 'Processing...' : 'Generate Image'}
          </motion.button>
         </motion.div>
       )}

        {isProcessing && activeTool === 'image-to-image' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-8 flex flex-col items-center"
        >
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-gray-700">Generating image...</p>
        </motion.div>
      )}

      {imageToImageResult && !isProcessing && (
         <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mt-8"
        >
          <p className="text-lg font-semibold mb-4">Result:</p>
          <button 
             onClick={() => {
               setModalImageUrl(imageToImageResult);
               setShowResultModal(true);
            }}
            className="text-blue-600 underline text-xl hover:text-blue-800 transition-colors"
          >
            View Result Image
          </button>
           <button
            onClick={() => setImageToImageResult(null)}
            className="ml-4 px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-300 transition-colors"
          >
            Clear Result
          </button>
        </motion.div>
      )}
    </motion.div>
  );

  const renderTool = () => {
    switch (activeTool) {
      case 'virtual-try-on':
        return renderVirtualTryOnTool();
      case 'text-to-image':
        return renderTextToImageTool();
      case 'avatar-generator':
        return renderAvatarGeneratorTool();
      case 'image-to-image':
        return renderImageToImageTool();
      default:
        return renderVirtualTryOnTool();
    }
  };

  return (
    <div className="px-4">
      <Breadcrumbs title="AI Tools" prevLocation={prevLocation} />
      
      <div className="my-10">
        <div className="flex justify-center mb-12 space-x-6 md:space-x-10 flex-wrap border-b border-gray-200">
          <motion.button 
            whileHover={{ color: '#374151' }}
            transition={{ duration: 0.2 }}
            className={`text-lg md:text-xl font-semibold py-2 -mb-px transition-colors duration-300 focus:outline-none ${activeTool === 'virtual-try-on' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTool('virtual-try-on')}
          >
            Virtual Try-On
          </motion.button>
          <motion.button 
            whileHover={{ color: '#374151' }}
            transition={{ duration: 0.2 }}
            className={`text-lg md:text-xl font-semibold py-2 -mb-px transition-colors duration-300 focus:outline-none ${activeTool === 'text-to-image' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTool('text-to-image')}
          >
            Text to Image
          </motion.button>
          <motion.button 
            whileHover={{ color: '#374151' }}
            transition={{ duration: 0.2 }}
            className={`text-lg md:text-xl font-semibold py-2 -mb-px transition-colors duration-300 focus:outline-none ${activeTool === 'avatar-generator' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTool('avatar-generator')}
          >
            Avatar Generator
          </motion.button>
          <motion.button 
            whileHover={{ color: '#374151' }}
            transition={{ duration: 0.2 }}
            className={`text-lg md:text-xl font-semibold py-2 -mb-px transition-colors duration-300 focus:outline-none ${activeTool === 'image-to-image' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTool('image-to-image')}
          >
            Image to Image
          </motion.button>
          <motion.button
            whileHover={{ color: '#374151' }}
            transition={{ duration: 0.2 }}
            className={`text-lg md:text-xl font-semibold py-2 -mb-px transition-colors duration-300 focus:outline-none ${activeTool === 'chat-recommendation' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTool('chat-recommendation')}
          >
           
          </motion.button>
        </div>

        {renderTool()}
      </div>

      {showResultModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white rounded-lg p-6 max-w-2xl max-h-[90vh] overflow-auto"
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            <img src={modalImageUrl} alt="Result" className="max-w-full max-h-full object-contain mx-auto" />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AiTool; 