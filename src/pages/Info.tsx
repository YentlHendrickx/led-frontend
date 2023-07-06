import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Device } from '../interfaces/Device';
import { format } from 'date-fns'

function DevicesList() {
    const [devices, setDevices] = useState([] as Device[]);

    useEffect(() => {
        function getDevices() {
            axios.get(import.meta.env.VITE_API_URL + '/devices')
                .then((response) => {
                    setDevices(response.data);
                })
                .catch((error) => {
                    console.log(error);
                }
            );
        }

        getDevices();

        // Update every 5 seconds
        setInterval(() => {
            getDevices();
        }, 5000);
    }, []);

    return (
        <div className="flex flex-col justify-center overflow-x-auto">
            <h3 className="text-2xl font-medium text-center mt-5 mb-2">Devices</h3>
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm font-light">
                        <thead className="border-b font-medium dark:border-neutral-500">
                            <tr>
                                <th scope="col" className="px-6 py-4">#</th>
                                <th scope="col" className="px-6 py-4">Name</th>
                                <th scope="col" className="px-6 py-4">IP</th>
                                <th scope="col" className="px-6 py-4">MAC</th>
                                <th scope="col" className="px-6 py-4">LED's</th>
                                <th scope="col" className="px-6 py-4">Status</th>
                                <th scope="col" className="px-6 py-4">Last Seen</th>
                            </tr>
                        </thead>
                        <tbody>
                        {devices.map((device, index) => {
                            let status = "Offline"; 
                            let formattedDate = "";

                            // Check if device.last_seen is filled in and if it is less than 5 minutes ago
                            if (device.last_seen && new Date(device.last_seen) > new Date(Date.now() - 5 * 60000)) {
                                status = "Online";
                            } 

                            // Format date
                            if (device.last_seen) {
                                const date = new Date(device.last_seen);
                                formattedDate = format(date, "dd-MM-yyyy HH:mm");
                            }

                            return ( 
                                <tr className="border-b dark:border-neutral-500 font-medium" key={device.id}>
                                    <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{device.name}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{device.ip_address}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{device.mac_address}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{device.led_count}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{status}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{formattedDate}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function Info() {

    function testMQTT() {
        axios.get('http://localhost:4000/testMQTT')
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="sm:ml-48 text-primary-text">
            <h2 className="text-4xl font-medium text-center pt-4">INFO</h2>
            <DevicesList />
            <button
                onClick={testMQTT}
            >TEST MQTT</button>
        </div>
    );
}

export default Info; 