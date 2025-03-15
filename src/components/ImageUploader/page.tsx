import React, { useState } from 'react';

interface ImagePreview {
  id: string;
  src: string;
  file: File;
}

interface ImageUploaderProps {
  onImagesChange: (images: File[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImagesChange }) => {
  const [images, setImages] = useState<ImagePreview[]>([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({
      id: URL.createObjectURL(file),
      src: URL.createObjectURL(file),
      file,
    }));

    setImages((prev) => {
      const updatedImages = [...prev, ...newImages];
      // Retorna apenas os arquivos
      onImagesChange(updatedImages.map((img) => img.file)); 
      return updatedImages;
    });
  };

  const handleRemoveImage = (id: string) => {
    setImages((prev) => {
      const updatedImages = prev.filter((image) => image.id !== id);
      // Atualiza os arquivos
      onImagesChange(updatedImages.map((img) => img.file)); 
      return updatedImages;
    });
  };

  return (
    <div className="flex flex-col items-center w-full p-4 border border-gray-300 rounded-lg">
      <label
        htmlFor="image-upload"
        className="
          bg-gradient-to-r from-button-linear-1 to-button-linear-2 text-white 
          font-thin text-xs py-3 text-center rounded-lg w-full cursor-pointer
        "
      >
        Selecionar Imagens
      </label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleImageChange}
      />

      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image) => (
            <div key={image.id} className="relative group">
              <img
                src={image.src}
                alt="Preview"
                className="
                  w-32 h-32 object-cover rounded-lg border border-gray-300
                "
              />
              <button
                onClick={() => handleRemoveImage(image.id)}
                className="
                  absolute top-1 right-1 bg-red-600 
                  text-white text-sm p-1 rounded-full opacity-0 
                  group-hover:opacity-100 transition-opacity
                "
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
