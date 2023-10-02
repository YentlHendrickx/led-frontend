// AddColorForm.tsx
import React, { useState } from "react";
import ColorPicker from "./ColorPicker";

interface AddColorFormProps {
  onAddColor: (name: string, color: string) => void;
}

const AddColorForm: React.FC<AddColorFormProps> = ({ onAddColor }) => {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState<boolean>(false);
  const [color, setColor] = useState<string>("#ffffff");
  const [name, setName] = useState<string>("");

  const handleAddColor = () => {
    // Validate input and add color to the database
    console.log(name, color);
    if (name.trim() !== "" && color !== "") {
      onAddColor(name, color);
      setName("");
      //   setColor("#ffffff");
      setIsColorPickerOpen(false);
    }
  };

  return (
    <>
      <h3 className="text-center font-bold text-lg">Add a new color</h3>
      <div className="grid grid-rows-2 w-full gap-y-2 justify-center">
        <div className="w-[30rem] grid grid-cols-3 gap-x-2 mt-2">
          <div
            className="color-box w-full h-10 rounded-md col-span-1"
            style={{ backgroundColor: color }}
            onClick={() => setIsColorPickerOpen(true)}
          ></div>
          <input
            className="col-span-2 rounded-md"
            type="text"
            placeholder="Color Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="w-[30rem] grid grid-cols-6">
          <input
            className="col-span-2 rounded-md h-10"
            type="text"
            placeholder="Manual Color"
          />
          <button
            className="col-start-5 h-10 col-span-2 bg-green-400 rounded-md font-bold text-white px-2"
            onClick={handleAddColor}
          >
            Add color
          </button>
        </div>
      </div>
      {isColorPickerOpen && (
        <ColorPicker
          isOpen={isColorPickerOpen}
          color={color}
          onClose={() => setIsColorPickerOpen(false)}
          onColorChange={(selectedColor) => setColor(selectedColor)}
        />
      )}
    </>
  );
};

export default AddColorForm;
