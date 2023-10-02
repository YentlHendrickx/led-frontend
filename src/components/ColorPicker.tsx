// ColorPicker.tsx
import React, { useState } from "react";
import { SketchPicker } from "react-color";

interface ColorPickerProps {
  onColorChange: (color: string) => void;
  isOpen: boolean; // Prop to control visibility
  onClose: () => void; // Callback to close the color picker
  color: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  onColorChange,
  isOpen,
  onClose,
  color,
}) => {
  const handleChange = (newColor: any) => {
    const colorHex = `rgba(${newColor.rgb.r},${newColor.rgb.g},${newColor.rgb.b},${newColor.rgb.a})`;
    onColorChange(colorHex);
  };

  return (
    <>
      {isOpen && (
        <div className="absolute z-10">
          <div className="fixed inset-0" onClick={onClose}></div>
          <SketchPicker color={color} onChange={handleChange} />
        </div>
      )}
    </>
  );
};

export default ColorPicker;
