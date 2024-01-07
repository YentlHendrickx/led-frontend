import { DeviceEffect } from "../interfaces/DeviceEffect";
import AddEffectForm from "../components/AddEffectForm";
import { Effect } from "../interfaces/Effects";
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; 

function EffectList() {
    const [effects, setEffects] = useState([] as Effect[]);
    const [deviceEffects, setDeviceEffects] = useState([] as DeviceEffect[]);

    useEffect(() => {
        axios.get(`${API_URL}/effects`)
            .then((response) => {
                setEffects(response.data);
            }
            ).catch((error) => {
                console.log(error);
            }
        );

        axios.get(`${API_URL}/effects/info`)
            .then((response) => {
                console.log(response.data);
            }
            ).catch((error) => {
                console.log(error);
            }
        );
    }, []);

    // Return a dropdown form
    return (
        <div className="flex flex-col items-center justify-center">
            <select className="rounded-lg px-4 py-2 mt-2 mb-2 text-primary-text bg-primary border border-accent">
                {effects.map((effect) => {
                    return (
                        <option key={effect.id} value={effect.id}>{effect.name}</option>
                    );
                })}
            </select>
        </div>
    );
}

function Effects() {
    return (
        <div className="sm:ml-48 text-primary-text">
            <h2 className="text-4xl font-medium text-center pt-4">EFFECTS</h2>
            <AddEffectForm onAddEffect={() => {}} />
            <EffectList />
        </div>
    );
}

export default Effects; 