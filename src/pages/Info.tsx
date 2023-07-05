function LedInformation() {
    return (
        <div className="flex flex-col items-center justify-center">
            <h3 className="text-2xl font-medium text-center mt-5 mb-2">Current Information</h3>
            <div className="text-left">
                <p>Effect: LED Train</p>
                <p>Speed: 10ms</p>
                <p>Color: Red</p>
            </div>
        </div>
    );
}

function DevicesList() {
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
                    <tr>
                        <td className="border px-4 py-2">Bed</td>
                        <td className="border px-4 py-2">192.168.1.0</td>
                        <td className="border px-4 py-2">00:00:00:00:00:00</td>
                        <td className="border px-4 py-2">180</td>
                        <td className="border px-4 py-2">Online</td>
                        <td className="border px-4 py-2">2021-10-10 10:10:10</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">Bookshelf</td>
                        <td className="border px-4 py-2">192.168.1.1</td>
                        <td className="border px-4 py-2">00:00:00:00:00:01</td>
                        <td className="border px-4 py-2">180</td>
                        <td className="border px-4 py-2">Online?</td>
                        <td className="border px-4 py-2">2021-10-10 10:10:10</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">Desk</td>
                        <td className="border px-4 py-2">192.168.1.2</td>
                        <td className="border px-4 py-2">00:00:00:00:00:02</td>
                        <td className="border px-4 py-2">300</td>
                        <td className="border px-4 py-2">Offline</td>
                        <td className="border px-4 py-2">2021-10-10 10:10:10</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

function Info() {
    return (
        <div className="sm:ml-48 text-primary-text">
            <h2 className="text-4xl font-medium text-center pt-4">INFO</h2>
            <LedInformation />
            <DevicesList />
        </div>
    );
}

export default Info; 