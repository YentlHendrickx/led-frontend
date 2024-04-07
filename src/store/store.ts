import { create } from "zustand";
import axios from "axios";

import { DeviceEffect } from "../interfaces/DeviceEffect";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

interface DeviceEffectStore {
    deviceEffects: DeviceEffect[];
    fetchDeviceEffects: () => void;
    changeEffectById: (deviceEffect: DeviceEffect) => void;
}

const useDeviceEffectStore = create<DeviceEffectStore>((set) => ({
    deviceEffects: [] as DeviceEffect[],
    fetchDeviceEffects: async () => {
        try {
            const response = await axios.get("/effects/info");
            set({ deviceEffects: response.data });
        } catch (error) {
            console.log(error);
        }
    },
    changeEffectById: async (deviceEffect: DeviceEffect) => {
        try {
            const response = await axios.post(
                `/device_effects/${deviceEffect.device_effect_id}`,
                {
                    effect_id: deviceEffect.effect_id,
                    device_id: deviceEffect.device_id,
                    color_id: deviceEffect.color_id,
                }
            );
            console.log(response);
            useDeviceEffectStore.getState().fetchDeviceEffects();
        } catch (error) {
            console.log(error);
        }
    },
}));

export default useDeviceEffectStore;
