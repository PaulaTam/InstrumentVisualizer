// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';

// project imports
import { InstrumentDrum, InstrumentProps } from '../InstrumentDrum';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Piano.
 ** ------------------------------------------------------------------------ */

interface DrumKeyProps {
  note: string;
  duration?: string;
  synth?: Tone.MembraneSynth; // Contains library code for making sound
  octaves: number;
  pitchDecay: number;
  index: number; // octave + index together give a location for the piano key
}

export function DrumKey({
  note,
  synth,
  index,
}: DrumKeyProps): JSX.Element {
  /**
   * This React component corresponds to either a major or minor key in the piano.
   * See `PianoKeyWithoutJSX` for the React component without JSX.
   */
  return (
    // Observations:
    // 1. The JSX refers to the HTML-looking syntax within TypeScript.
    // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
    // 3. The curly braces `{` and `}` should remind you of string interpolation.

    <div
      onMouseDown={() => synth?.triggerAttack(`${note}`)} // Question: what is `onMouseDown`?
      onMouseUp={() => synth?.triggerRelease('+0.3')} // Question: what is `onMouseUp`?
      className={classNames('ba pointer absolute dim bg-gold h3', {
        // 'bg-black white h3': minor, // minor keys are black
        // 'black bg-white h4': !minor, // major keys are white
      })}
      style={{
        // CSS
        top: 0,
        left: `${index * 5}rem`,
        zIndex: 0,
        height: '5rem',
        width: '5rem',
        marginLeft: '2rem',
        borderRadius: '50%',
        border: '1px solid #888'
      }}
    ></div>
  );
}

// eslint-disable-next-line
function DrumKeyWithoutJSX({
  note,
  synth,
  index,
}: DrumKeyProps): JSX.Element {
  /**
   * This React component for pedagogical purposes.
   * See `PianoKey` for the React component with JSX (JavaScript XML).
   */
  return React.createElement(
    'div',
    {
      onMouseDown: () => synth?.triggerAttack(`${note}`),
      onMouseUp: () => synth?.triggerRelease('+0.5'),
      className: classNames('ba pointer absolute dim', {
        // 'bg-black black h3': minor,
        // 'black bg-white h4': !minor,
      }),
      style: {
        top: 0,
        left: `${index * 5}rem`,
        zIndex: 0,
        height: '5rem',
        width: '5rem',
        marginLeft: '2rem',
        borderRadius: '50%',
        border: '1px solid #888'
      },
    },
    [],
  );
}

function DrumType({ title, onClick, active }: any): JSX.Element {
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

function Drum({ synth, setSynth }: InstrumentProps): JSX.Element {
  const keys = List([
    { note: 'E2', idx: 0 },
    { note: 'A1', idx: 1 },
    { note: 'C2', idx: 2 },
    { note: 'G1', idx: 3 },
    { note: 'B1', idx: 4 },
    { note: 'E4', idx: 5 },
  ]);

  const setOscillator = (newType: Tone.ToneOscillatorType) => {
    setSynth(oldSynth => {
      oldSynth.disconnect();

      return new Tone.MembraneSynth({
        oscillator: { type: newType } as Tone.OmniOscillatorOptions,
        "envelope": {
          "attack": 0.001,
          "decay": 0.4,
          "sustain": 0.01,
          "release": 1.4,
          "attackCurve": "exponential"
        },
        "octaves": 10,
        "pitchDecay": 0.1,
      }).toDestination();

    });
  };

  const oscillators: List<OscillatorType> = List([
    'sine',
    'sawtooth',
    'square',
    'triangle',
    'fmsine',
    'fmsawtooth',
    'fmtriangle',
    'amsine',
    'amsawtooth',
    'amtriangle',
  ]) as List<OscillatorType>;

  return (
    <div className="pv4">
      <div className="relative dib h4 w-100 ml4">
        {Range(2, 5).map(octave =>
          keys.map(key => {
            const note = `${key.note}`;
            return (
              <DrumKey
                key={note} //react key
                note={note}
                synth={synth}
                octaves={1}
                pitchDecay={0.00001}
                index={(octave - 2) * 7 + key.idx}
              />
            );
          }),
        )}
      </div>
      <div className={'pl4 pt4 flex'}>
        {oscillators.map(o => (
          <DrumType
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

export const DrumInstrument = new InstrumentDrum('Drum', Drum);
