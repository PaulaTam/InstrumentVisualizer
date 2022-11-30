// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Harmonica.
 ** ------------------------------------------------------------------------ */

interface HarmonicaKeyProps {
    note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
    duration?: string;
    synth?: Tone.Synth; // Contains library code for making sound
    minor?: boolean; // True if minor key, false if major key
    octave: number;
    index: number; // octave + index together give a location for the Harmonica key
}

export function HarmonicaKey({
    note,
    synth,
    minor,
    index,
}: HarmonicaKeyProps): JSX.Element {
    return (
        <div
            onMouseDown={() => synth?.triggerAttack(`${note}`)} // Question: what is `onMouseDown`?
            onMouseUp={() => synth?.triggerRelease('+0.25')} // Question: what is `onMouseUp`?
            className={classNames('ba pointer absolute dim tromb', {   
            })}
            style={{
                // CSS
                left: `${index * 8}rem`,
                marginLeft:  '2rem' ,
                padding: 1,
                margin: 20,
                display: "inline-block",
                borderRadius: "5%",
                width: 25,
                height: 100,
                color: 'black',
                backgroundColor: '#8B0000'
            }}
        ></div>
    );
}

function HarmonicaKeyWithoutJSX({
    note,
    synth,
    minor,
    index,
}: HarmonicaKeyProps): JSX.Element {

    return React.createElement(
        'div',
        {
            onMouseDown: () => synth?.triggerAttack(`${note}`),
            onMouseUp: () => synth?.triggerRelease('+0.25'),
            className: classNames('ba pointer absolute dim', {

            }),
            style: {
                top: 0,
                left: `${index * 2}rem`,
                zIndex: minor ? 1 : 0,
                width: minor ? '1.5rem' : '2rem',
                marginLeft: minor ? '0.25rem' : 0,
                
                padding: 1,
                margin: 20,
                borderRadius: "50%",
                //width: 20,
                height: 20,
            },
        },
        [],
    );
}

function HarmonicaType({ title, onClick, active }: any): JSX.Element {
    return (
        <div
            onClick={onClick}
            className={classNames('dim pointer ph2 pv1 ba mr2 br1 fw7 bw1', {
                'b--black black': active,
                'gray b--light-gray': !active,
            })}
        >
            {title}
        </div>
    );
}

function Harmonica({ synth, setSynth }: InstrumentProps): JSX.Element {
    const keys = List([
        { note: 'C', idx: 0.3 },
        { note: 'E', idx: 0.6 },
        { note: 'G', idx: 0.9 },
        { note: 'C', idx: 1.2 },
        { note: 'E', idx: 1.5 },
        { note: 'G', idx: 1.8 },
        { note: 'C', idx: 2.1 },
        { note: 'E', idx: 2.4 },
        { note: 'G', idx: 2.7 },
        { note: 'C', idx: 3.0 },
        { note: 'D', idx: 3.7 },
        { note: 'G', idx: 4.0 },
        { note: 'B', idx: 4.3 },
        { note: 'D', idx: 4.6 },
        { note: 'F', idx: 4.9 },
        { note: 'A', idx: 5.2 },
        { note: 'B', idx: 5.5 },
        { note: 'D', idx: 5.8 },
        { note: 'F', idx: 6.1 },
        { note: 'A', idx: 6.4 },
    ]);

    const setOscillator = (newType: Tone.ToneOscillatorType) => {
        setSynth(oldSynth => {
            oldSynth.disconnect();

            return new Tone.Synth({
                oscillator: { type: newType } as Tone.OmniOscillatorOptions,
                "envelope": {
                    "attack": 0.001,
                    "decay": 0.1,
                    "sustain": 1,
                    "release": 1.4,
                },
            }).toDestination();
        });
    };

    const oscillators: List<OscillatorType> = List([
      'sawtooth',
      'fmsawtooth',
      'amsawtooth',
    ]) as List<OscillatorType>;

    return (
        <div className="pv4" id ="harmonica">
           
            <div className="relative dib h4 w-100">
                {Range(0, 3).map(octave =>
                    keys.map(key => {
                        const isMinor = key.note.indexOf('b') !== -1;
                        const note = `${key.note}${octave}`;
                        return (
                            <HarmonicaKey
                                key={note} //react key
                                note={note}
                                synth={synth}
                                minor={isMinor}
                                octave={octave}
                                index={(octave-2) * 7 + key.idx}
                            />
                        );
                    }),
                )}
            </div>
            
            <div className={'pl4 pt4 flex mt5'}>
                {oscillators.map(o => (
                    <HarmonicaType
                        key={o}
                        title={o}
                        onClick={() => setOscillator(o)}
                        active={synth?.oscillator.type === o}
                    />
                ))}
            </div>
        </div>
    );
}

export const HarmonicaInstrument = new Instrument('Harmonica', Harmonica);