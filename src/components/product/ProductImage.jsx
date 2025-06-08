export default function ProductImage({ src, alt }) {
  return (
    <div className="w-28 h-28 flex items-center justify-center bg-gray-50 rounded-xl mb-2 overflow-hidden">
      <img
        src={src}
        alt={alt}
        className="object-contain w-24 h-24"
      />
    </div>
  );
}