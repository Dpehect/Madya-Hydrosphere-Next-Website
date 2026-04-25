import { create } from "zustand";

interface UIState {
  isLoaded: boolean;
  setLoaded: (status: boolean) => void;
  audioEnabled: boolean;
  toggleAudio: () => void;
  currentSection: string;
  setCurrentSection: (section: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isLoaded: false,
  setLoaded: (status) => set({ isLoaded: status }),
  audioEnabled: false,
  toggleAudio: () => set((state) => ({ audioEnabled: !state.audioEnabled })),
  currentSection: "hero",
  setCurrentSection: (section) => set({ currentSection: section }),
}));
