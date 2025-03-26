import Image from "next/image";
import First from "../public/toolBar/first.png";
import Last from "../public/toolBar/last.png";
import Prev from "../public/toolBar/prev.png";
import Next from "../public/toolBar/next.png";
import Swap from "../public/toolBar/swap.png";

type ToolBarProps = {
  onSwap: () => void;
  onFirst: () => void;
  onPrev: () => void;
  onNext: () => void;
  onLast: () => void;
};

export const ToolBar: React.FC<ToolBarProps> = ({
  onSwap,
  onFirst,
  onPrev,
  onNext,
  onLast,
}) => {
  return (
    <div className="flex w-full space-x-4 p-1 bg-gray-200 rounded-lg shadow-md">
      <button
        className="flex-1 flex items-center justify-center p-2 hover:bg-gray-300 rounded-lg"
        onClick={onSwap}
      >
        <Image src={Swap} alt="Swap" width={20} height={20} />
      </button>
      <button
        className="flex-1 flex items-center justify-center p-2 hover:bg-gray-300 rounded-lg"
        onClick={onFirst}
      >
        <Image src={First} alt="First" width={20} height={20} />
      </button>
      <button
        className="flex-1 flex items-center justify-center p-2 hover:bg-gray-300 rounded-lg"
        onClick={onPrev}
      >
        <Image src={Prev} alt="Previous" width={20} height={20} />
      </button>
      <button
        className="flex-1 flex items-center justify-center p-2 hover:bg-gray-300 rounded-lg"
        onClick={onNext}
      >
        <Image src={Next} alt="Next" width={20} height={20} />
      </button>
      <button
        className="flex-1 flex items-center justify-center p-2 hover:bg-gray-300 rounded-lg"
        onClick={onLast}
      >
        <Image src={Last} alt="Last" width={20} height={20} />
      </button>
    </div>
  );
};
