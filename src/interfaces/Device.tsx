export interface Device {
    id: number;
    name: string;
    ip_address: string;
    mac_address: string;
    led_count: number;
    status: string;
    last_seen: string;
    first_seen: string;
}