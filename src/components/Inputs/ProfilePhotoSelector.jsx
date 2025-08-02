import { Trash, Upload, User } from "lucide-react";
import { useRef, useState } from "react";

function ProfilePhotoSelector({ image, setImage, preview, setPreview }) {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);

      const preview = URL.createObjectURL(file);
      if (setPreview) {
        setPreview(preview);
      }
      setPreviewUrl(preview);
    }
  };

  const handleImageRemove = () => {
    setImage(null);
    setPreviewUrl(null);

    if (setPreview) {
      setPreview(null);
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        className="hidden"
        onChange={handleImageChange}
      />

      {!image && (
        <div className="w-20 h-20 relative flex items-center justify-center bg-orange-50 rounded-full cursor-pointer">
          <User size="80" className="text-orange-500 p-4" />
          <button type="button" onClick={onChooseFile} className="w-8 h-8 flex justify-center items-center absolute -bottom-1 -right-1 text-white bg-linear-to-r from-orange-500/85 to-orange-500 cursor-pointer rounded-full" >
            <Upload className="p-1"  />
          </button>
        </div>
      )}

      {image && (
        <div className="relative">
          <img src={preview || previewUrl} alt="Profile Photo" className="w-20 h-20 rounded-full object-cover" />
          <button type="button" onClick={handleImageRemove} className="w-8 h-8 flex justify-center items-center absolute -bottom-1 -right-1 text-white bg-red-500 cursor-pointer rounded-full">
            <Trash />
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfilePhotoSelector;
