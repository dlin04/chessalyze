"use client";

// import { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: string[];
}

export const MonthModal: React.FC<ModalProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-[500px] h-[500px] rounded-lg p-4 overflow-y-auto relative">
        <button
          className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 p-1 rounded-full"
          onClick={onClose}
        >
          &times;
        </button>
        <div>
          <h2 className="text-xl font-bold mb-4">Game Archives</h2>
          <ul className="space-y-2">
            {data.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
