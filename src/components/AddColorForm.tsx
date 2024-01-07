// AddColorForm.tsx
import React, { useState } from "react";
import ColorPicker from "./ColorPicker";
import { hexToRGBA, mapBetween } from "../helpers";

interface AddColorFormProps {
  onAddColor: (name: string, color: string) => void;
}

const AddColorForm: React.FC<AddColorFormProps> = ({ onAddColor }) => {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState<boolean>(false);
  const [color, setColor] = useState<string>("#ffffff");
  const [name, setName] = useState<string>("");
  const [manualColor, setManualColor] = useState<string>("0,0,0");
  const [hideManualInput, setHideManualInput] = useState<boolean>(true);

  const handleAddColor = () => {
    // Validate input and add color to the database
    console.log(name, color);
    
    // No validation needed, color picker will always return a valid color
    if (hideManualInput) {
      if (name.trim() !== "" && color !== "") {
        onAddColor(name, color);
        setName("");
        setIsColorPickerOpen(false);
      }
    } else {
      const color = manualColor.trim();
      const split = color.split(",");
      let validatedValue: string|null = null;
      let RGBA: string[]|number[] = [-1, -1, -1, -1];
      
      if (split.length == 1) {
        // HEX
        const rgb = hexToRGBA(color) ?? [0, 0, 0, 0];
        
        let alpha: string|number = 1;
        if (rgb[3] != undefined && rgb[3] != null) {
          alpha = mapBetween(rgb[3], 0, 255, 0, 1).toPrecision(2);          
        }

        RGBA = [rgb[0], rgb[1], rgb[2], alpha as number];
      } else if (split.length == 3 || split.length == 4) {
        let red = split[0] ?? "0";
        let green = split[1] ?? "0";
        let blue = split[2] ?? "0";

        RGBA = [red, green, blue, "1"];
      } 
      
      if (RGBA[0] != -1) {
        // Clamps
        let red = Math.min(Math.max(parseInt(RGBA[0] as string) ?? 0, 0), 255);
        let green = Math.min(Math.max(parseInt(RGBA[1] as string) ?? 0, 0), 255);
        let blue = Math.min(Math.max(parseInt(RGBA[2] as string) ?? 0, 0), 255);
        let alpha = Math.min(Math.max(parseFloat(RGBA[3] as string) ?? 0.0, 0), 1);

        validatedValue = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
        
        console.log(validatedValue);
        if (validatedValue) {
          onAddColor(name, validatedValue);
          setName("");
          setManualColor("");
        }
      }
    }
  };
  
  const radioSwitch = (isPicker: boolean = false) => {
    if (isPicker) {
      setHideManualInput(true);
    } else {
      setHideManualInput(false);
    }
  };
  

  return (
    <>
      <h3 className="text-center font-bold text-lg">Add a new color</h3>
      <div className="grid grid-rows-2 w-full gap-y-2 justify-center">
        <div className="w-11/12 mx-auto grid grid-cols-7 gap-x-2 mt-2">
          <input
            className={hideManualInput ? "hidden" : "col-span-2 rounded-md h-10 p-1 text-black"}
            type="text"
            value={manualColor}
            placeholder="0,0,0,0"
            onChange={(e) => setManualColor(e.target.value)}
          />
          <div
            // className="color-box w-full h-10 rounded-md col-span-2"
            className={!hideManualInput ? "hidden" : "color-box w-full h-10 col-span-2 rounded-md"}
            style={{ backgroundColor: color }}
            onClick={() => setIsColorPickerOpen(true)}
          ></div>
          <input
            className="col-span-3 rounded-md h-10 text-black"
            type="text"
            placeholder="Color Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="col-span-2 h-10 bg-green-400 rounded-md font-bold text-white"
            onClick={handleAddColor}
          >
            Add color
          </button>
        </div>
        <div className="w-11/12 mx-auto">
          <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
            <input
              className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-accent checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-accent dark:checked:after:border-accent dark:checked:after:bg-accent dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-accent dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
              type="radio"
              name="colorRadio"
              id="colorRadio1"
              onChange={() => radioSwitch(true)}
              defaultChecked
            />
            <label
              className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
              htmlFor="colorRadio1"
            >
              Color picker
            </label>
          </div>
          <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
            <input
              className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-accent checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-accent dark:checked:after:border-accent dark:checked:after:bg-accent dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-accent dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
              type="radio"
              name="colorRadio"
              id="colorRadio2"
              onChange={() => radioSwitch(false)}
            />
            <label
              className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
              htmlFor="colorRadio2"
            >
              Manual
            </label>
          </div>
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
