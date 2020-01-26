import React, { useState, useEffect, useRef } from 'react'
import { resolve } from 'dns';

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

    const noteOne = useRef();

    const [oscillators, setOscillators] = useState([]);

    const onDown = (e) => {

        if(e.key === `a`){
            playTone('C4', 261.63)
        };

        if(e.key === `s`){
            console.log(`s pressed`)
        };

        if(e.key === `d`){
            console.log(`d pressed`)
        };

        if(e.key === `f`){
            console.log(`f pressed`)
        };

        if(e.key === `g`){
            console.log(`g pressed`)
        };

        if(e.key === `h`){
            console.log(`h pressed`)
        };

        if(e.key === `j`){
            console.log(`j pressed`)
        };
    }

    const onUp = (e) => {
        
        if(e.key === `a`){
            console.log('a up')
        };

        if(e.key === `s`){
            console.log(`s up`)
        };

        if(e.key === `d`){
            console.log(`d up`)
        };

        if(e.key === `f`){
            console.log(`f up`)
        };

        if(e.key === `g`){
            console.log(`g up`)
        };

        if(e.key === `h`){
            console.log(`h up`)
        };

        if(e.key === `j`){
            console.log(`j up`)
        };
    }

    useEffect(() => {
        window.addEventListener("keydown", onDown)
        window.addEventListener("keyup", onUp)

        return () => {
            window.removeEventListener("keydown", onDown)
            window.removeEventListener("keyup", onUp)
        }
    })



    const createAudioNodes = async (userContext) => {
        setInput(userContext);
        const gain = await userContext.createGain();
        const output = await userContext.destination;

        noteOne.current = userContext.createGain()

        gain.connect(output)
        setMaterGain(gain);
        setOutput(output);
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

    const playTone = async (id, freq) => {

        const nodeId = id;
        const frequency = freq;

        const oscNode = await userContext.createOscillator();
        oscNode.type = oscillatorWave;
        oscNode.frequency.value = frequency;

        const oscGain = await userContext.createGain();
        oscGain.gain.value = 0;

        const oscObj = {
            node: oscNode,
            gainNode: oscGain,
            id: nodeId
        };

        const now = userContext.currentTime;
        const attack = now + 0.2;

        setOscillators([...oscillators, oscObj])
        
        oscNode.connect(oscGain);
        oscGain.connect(masterGain);

        oscNode.start();
        oscGain.gain.linearRampToValueAtTime(1.0, attack)
    };


    const stopTone = async (e) => {

        const oscObj = await oscillators.filter(osc => osc.id === e.target.id);

        const now = userContext.currentTime;
        const release = now + 0.2;
        await oscObj[0].gainNode.gain.linearRampToValueAtTime(0.0, release);
        oscObj[0].node.stop(release);

        // oscObj[0].node.disconnect();
        // oscObj[0].gainNode.disconnect();
        oscillators.splice(oscObj[0]);
    }

    const handleWaveformChange = (e) => {
        setOscillatorWave(e.target.value)
    };

    return (
        <div>
            <h1>Dambuster</h1>
            <div >
                {!audioCTX && <button onClick={getContext}>get audio</button>}
            </div>
            <div>
                <select onChange={handleWaveformChange}>
                    {waveforms.map(wave => <option value={wave}>{wave}</option>)}
                </select>
            </div>

            <div>
                {audioCTX && cBluesScale.map(note => 
                <button key={note.note} id={note.note} value={note.frequency}
                 onMouseDown={playTone} onMouseUp={stopTone}> {note.note.slice(0, -1)}</button>)}
            </div>

        </div>
    )
};

export default Dambuster;
