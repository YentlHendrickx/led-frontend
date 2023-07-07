import { SketchPicker } from 'react-color';
import { useEffect, useState } from 'react';
import axios from 'axios';

function ColorPicker() {
    const [colorState, setColorState] = useState({
        displayColorPicker: false,
        color: {
            r: '128',
            g: '128',
            b: '128',
            a: '1',
        },
    });
    
    const handleToggle = () => {
        setColorState({...colorState, displayColorPicker: !colorState.displayColorPicker})
    };

    const handleClose = () => {
        setColorState({...colorState, displayColorPicker: false})
    };

    const handleChange = (newColor: any) => {
        setColorState({...colorState, color: newColor })
    };

    return (
        <>
            {colorState.displayColorPicker ? 
                <div className="absolute z-10"><div className="fixed inset-0" onClick={handleClose}>
                </div>
                <SketchPicker color={colorState.color} onChange={handleChange} />
                </div> : null}
        </>
    );
}


function Colors() {

    // Make an api request to the /colors endpoint using axios
    useEffect(() => {
        const API_URL = import.meta.env.VITE_API_URL;
        axios.get(`${API_URL}/colors`)
            .then((response) => {
                console.log(response.data);
            }
            ).catch((error) => {
                console.log(error);
            }
        );
    }, []);


    return (
        <div className="sm:ml-48 text-primary-text">
            <h2 className="text-4xl font-medium text-center pt-4">COLORS</h2>
            <div className='w-full flex flex-col items-center'>
                <p>Hello!</p>

                <div>
                    <ColorPicker />
                </div>
            </div>
        </div>
    );
}

export default Colors; 