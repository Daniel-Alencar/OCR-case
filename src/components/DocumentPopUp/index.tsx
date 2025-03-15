'use client';

import UploadDocument from "@/components/UploadDocument";
import { AiOutlineClose } from "react-icons/ai";


interface PopUpProps {
  title: string;
  ref: any;
  setShowPopUp: any;
}

export default function DocumentPopUp({
  title,
  ref,
  setShowPopUp
}: PopUpProps) {

  const handleToClosePopUp = () => {
    setShowPopUp(false);
  }

  return (
    <div className="z-10 h-full w-full bg-black bg-opacity-60 fixed right-0 top-0 flex justify-center items-center">
      <div
        ref={ref}
        className="z-20 border-0 border-transparent rounded-lg bg-white w-[500px] p-5 flex flex-col justify-between shadow-lg"
      >
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-bold">{title}</h4>
          <button
            onClick={handleToClosePopUp}
            className="p-2 rounded-full hover:bg-gray-200 transition duration-300"
          >
            <AiOutlineClose className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <div className="max-h-80 flex flex-col gap-3 overflow-y-auto">
          <UploadDocument />
        </div>
      </div>
    </div>
  );
  
}
