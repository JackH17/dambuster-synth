import React, { useState, useEffect, useRef } from 'react'
import Konva from 'konva';
import { Stage, Layer, Rect, Circle, Text } from "react-konva";
import { octaves } from '../utils/NoteFrequencies';

const Dambuster = () => {

    const [audioCTX, setAudioCTX] = useState(false);
    const [userContext, setUserContext] = useState();

    const [stageWidth, setStageWidth] = useState(window.innerWidth);
    const [stageHeight, setStageHeight] = useState(window.innerHeight);

    const [octaveSet, setOctaveSet] = useState(4);
    const currentOctave = useRef();

    const [cPressed, setCPressed] = useState(false);
    const [dPressed, setDPressed] = useState(false);
    const [ePressed, setEPressed] = useState(false);
    const [fPressed, setFPressed] = useState(false);
    const [gPressed, setGPressed] = useState(false);
    const [aPressed, setAPressed] = useState(false);
    const [bPressed, setBPressed] = useState(false);

    const [cSharpPressed, setCSharpPressed] = useState(false);
    const [eFlatPressed, setEFlatPressed] = useState(false);
    const [fSharpPressed, setFSharpPressed] = useState(false);
    const [gSharpPressed, setGSharpPressed] = useState(false);
    const [bFlatPressed, setBFlatPressed] = useState(false);

    const [octaveSelected, setOctaveSelected] = useState(false)

    const stageRef = useRef();

    const updateWidthAndHeight = () => {

        setStageWidth(window.innerWidth);
        setStageHeight(window.innerHeight);
    }

    useEffect(() => {
        window.addEventListener('resize', updateWidthAndHeight)

        return () => {
            window.removeEventListener('resize', updateWidthAndHeight);
        }
    });

    const widthPercentage = (width) => {   
        return Math.floor(stageWidth / (100 / width))
    }

    const heightPercentage = (height) => {   
        return Math.floor(stageHeight / (100 / height))
    }

    useEffect(() => {

        setOctaveSelected(false);

        if(octaveSet === 4){
            currentOctave.current = octaves.fourth
        }

        setOctaveSelected(true)

    }, [octaveSet])

    const waveforms = ['sine', 'square', 'sawtooth', 'triangle'];

    const [oscillatorWave, setOscillatorWave] = useState('sine');

    const [input, setInput] = useState();
    const [masterGain, setMaterGain] = useState();
    const [output, setOutput] = useState();

    const noteList = {
        C : {
            pressed: false,
            node: null
        }
    }

    const noteOne = useRef();
    const noteTwo = useRef();
    const noteThree = useRef();
    const noteFour = useRef();
    const noteFive = useRef();
    const noteSix = useRef();
    const noteSeven = useRef();

    const sharpOne = useRef();
    const sharpTwo = useRef();
    const sharpThree = useRef();
    const sharpFour = useRef();
    const sharpFive = useRef();


    const [oscillators, setOscillators] = useState([]);

    useEffect(() => {
        console.log(oscillators)
    }, [oscillators])

    const onDown = (e) => {

        if(e.repeat) {
            return;
        }

        if(e.key === `d`){
            setCPressed(!cPressed)
            noteList.C.pressed = !noteList.C.pressed
            playTone(noteOne.current.attrs)
        };

        if(e.key === `r`){
            setCSharpPressed(!cSharpPressed)
            playTone(sharpOne.current.attrs)
            
        };

        if(e.key === `f`){
            setDPressed(!dPressed)
            playTone(noteTwo.current.attrs)
            
        };

        if(e.key === `t`){
            setEFlatPressed(!eFlatPressed)
            playTone(sharpTwo.current.attrs)
        };


        if(e.key === `g`){
            setEPressed(!ePressed)
            playTone(noteThree.current.attrs)
            
        };

        if(e.key === `h`){
            setFPressed(!fPressed)
            playTone(noteFour.current.attrs)
            
        };

        if(e.key === `u`){
            setFSharpPressed(!fSharpPressed)
            playTone(sharpThree.current.attrs)
        };

        if(e.key === `j`){
            setGPressed(!gPressed)
            playTone(noteFive.current.attrs)
        };

        if(e.key === `i`){
            setGSharpPressed(!gSharpPressed)
            playTone(sharpFour.current.attrs)
        };

        if(e.key === `k`){
            setAPressed(!aPressed)
            playTone(noteSix.current.attrs)
        };

        if(e.key === `o`){
            setBFlatPressed(!bFlatPressed)
            playTone(sharpFive.current.attrs)
        };

        if(e.key === `l`){
            setBPressed(!bPressed)
            playTone(noteSeven.current.attrs)
        };

    }

    const onUp = async (e) => {

        if(e.key === `d`){

            if(!cPressed){
                return;
            }

            setCPressed(!cPressed)
            const oscObj = await oscillators.filter(osc => osc.id === noteOne.current.attrs.id);
            stopTone(oscObj)
            
        };

        if(e.key === `r`){
            setCSharpPressed(!cSharpPressed)
            stopTone(sharpOne.current.attrs)
        };

        if(e.key === `f`){
            setDPressed(!dPressed)
            const oscObj = await oscillators.filter(osc => osc.id === noteTwo.current.attrs.id);
            stopTone(oscObj)
            removeOscillator(noteTwo.current.attrs.id)

        };

        if(e.key === `t`){
            setEFlatPressed(!eFlatPressed)
            stopTone(sharpTwo.current.attrs)
        };


        if(e.key === `g`){
            setEPressed(!ePressed)
            stopTone(noteThree.current.attrs)
        };

        if(e.key === `h`){
            setFPressed(!fPressed)
            stopTone(noteFour.current.attrs)
        };

        if(e.key === `u`){
            setFSharpPressed(!fSharpPressed)
            stopTone(sharpThree.current.attrs)
        };

        if(e.key === `j`){
            setGPressed(!gPressed)
            stopTone(noteFive.current.attrs)
        };

        if(e.key === `i`){
            setGSharpPressed(!gSharpPressed)
            stopTone(sharpFour.current.attrs)
        };

        if(e.key === `k`){
            setAPressed(!aPressed)
            stopTone(noteSix.current.attrs)
        };

        if(e.key === `o`){
            setBFlatPressed(!bFlatPressed)
            stopTone(sharpFive.current.attrs)
        };

        if(e.key === `l`){
            setBPressed(!bPressed)
            stopTone(noteSeven.current.attrs)
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

    const playTone = async ({id, value}) => {

        const noteRef = id.slice(0, -1)
        console.log(noteRef)
        console.log(noteList.noteRef)

        // const nodeId = id;
        // const frequency = value;

        // const oscNode = await userContext.createOscillator();
        // oscNode.type = oscillatorWave;
        // oscNode.frequency.value = frequency;

        // const oscGain = await userContext.createGain();
        // oscGain.gain.value = 0;

        // const oscObj = {
        //     node: oscNode,
        //     gainNode: oscGain,
        //     id: nodeId
        // };

        // const now = userContext.currentTime;
        // const attack = now + 0.001;

        // // oscillators.push(oscObj)
        // noteRef.current = oscObj;
        
        // oscNode.connect(oscGain);
        // oscGain.connect(masterGain);

        // oscNode.start();
        // oscGain.gain.linearRampToValueAtTime(1.0, attack)
    };

    const removeOscillator = ({id}) => {
        setOscillators(oscillators.filter(osc => osc.id !== id)) 
    }

    const stopTone = async (obj) => {

        const currOsc = obj[0]


        const now = userContext.currentTime;
        const release = now + 0.2;
        
        await currOsc.gainNode.gain.linearRampToValueAtTime(0.0, release);
        
        await currOsc.node.stop(release);

        removeOscillator(currOsc)

        // oscObj[0].node.disconnect();
        // oscObj[0].gainNode.disconnect();

    }

    const handleWaveformChange = (e) => {
        setOscillatorWave(e.target.value)
    };


    return (
        <div>
            <Stage ref={stageRef} width={stageWidth} height={stageHeight}>
                <Layer>
                    <Rect width={stageWidth} height={stageHeight} fill='pink'/>
                    <Circle x={widthPercentage(10)} y={heightPercentage(10)} radius={widthPercentage(2)} fill='white' onClick={getContext}/>

                    <Rect ref={noteOne} id={octaveSelected && currentOctave.current ? currentOctave.current.one.note : null} value={octaveSelected && currentOctave.current ? currentOctave.current.one.frequency : null}  x={widthPercentage(30)} y={heightPercentage(70)} width={widthPercentage(3)} height={heightPercentage(10)} fill={cPressed ? 'yellow' : 'white'}/>
                    <Rect ref={noteTwo}  id={octaveSelected && currentOctave.current ? currentOctave.current.two.note : null} value={octaveSelected && currentOctave.current ? currentOctave.current.two.frequency : null} x={widthPercentage(35)} y={heightPercentage(70)} width={widthPercentage(3)} height={heightPercentage(10)} fill={dPressed ? 'yellow' : 'white'}/>
                    <Rect ref={noteThree}  id={octaveSelected && currentOctave.current ? currentOctave.current.three.note : null} value={octaveSelected && currentOctave.current ? currentOctave.current.three.frequency : null} x={widthPercentage(40)} y={heightPercentage(70)} width={widthPercentage(3)} height={heightPercentage(10)} fill={ePressed ? 'yellow' : 'white'}/>
                    <Rect ref={noteFour}  id={octaveSelected && currentOctave.current ? currentOctave.current.four.note : null} value={octaveSelected && currentOctave.current ? currentOctave.current.four.frequency : null} x={widthPercentage(45)} y={heightPercentage(70)} width={widthPercentage(3)} height={heightPercentage(10)} fill={fPressed ? 'yellow' : 'white'}/>
                    <Rect ref={noteFive}  id={octaveSelected && currentOctave.current ? currentOctave.current.five.note : null} value={octaveSelected && currentOctave.current ? currentOctave.current.five.frequency : null} x={widthPercentage(50)} y={heightPercentage(70)} width={widthPercentage(3)} height={heightPercentage(10)} fill={gPressed ? 'yellow' : 'white'}/>
                    <Rect ref={noteSix}  id={octaveSelected && currentOctave.current ? currentOctave.current.six.note : null} value={octaveSelected && currentOctave.current ? currentOctave.current.six.frequency : null} x={widthPercentage(55)} y={heightPercentage(70)} width={widthPercentage(3)} height={heightPercentage(10)} fill={aPressed ? 'yellow' : 'white'}/>
                    <Rect ref={noteSeven}  id={octaveSelected && currentOctave.current ? currentOctave.current.seven.note : null} value={octaveSelected && currentOctave.current ? currentOctave.current.seven.frequency : null} x={widthPercentage(60)} y={heightPercentage(70)} width={widthPercentage(3)} height={heightPercentage(10)} fill={bPressed ? 'yellow' : 'white'}/>
            
                    <Rect ref={sharpOne}  id={octaveSelected && currentOctave.current ? currentOctave.current.sharpOne.note : null} value={octaveSelected && currentOctave.current ? currentOctave.current.sharpOne.frequency : null} x={widthPercentage(32.5)} y={heightPercentage(60)} width={widthPercentage(3)} height={heightPercentage(10)} fill={cSharpPressed ? 'yellow' : 'black'}/>
                    <Rect ref={sharpTwo}  id={octaveSelected && currentOctave.current ? currentOctave.current.sharpTwo.note : null} value={octaveSelected && currentOctave.current ? currentOctave.current.sharpTwo.frequency : null} x={widthPercentage(37.5)} y={heightPercentage(60)} width={widthPercentage(3)} height={heightPercentage(10)} fill={eFlatPressed ? 'yellow' : 'black'}/>
    
                    <Rect ref={sharpThree}  id={octaveSelected && currentOctave.current ? currentOctave.current.sharpThree.note : null} value={octaveSelected && currentOctave.current ? currentOctave.current.sharpThree.frequency : null} x={widthPercentage(47.5)} y={heightPercentage(60)} width={widthPercentage(3)} height={heightPercentage(10)} fill={fSharpPressed ? 'yellow' : 'black'}/>
                    <Rect ref={sharpFour}  id={octaveSelected && currentOctave.current ? currentOctave.current.sharpFour.note : null} value={octaveSelected && currentOctave.current ? currentOctave.current.sharpFour.frequency : null} x={widthPercentage(52.5)} y={heightPercentage(60)} width={widthPercentage(3)} height={heightPercentage(10)} fill={gSharpPressed ? 'yellow' : 'black'}/>
                    <Rect ref={sharpFive}  id={octaveSelected && currentOctave.current ? currentOctave.current.sharpFive.note : null} value={octaveSelected && currentOctave.current ? currentOctave.current.sharpFive.frequency : null} x={widthPercentage(57.5)} y={heightPercentage(60)} width={widthPercentage(3)} height={heightPercentage(10)} fill={bFlatPressed ? 'yellow' : 'black'}/>
                </ Layer>
            </ Stage>

        </div>
        
        // <div>
        //     <h1>Dambuster</h1>
        //     <div >
        //         {!audioCTX && <button onClick={getContext}>get audio</button>}
        //     </div>
        //     <div>
        //         <select onChange={handleWaveformChange}>
        //             {waveforms.map(wave => <option value={wave}>{wave}</option>)}
        //         </select>
        //     </div>

        //     <div>
        //         {audioCTX && cBluesScale.map(note => 
        //         <button key={note.note} id={note.note} value={note.frequency}
        //          onMouseDown={playTone} onMouseUp={stopTone}> {note.note.slice(0, -1)}</button>)}
        //     </div>

        // </div>
    )
};

export default Dambuster;
