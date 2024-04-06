import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Device } from "../interfaces/Device";
import moment from "moment-timezone";

function getStatus(device: Device) {
    let status = "Offline";
    // Check if device.last_seen is filled in and if it is less than 5 minutes ago
    // console.log("last_seen: ", device.last_seen);
    if (
        device.last_seen &&
        moment.utc(device.last_seen).unix() * 1000 >= moment.now() - 5 * 60000
    ) {
        status = "Online";
    }
    return status;
}

function formatDate(device: Device) {
    let formattedDate = "";
    console.log("device.last_seen: ", device.last_seen);

    // Format date
    if (device.last_seen) {
        const date = moment.utc(device.last_seen);
        date.tz("Europe/Brussels");
        formattedDate = date.format("DD-MM-yyyy HH:mm");
    }

    return formattedDate;
}

function DevicesList() {
    const [devices, setDevices] = useState([] as Device[]);
    const [status, setStatus] = useState("Offline");
    const [lastSeen, setLastSeen] = useState("");

    useEffect(() => {
        function getDevices() {
            axios
                .get(import.meta.env.VITE_API_URL + "/devices")
                .then((response) => {
                    // TODO: Some error handling here
                    setDevices(response.data);
                    setStatus(getStatus(response.data[0]));
                    setLastSeen(formatDate(response.data[0]));
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        getDevices();

        // Update every 5 seconds
        setInterval(() => {
            getDevices();
        }, 5000);
    }, []);

    return (
        <div className="flex flex-col justify-center overflow-x-auto">
            <h3 className="text-2xl font-medium text-center mt-5 mb-2">
                Devices
            </h3>
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm font-light">
                        <thead className="border-b font-medium dark:border-neutral-500">
                            <tr>
                                <th scope="col" className="px-6 py-4">
                                    #
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    IP
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    MAC
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    LED's
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Last Seen
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {devices.map((device, index) => {
                                return (
                                    <tr
                                        className="border-b dark:border-neutral-500 font-medium"
                                        key={device.id}
                                    >
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                                            {index + 1}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            {device.name}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            {device.ip_address}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            {device.mac_address}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            {device.led_count}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            {status}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            {lastSeen}
                                        </td>
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
        axios
            .post(import.meta.env.VITE_API_URL + "/testMQTT")
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
            <button onClick={testMQTT}>TEST MQTT</button>
        </div>
    );
}

export default Info;
