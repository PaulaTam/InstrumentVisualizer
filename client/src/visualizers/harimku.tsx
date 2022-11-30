// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';


export const EllipticalVisualizer = new Visualizer(
  'Elliptical',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    p5.background(120, 35, 200);
    p5.strokeWeight(dim * 0.01);
    p5.stroke(0, 127, 255, 14);
    p5.noFill();

    const values = analyzer.getValue();
    p5.beginShape();
    for (let i = 0; i < values.length; i++) {
      const amplitude = values[i] as number;
      const x = p5.map(i, 0, values.length - 1, 0, width);
      const y = height / 2 + amplitude * height;

      // Place vertex
      p5.ellipse(width / 2, height / 2, 4 / 5 * x, y);
    }
    p5.endShape();
  },
);
