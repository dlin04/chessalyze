interface LoadingModalProps {
  isOpen: boolean;
}

export const LoadingModal: React.FC<LoadingModalProps> = ({ isOpen }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded shadow-md text-center">
        <h2 className="mb-2 text-lg font-semibold">Loading...</h2>
        <p className="mb-4 text-sm text-gray-600">
          Your game is being analyzed. <br></br>
          On average, each position takes one second.<br></br>
          Thanks for your patience!
        </p>
        <div className="flex justify-center space-x-2">
          <div
            className="h-2 w-2 bg-gray-800 rounded-full animate-highBounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="h-2 w-2 bg-gray-800 rounded-full animate-highBounce"
            style={{ animationDelay: "0.4s" }}
          ></div>
          <div
            className="h-2 w-2 bg-gray-800 rounded-full animate-highBounce"
            style={{ animationDelay: "0.6s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};
