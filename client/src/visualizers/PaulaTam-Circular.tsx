//copying from Waveform
// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

export const CircularVisualizer = new Visualizer(
    'Circular',
    (p5: P5, analyzer: Tone.Analyser) => {
      const width = window.innerWidth;
      const height = window.innerHeight / 2;
      const halfHeight = height/2;
      const halfWidth = width/2;

      p5.angleMode('degrees'); //to use degrees instead of radians

      p5.background(0, 0, 0, 255);
  
      p5.noStroke();

      p5.translate(halfWidth-100, height);
  
      const values = analyzer.getValue(); //amp

      p5.colorMode(p5.HSL, 360); //hue, saturation, light
      let hue = p5.frameCount % 360; //rotates colors
      p5.fill(hue, 200, 200);

      p5.beginShape();
      for (let i = 0; i <= values.length; i += 0.5) { //increment by half to make it have more values
        let amplitude = values[i] as number;
        const r = p5.map(amplitude, -1, 0.5, 0, height); //r for radius
        //use radius to create half circle
        const x = r * p5.sin(i);
        const y = r * p5.cos(i);

        p5.vertex(x, y); //y-halfwidth/6 to center the circle in the window
        p5.rotate(-90); //rotate to the left 90 degrees //x becomes y and y becomes x

        p5.ellipse(halfHeight + p5.sin(p5.frameCount/2) * 150, 0, 50 + 40*amplitude, 50 + 40*amplitude);
        p5.ellipse(halfHeight + p5.sin(p5.frameCount/2) * 120, 0, 40 + 40*amplitude, 40);
        p5.ellipse(halfHeight + p5.sin(p5.frameCount/2) * 70, 0, 25 + 40*amplitude, 25 + 40*amplitude);
          
        p5.ellipse(0, halfWidth/6 + p5.sin(p5.frameCount) * 300, 50 + 40*amplitude, 50 + 40*amplitude);
        p5.ellipse(0, halfWidth/6 + p5.sin(p5.frameCount) * 270, 40, 40 + 40*amplitude);
        p5.ellipse(0, halfWidth/6 + p5.sin(p5.frameCount) * 200, 25, 25 + 40*amplitude);

        p5.ellipse(
          -(halfHeight/6)+p5.sin(p5.frameCount*1.5)*200,
          -(halfHeight/6)+p5.sin(p5.frameCount*1.5)*200,
          45, 45);
      }
      p5.endShape();

      //"eyes" for the slime thing
      p5.fill('white');
      p5.ellipse(40, height/6, 60, 30);

      p5.fill('white');
      p5.ellipse(40, -height/6, 60, 30);
    },
);
