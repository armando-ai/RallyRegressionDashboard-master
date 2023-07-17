import React, { useEffect, useState } from 'react';
import { ImageObj } from './image-obj';

interface ImageComponentProps {
  // Add any props you may have for the component
}

const ImageComponent: React.FC<ImageComponentProps> = () => {
  const [imageUrl, setImageUrl] = useState<string>('');
   const byteData = ImageObj.byteData;

   // Convert the byte data to a Blob object
   const blob = new Blob([byteData], { type: 'image/png' });

   // Create a temporary URL for the Blob object
   const url = URL.createObjectURL(blob);
  useEffect(() => {
    // Fetch the byte data from your API call
    // Assuming the byteData variable contains your byte data

    

    // Set the URL as the image source
    setImageUrl(url);

    // Clean up the temporary URL when the component unmounts
    return () => URL.revokeObjectURL(url);
  }, []);

  //within attachments inside of an result object if count > 0 grab the ref 
  /**
  *https://rally1.rallydev.com/slm/webservice/v2.0/TestCaseResult/700451833223/Attachments
  *"_ref": "https://rally1.rallydev.com/slm/webservice/v2.0/attachment/700451833265",
  * take that ref and remove "/webservices/v2.0" 
  * 
  */

  return (
    <div>
      {imageUrl ? <img src={"https://rally1.rallydev.com/slm/attachment/700451833265"} alt="LissetImage2" /> : null}
    </div>
  );
}

export default ImageComponent;
