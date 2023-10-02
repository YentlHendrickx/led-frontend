// Colors.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import AddColorForm from "../components/AddColorForm";

interface Color {
  id: number;
  name: string;
  color: string;
}

const Colors: React.FC = () => {
  const [colors, setColors] = useState<Color[]>([]);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;
    axios
      .get(`${API_URL}/colors`)
      .then((response) => {
        setColors(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleAddColor = (name: string, color: string) => {
    console.log(name, color);
    const randomId = Math.floor(Math.random() * 1000);
    const newColorObj: Color = {
      id: randomId,
      name: name,
      color: color,
    };

    setColors([...colors, newColorObj]);
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
            <li key={color.id}>
              <div
                style={{ backgroundColor: color.color }}
                className="color-box"
              ></div>
              <span>{color.name}</span>
              <button onClick={() => handleDeleteColor(color.id)}>
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
