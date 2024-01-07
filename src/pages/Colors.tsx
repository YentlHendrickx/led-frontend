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
    const rgba = extractRGBA(color);

    const newColorObj = {
      name: name,
      rgba: `${rgba[0]},${rgba[1]},${rgba[2]},${rgba[3]}`,
    };

    const result = await axios.post(`${API_URL}/colors`, newColorObj);
    console.log(result);

    await fetchColors();
  };

  const handleDeleteColor = async (id: number) => {
    const confirm = window.confirm("Are you sure you want to delete this?");
    if (!confirm) {
      return;
    }

    const updatedColors = colors.filter((color) => color.id !== id);
    const response = await axios.delete(`${API_URL}/colors/${id}`);
    console.log(response);
    setColors(updatedColors);
  };

  return (
    <div className="sm:ml-48 text-primary-text">
      <h2 className="text-4xl font-medium text-center pt-4">COLORS</h2>
      <div className="w-full flex flex-col items-center">
        <AddColorForm onAddColor={handleAddColor} />
        <ul className="w-5/6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4">
          {colors.map((color) => (
            <li
              className="w-full py-2 grid grid-cols-12 gap-x-2 items-center justify-between"
              key={color.id}
            >
              <div
                style={{ backgroundColor: color.color }}
                className="col-span-4 h-full rounded-md"
              ></div>
              <span className="text-left col-span-4">{color.name}</span>
              <button
                className="col-span-4 bg-red-500 hover:bg-red-700 text-white font-bold p-[0.125rem] rounded"
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
