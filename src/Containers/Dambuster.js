import React, { useState, useEffect, useRef } from 'react'

const Dambuster = () => {

    const [audioCTX, setAudioCTX] = useState(false);
    const [userContext, setUserContext] = useState();

    const cBluesScale = [
        {
            note: 'C4',
            frequency: 261.63
        },
        {
            note: 'Eb4',
            frequency: 311.13
        },
        {
            note: 'F4',
            frequency: 349.23
        },
        {
            note: 'Gb4',
            frequency: 369.99
        },
        {
            note: 'G4',
            frequency: 392.00
        },
        {
            note: 'Bb4',
            frequency: 466.16
        },
        {
            note: 'C5',
            frequency: 523.25
        },
    ]

    const waveforms = ['sine', 'square', 'sawtooth', 'triangle'];

    const [oscillatorWave, setOscillatorWave] = useState('sine');

    const [input, setInput] = useState();
    const [masterGain, setMaterGain] = useState();
    const [output, setOutput] = useState();

    const [oscillators, setOscillators] = useState([]);



    const createAudioNodes = (userContext) => {
        setInput(userContext);
        setMaterGain(userContext.createGain())
        setOutput(userContext.destination);
    }

    useEffect(() => {
        console.log(oscillatorWave)
    }, [oscillatorWave])

    useEffect(() => {
        if(!userContext){
            return;
        }
        createAudioNodes(userContext);
    }, [userContext])

    const getContext = async () => {

        const AudioContext = await window.AudioContext || window.webkitAudioContext;
        const context =  await new AudioContext();

        if(!context){
            window.alert('Current browser not supported')
            return;
        }

        setUserContext(context)
        setAudioCTX(!audioCTX)  
    };

    const playTone = async (e) => {


        const nodeId = e.target.id;
        const frequency = e.target.value

        const oscNode = await userContext.createOscillator();
        oscNode.type = oscillatorWave;
        oscNode.frequency.value = frequency;

        const oscObj = {
            node: oscNode,
            id: nodeId
        };

        setOscillators([...oscillators, oscObj])
        
        oscNode.connect(masterGain);
        masterGain.connect(output);

        oscNode.start();
    };

    const stopTone = async (e) => {

        const oscObj = await oscillators.filter(osc => osc.id === e.target.id);

        const now = userContext.currentTime;

        oscObj[0].node.stop(now);
        oscObj[0].node.disconnect(masterGain);
        oscillators.splice(oscObj[0]);
    }

    const handleWaveformChange = (e) => {
        setOscillatorWave(e.target.value)
    }


    return (
        <div>
            <h1>Dambuster</h1>
            <div>
                {!audioCTX && <button onClick={getContext}>get audio</button>}
            </div>
            <div>
                <select onChange={handleWaveformChange}>
                    {waveforms.map(wave => <option value={wave}>{wave}</option>)}
                </select>
            </div>
            <div>
                {audioCTX && cBluesScale.map(note => <button key={note.note} id={note.note} value={note.frequency} onMouseDown={playTone} onMouseUp={stopTone}> {note.note.slice(0, -1)}</button>)}
            </div>
        </div>
    )
};

export default Dambuster;
