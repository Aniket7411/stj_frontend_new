import React, { useRef, useState, useEffect } from "react";

const CertificateEditor = ({imageUrl}) => {
//   const [imageUrl, setImageUrl] = useState(
//     "http://res.cloudinary.com/defgskoxv/image/upload/v1741776160/STJ/wroidmjium4twv81tvpr.jpg"
//   );
  const [name, setName] = useState("John Doe");
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!imageUrl) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.crossOrigin = "anonymous"; // Prevent CORS issues
    img.src = imageUrl;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Add Name Text
      ctx.font = "20px Arial";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.marginTop="20px"
      ctx.fillText(name, canvas.width / 2, canvas.height - 100);
    };
  }, [imageUrl, name]);

  // Download Edited Certificate
  const downloadImage = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "certificate.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 mt-2"
      />
      <canvas ref={canvasRef} className="mt-4 border"></canvas>
      <button onClick={downloadImage} className="bg-green-500 text-white p-2 mt-2">
        Download Certificate
      </button>
    </div>
  );
};

export default CertificateEditor;
