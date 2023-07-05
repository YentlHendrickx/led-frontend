import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Device } from '../interfaces/Device';
import { format } from 'date-fns'

function DevicesList() {
    const [devices, setDevices] = useState([] as Device[]);

    useEffect(() => {
        axios.get('http://localhost:4000/devices')
            .then((response) => {
                setDevices(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="flex flex-col items-center justify-center">
            <h3 className="text-2xl font-medium text-center mt-5 mb-2">Devices</h3>
            <table className="table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">IP</th>
                        <th className="px-4 py-2">MAC</th>
                        <th className="px-4 py-2">LED's</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Last seen</th>
                    </tr>
                </thead>
                <tbody>
                    {devices.map((device) => {
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
                            <tr key={device.id}>
                                <td className="border px-4 py-2">{device.name}</td>
                                <td className="border px-4 py-2">{device.ip_address}</td>
                                <td className="border px-4 py-2">{device.mac_address}</td>
                                <td className="border px-4 py-2">{device.led_count}</td>
                                <td className="border px-4 py-2">{status}</td>
                                <td className="border px-4 py-2">{formattedDate}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

function Info() {
    return (
        <div className="sm:ml-48 text-primary-text">
            <h2 className="text-4xl font-medium text-center pt-4">INFO</h2>
            <DevicesList />
        </div>
    );
}

export default Info; 