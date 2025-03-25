import { useDropzone } from 'react-dropzone';
import { Button } from 'components/ui/button';
import { Trash, Plus } from 'lucide-react';

interface ImageUploaderProps {
  images: string[];
  onAddImages: (newImages: string[]) => void;
  onDeleteImage: (image: string) => void;
  maxImages?: number;
}

export function ImageUploader({
  images,
  onAddImages,
  onDeleteImage,
  maxImages = 5,
}: ImageUploaderProps) {
  const onDrop = (acceptedFiles: File[]) => {
    const remainingSlots = maxImages - images.length;
    const filesToAdd = acceptedFiles.slice(0, remainingSlots);
    if (filesToAdd.length > 0) {
      const newImages = filesToAdd.map((file) => URL.createObjectURL(file));
      onAddImages(newImages);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: true,
  });

  return (
    <div className="flex flex-col gap-2 w-full mt-4">
      <label className="text-base font-semibold">Image upload</label>
      <div className="text-xs text-gray-500 mb-2">
        *.jpg *.jpeg files up to 200KB, minimum size 400x400px, with a maximum of {maxImages}{' '}
        uploads.
      </div>
      <div className="flex w-full items-center gap-4">
        {images.map((img) => (
          <div key={img} className="relative">
            <Button
              onClick={() => onDeleteImage(img)}
              variant="ghost"
              size="icon"
              className="absolute -top-2 -right-2 text-red-500 bg-white rounded-full w-6 h-6 border"
            >
              <Trash className="w-4 h-4" />
            </Button>
            <div className="border rounded-md w-32 h-12 overflow-hidden">
              <img src={img} alt="Thumbnail" className="w-full h-full object-contain" />
            </div>
          </div>
        ))}
        {images.length < maxImages && (
          <div
            {...getRootProps()}
            className="border border-dashed rounded-md w-32 h-12 flex items-center justify-center hover:bg-slate-100 cursor-pointer"
          >
            <input {...getInputProps()} />
            <Plus className="text-gray-500" />
          </div>
        )}
      </div>
    </div>
  );
}
