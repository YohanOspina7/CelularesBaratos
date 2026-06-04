import type {
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import type { ProductFormValues } from "../../../lib/validators";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useState } from "react";

interface ImagePreview {
  file?: File;
  previewUrl: string;
}

interface Props {
  setValue: UseFormSetValue<ProductFormValues>;
  watch: UseFormWatch<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
}

export const UpLoaderImages = ({ setValue, watch, errors }: Props) => {
  const [images, setImages] = useState<ImagePreview[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      }));

      const updatedImages = [...images, ...newImages];

      setImages(updatedImages);
      setValue(
        "images",
        updatedImages.map((img) => img.file || img.previewUrl),
      );
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter(
      (_: ImagePreview, i: number) => i !== index,
    );
    setImages(updatedImages);
    setValue(
      "images",
      updatedImages.map((img) => img.file || img.previewUrl),
    );
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        className="block w-full text-sm cursor-pointer text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
      />

      <div className="grid gap-4 cols-4 lg:grid-cols-2">
        {images.map((image: ImagePreview, index: number) => (
          <div key={index}>
            <div className="relative w-full h-20 p-1 border border-gray-200 rounded-md lg:h-28">
              <img
                src={image.previewUrl}
                alt={`Preview ${index}`}
                className="object-contain w-full h-full rounded-md"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute z-10 flex justify-end transition-all cursor-pointer -top-3 -right-4 hover:scale-110"
              >
                <IoIosCloseCircleOutline size={22} className="text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {errors.images && (
        <p className="mt-1 text-xs text-red-500">{errors.images?.message}</p>
      )}
    </>
  );
};
