// AddEffectForm.tsx
import React, { useState } from "react";
// import { hexToRGBA, mapBetween } from "../helpers";

interface AddEffectFormProps {
    onAddEffect: (name: string) => void;
}

const AddEffectForm: React.FC<AddEffectFormProps> = ({ onAddEffect }) => {


  return (
    <>
      <h3 className="text-center font-bold text-lg">Add a new effect</h3>
      <div className="grid grid-rows-2 w-full gap-y-2 justify-center">
        <div className="w-11/12 mx-auto grid grid-cols-7 gap-x-2 mt-2">
          <input
            className="col-span-2 rounded-md h-10 p-1 text-black"
            type="text"
            // value={manualColor}
            // placeholder="0,0,0,0"
            // onChange={(e) => setManualColor(e.target.value)}
          />
          <input
            className="col-span-3 rounded-md h-10 text-black"
            type="text"
            placeholder="Color Name"
            // value={name}
            // onChange={(e) => setName(e.target.value)}
          />
          <button
            className="col-span-2 h-10 bg-green-400 rounded-md font-bold text-white"
            // onClick={handleAddColor}
          >
            Add effect
          </button>
        </div>
      </div>
    </>
  );
};

export default AddEffectForm;
