import { create } from "zustand";

interface ProjectsEntryState {
  /** When set, Projects app should open to this project id (used when opening from terminal or mobile). */
  initialProjectId: string | null;
  setInitialProjectId: (id: string | null) => void;
}

export const useProjectsEntryStore = create<ProjectsEntryState>((set) => ({
  initialProjectId: null,
  setInitialProjectId: (id) => set({ initialProjectId: id }),
}));
