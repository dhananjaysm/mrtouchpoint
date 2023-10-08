interface ImageUploaderProps {
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageChange }) => {
  return (
    <div>
      <input type="file" onChange={onImageChange} />
    </div>
  );
};

export default ImageUploader;
