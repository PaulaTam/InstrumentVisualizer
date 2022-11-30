// 3rd party library imports
import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';

// project imports
import { DispatchAction } from './Reducer';
import { AppState } from './State';

/** ------------------------------------------------------------------------ **
 * Contains base implementation of an Instrument.
 ** ------------------------------------------------------------------------ */

export interface InstrumentMonoProps {
  state: AppState;
  dispatch: React.Dispatch<DispatchAction>;
  name: string;
  synth: Tone.MonoSynth;
  setSynth: (f: (oldSynth: Tone.MonoSynth) => Tone.MonoSynth) => void;
}

export class InstrumentMono {
  public readonly name: string;
  public readonly component: React.FC<InstrumentMonoProps>;

  constructor(name: string, component: React.FC<InstrumentMonoProps>) {
    this.name = name;
    this.component = component;
  }
}

function TopNav({ name }: { name: string }) {
  return (
    <div
      className={
        'w-100 h3 bb b--light-gray flex justify-between items-center ph4'
      }
    >
      <div>{name}</div>
    </div>
  );
}

interface InstrumentMonoContainerProps {
  state: AppState;
  dispatch: React.Dispatch<DispatchAction>;
  instrument: InstrumentMono;
}

export const InstrumentMonoContainer: React.FC<InstrumentMonoContainerProps> = ({
  instrument,
  state,
  dispatch,
}: InstrumentMonoContainerProps) => {
  const InstrumentComponent = instrument.component;
  const [synth, setSynth] = useState(
    new Tone.MonoSynth({
        portamento : 0.02,
        oscillator: { type: 'square' } as Tone.OmniOscillatorOptions,
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
    }).toDestination(),
  );

  const notes = state.get('notes');

  useEffect(() => {
    if (notes && synth) {
      let eachNote = notes.split(' ');
      let noteObjs = eachNote.map((note: string, idx: number) => ({
        idx,
        time: `+${idx / 4}`,
        note,
        velocity: 1,
      }));

      new Tone.Part((time, value) => {
        // the value is an object which contains both the note and the velocity
        synth.triggerAttackRelease(value.note, '4n', time, value.velocity);
        if (value.idx === eachNote.length - 1) {
          dispatch(new DispatchAction('STOP_SONG'));
        }
      }, noteObjs).start(0);

      Tone.Transport.start();

      return () => {
        Tone.Transport.cancel();
      };
    }

    return () => {};
  }, [notes, synth, dispatch]);

  return (
    <div>
      <TopNav name={instrument.name} />
      <div
        className={'bg-white absolute right-0 left-0'}
        style={{ top: '4rem' }}
      >
        <InstrumentComponent
          name={instrument.name}
          state={state}
          dispatch={dispatch}
          synth={synth}
          setSynth={setSynth}
        />
      </div>
    </div>
  );
};
