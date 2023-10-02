import { useState, useEffect } from "react";
import { DeviceEffect } from "../interfaces/DeviceEffect";
import axios from "axios";

function ModeSwitcher() {
    function handleGroupChange (e: React.ChangeEvent<HTMLFormElement>) {
        const value: number = e.target.value;

        if (value == 1) {
            console.log("Grouped");
        }  else {
            console.log("Singular");
        }
    }
    return (
        <form className="mx-auto mt-5 grid w-1/3 grid-cols-2 gap-2 rounded-xl bg-primary p-2" onChange={handleGroupChange}>
            <div>
                <input type="radio" name="groupMode" id="groupMode1" value="1" className="peer hidden" defaultChecked />
                <label htmlFor="groupMode1" className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-accent peer-checked:text-primary-text">Grouped</label>
            </div>
            <div>
                <input type="radio" name="groupMode" id="groupMode2" value="2" className="peer hidden" />
                <label  htmlFor="groupMode2" className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-accent peer-checked:text-primary-text">Singular</label>
            </div>
        </form>
    );
}


function Overview() {
    const [deviceEffects, setDeviceEffects] = useState([] as DeviceEffect[]);

    useEffect(() => {
        const API_URL = import.meta.env.VITE_API_URL; 
        axios.get(`${API_URL}/effects/info`)
            .then((response) => {
                console.log(response.data);
                setDeviceEffects(response.data);
            }
            ).catch((error) => {
                console.log(error);
            }
        );
    }, []);


    return (
        <div className="flex flex-col justify-center overflow-x-auto">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm font-light">
                        <thead className="border-b font-medium dark:border-neutral-500">
                            <tr>
                            <th scope="col" className="px-6 py-4">#</th>
                            <th scope="col" className="px-6 py-4">Device Name</th>
                            <th scope="col" className="px-6 py-4">Effect</th>
                            <th scope="col" className="px-6 py-4">Color</th>
                            </tr>
                        </thead>
                        <tbody>
                        {deviceEffects.map((deviceEffect, index) => {
                            return (
                                <tr className="border-b dark:border-neutral-500 font-medium" key={deviceEffect.device_id}>
                                    <td className="whitespace-nowrap px-6 py-4">{index + 1}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{deviceEffect.device_name}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{deviceEffect.effect_name}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{deviceEffect.color_name}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

function Home() {
    return (
        <div className="sm:ml-48 text-primary-text">
            <h2 className="text-4xl font-medium text-center pt-4">LED CONTROLLER</h2>
            <ModeSwitcher />
            <Overview />
        </div>
    )
}

export default Home;