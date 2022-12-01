//copying from Piano
//making a xylophone
// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';

// project imports
import { InstrumentMono, InstrumentMonoProps } from '../InstrumentsMono';

interface XylophoneBarsProps {
  note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B (same as piano, starts at C5 ends at G7)
  duration?: string; //shorter duration (meant to mimic a real xylophone)
  synth?: Tone.MonoSynth; //use MonoSynth (more similar sound)
  minor?: boolean; // True if minor key, false if major key
  octave: number;
  index: number; // octave + index together give a location for the key
}

export function XylophoneKey({
  note,
  synth,
  minor,
  index,
}: XylophoneBarsProps): JSX.Element {

  return (

    <div
      onMouseDown={() => synth?.triggerAttackRelease(`${note}`, '5n')} //xylophones cant hold notes when pressed down
      onMouseUp={() => synth?.triggerRelease('+0.005')} 
      className={classNames('ba pointer absolute dim')}
      style={{
        // CSS
        top: minor? 0 : '5rem',
        left: `${index * 2}rem`,
        width: '2rem',
        height: '5rem',
        marginLeft: minor ? '0.25rem' : 0,
        color: 'black',
        backgroundColor: '#CD7F32'
      }}
    ></div>
  );
}

function XylophoneType({ title, onClick, active }: any): JSX.Element {
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

function Xylophone({ synth, setSynth }: InstrumentMonoProps): JSX.Element {
  const keys = List([
    { note: 'C', idx: 0 },
    { note: 'Db', idx: 0.5 },
    { note: 'D', idx: 1 },
    { note: 'Eb', idx: 1.5 },
    { note: 'E', idx: 2 },
    { note: 'F', idx: 3 },
    { note: 'Gb', idx: 3.5 },
    { note: 'G', idx: 4 },
    { note: 'Ab', idx: 4.5 },
    { note: 'A', idx: 5 },
    { note: 'Bb', idx: 5.5 },
    { note: 'B', idx: 6 },
  ]);

  const setOscillator = (newType: Tone.ToneOscillatorType) => {
    setSynth(oldSynth => {
      oldSynth.disconnect();

      return new Tone.MonoSynth({
        portamento : 0.02,
        oscillator: { type: newType } as Tone.OmniOscillatorOptions,
        envelope : {
          attack : 0.005,
          decay : 0.2,
          sustain : 0.4,
          release : 1.4,
      },
      filter : {
        Q : 1,
        detune : 0,
        frequency : 0,
        gain : 0,
        rolloff : -12,
        type : "lowpass"
      },
      filterEnvelope : {
          attack : 0.005,
          decay : 0.1,
          sustain : 0.05,
          release : 0.8,
          baseFrequency : 300,
          octaves : 4
      },
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
        {Range(3, 6).map(octave =>
          keys.map(key => {
            const isMinor = key.note.indexOf('b') !== -1;
            const note = `${key.note}${octave}`;
            return (
              <XylophoneKey
                key={note} //react key
                note={note}
                synth={synth}
                minor={isMinor}
                octave={octave}
                index={(octave-3) * 7 + key.idx} //octave-3 to offset board to the left
              />
            );
          }),
        )}
      </div>
      <div className={'pl4 pt5 flex'}>
        {oscillators.map(o => (
          <XylophoneType
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


  export const XylophoneInstrument = new InstrumentMono('Xylophone', Xylophone);
