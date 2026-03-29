import { scaleLinear } from "d3-scale";

export function createMidiScale(midiMin, midiMax, yMin, yMax) {
  return scaleLinear().domain([midiMin, midiMax]).range([yMin, yMax]);
}
