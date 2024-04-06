// AddEffectForm.tsx
import React, { useState } from "react";

interface AddEffectFormProps {
    onAddEffect: (effect: Effect) => void;
}

interface Effect {
    name: string;
    description: string;
    properties: { key: string; value: string; type: string }[];
}

const AddEffectForm: React.FC<AddEffectFormProps> = ({ onAddEffect }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [properties, setProperties] = useState<
        { key: string; value: string; type: string }[]
    >([]);

    const handleAddEffect = () => {
        const effect: Effect = {
            name,
            description,
            properties,
        };
        onAddEffect(effect);
        setName("");
        setDescription("");
        setProperties([]);
    };

    const handleAddProperty = () => {
        setProperties([...properties, { key: "", value: "", type: "" }]);
    };

    const handlePropertyChange = (
        index: number,
        key: string,
        value: string,
        type: string
    ) => {
        const updatedProperties = [...properties];
        updatedProperties[index] = { key, value, type };
        setProperties(updatedProperties);
    };

    return (
        <>
            <h3 className="text-center font-bold text-lg">Add a new effect</h3>

            <div className="grid grid-rows-2 w-full gap-y-2 justify-center">
                <div className="w-11/12 mx-auto grid grid-cols-2 gap-x-2 mt-2">
                    <input
                        className="col-span-1 rounded-md h-10 text-black"
                        type="text"
                        placeholder="Effect Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        className="col-span-1 rounded-md h-10 text-black"
                        type="text"
                        placeholder="Effect Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
            </div>

            <div className="w-11/12 mx-auto mt-4">
                <h4 className="font-bold">Properties</h4>
                {properties.map((property, index) => (
                    <div key={index} className="grid grid-cols-3 gap-x-2 mt-2">
                        <input
                            className="col-span-1 rounded-md h-10 text-black"
                            type="text"
                            placeholder="Key"
                            value={property.key}
                            onChange={(e) =>
                                handlePropertyChange(
                                    index,
                                    e.target.value,
                                    property.value,
                                    property.type
                                )
                            }
                        />
                        <input
                            className="col-span-1 rounded-md h-10 text-black"
                            type="text"
                            placeholder="Value"
                            value={property.value}
                            onChange={(e) =>
                                handlePropertyChange(
                                    index,
                                    property.key,
                                    e.target.value,
                                    property.type
                                )
                            }
                        />
                        <input
                            className="col-span-1 rounded-md h-10 text-black"
                            type="text"
                            placeholder="Type"
                            value={property.type}
                            onChange={(e) =>
                                handlePropertyChange(
                                    index,
                                    property.key,
                                    property.value,
                                    e.target.value
                                )
                            }
                        />
                    </div>
                ))}
                <button className="mt-2" onClick={handleAddProperty}>
                    Add Property
                </button>
            </div>

            <button className="mt-4" onClick={handleAddEffect}>
                Add Effect
            </button>
        </>
    );
};

export default AddEffectForm;
