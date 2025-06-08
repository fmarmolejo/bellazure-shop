export default function ProductName({ text, className }) {
  return (
    <h2 className={`text-center text-gray-800 text-base ${className}`}>{text}</h2>
  );
}