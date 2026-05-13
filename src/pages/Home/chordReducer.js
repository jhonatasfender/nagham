import { EXTENSION_COMPOSABLE_WITH_TRIAD } from "../../domain/chord";

export const initialChordState = {
  root: "C",
  triad: "Maj",
  extension: null,
  bass: null,
  useFlats: false,
  variationIndex: 0,
};

export function chordReducer(state, action) {
  switch (action.type) {
    case "SET_ROOT":
      return { ...state, root: action.payload, variationIndex: 0 };
    case "SET_TRIAD": {
      if (action.payload === state.triad) return state;
      return {
        ...state,
        triad: action.payload,
        variationIndex: 0,
        extension: EXTENSION_COMPOSABLE_WITH_TRIAD.has(state.extension)
          ? state.extension
          : null,
      };
    }
    case "SET_EXTENSION": {
      const { ext, impliedTriad } = action.payload;
      if (ext == null) return { ...state, extension: null, variationIndex: 0 };
      return {
        ...state,
        extension: ext,
        variationIndex: 0,
        triad: impliedTriad != null ? impliedTriad : state.triad,
      };
    }
    case "SET_VARIATION_INDEX":
      return { ...state, variationIndex: action.payload };
    case "SET_BASS":
      return { ...state, bass: action.payload };
    case "SET_USE_FLATS":
      return { ...state, useFlats: action.payload };
    default:
      return state;
  }
}
