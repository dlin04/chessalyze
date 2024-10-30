interface LoadingModalProps {
  isOpen: boolean;
}

export const LoadingModal: React.FC<LoadingModalProps> = ({ isOpen }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded shadow-md">
        <h2>Loading...</h2>
        <p>Your game is being analyzed. Please wait.</p>
      </div>
    </div>
  );
};
