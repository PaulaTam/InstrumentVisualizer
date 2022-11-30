// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { DrumInstrument } from './instruments/Drum';
import { HarmonicaInstrument } from './instruments/UmarRama-Harmonica';
import { XylophoneInstrument } from './instruments/PaulaTam-Xylophone';

import { WaveformVisualizer } from './visualizers/Waveform';
import { EllipticalVisualizer } from './visualizers/harimku';
import { BarformVisualizer } from './visualizers/UmarRama-Barform';
import { CircularVisualizer } from './visualizers/PaulaTam-Circular';

/** ------------------------------------------------------------------------ **
 * The entire application state is stored in AppState.
 ** ------------------------------------------------------------------------ */
export type AppState = Map<string, any>;           // similar to { [id: string]: any }

/**
 * Start with the default piano instrument.
 * Add your instruments to this list.
 */
const instruments = List([PianoInstrument, DrumInstrument, HarmonicaInstrument, XylophoneInstrument]);       // similar to Instrument[]

/**
 * Start with the default waveform visualizer.
 * Add your visualizers to this list.
 */
const visualizers = List([WaveformVisualizer, EllipticalVisualizer, BarformVisualizer, CircularVisualizer]);    // similar to Visualizer[]


/**
 * The default application state contains a list of instruments and a list of visualizers.
 *
 * 'instrument': List<Instrument>
 * 'visualizer': List<Visualizer>
 */
export const defaultState: AppState = Map<string, any>({
  'instruments': instruments,
  'visualizers': visualizers,
});
