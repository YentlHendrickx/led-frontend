// Colors.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import AddColorForm from "../components/AddColorForm";
import { extractRGBA } from "../helpers";

const API_URL = import.meta.env.VITE_API_URL;

interface Color {
  id: number;
  name: string;
  color: string;
}

const Colors: React.FC = () => {
  const [colors, setColors] = useState<Color[]>([]);

  useEffect(() => {
    fetchColors();
  }, []);

  const fetchColors = async () => {
    const response = await axios.get(`${API_URL}/colors`);

    const displayColors: Color[] = [];

    for (const color of response.data) {
      const colorObj = {
        id: color.id,
        name: color.name,
        color: `rgba(${color.rgba_value})`,
      };

      displayColors.push(colorObj);
    }

    setColors(displayColors);
  };

  const handleAddColor = async (name: string, color: string) => {
    // Create rgba from hex
    // const rgba = hexToRgba(color);
    console.log(color);
    const rgba = extractRGBA(color);

    const newColorObj = {
      name: name,
      rgba: `${rgba[0]},${rgba[1]},${rgba[2]},${rgba[3]}`,
    };

    const result = await axios.post(`${API_URL}/colors`, newColorObj);
    console.log(result);

    await fetchColors();
  };

  const handleDeleteColor = (id: number) => {
    const updatedColors = colors.filter((color) => color.id !== id);
    setColors(updatedColors);
  };

  return (
    <div className="sm:ml-48 text-primary-text">
      <h2 className="text-4xl font-medium text-center pt-4">COLORS</h2>
      <div className="w-full flex flex-col items-center">
        <AddColorForm onAddColor={handleAddColor} />
        <ul>
          {colors.map((color) => (
            <li
              className="w-full py-2 flex flex-row gap-x-2 items-center justify-between"
              key={color.id}
            >
              <div
                style={{ backgroundColor: color.color }}
                className="w-8 h-4 rounded-md"
              ></div>
              <span className="text-left">{color.name}</span>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold p-1 rounded"
                onClick={() => handleDeleteColor(color.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Colors;
