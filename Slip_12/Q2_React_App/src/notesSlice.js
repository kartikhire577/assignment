import { createSlice, nanoid } from "@reduxjs/toolkit";

const notesSlice = createSlice({
  name: "notes",
  initialState: { items: [] },
  reducers: {
    addNote: {
      reducer(state, action) {
        state.items.push(action.payload);          // Immer allows "mutating" syntax
      },
      prepare({ title, content }) {
        return { payload: { id: nanoid(), title, content } };
      },
    },
    updateNote(state, action) {
      const { id, title, content } = action.payload;
      const note = state.items.find((n) => n.id === id);
      if (note) {
        note.title = title;
        note.content = content;
      }
    },
    deleteNote(state, action) {
      state.items = state.items.filter((n) => n.id !== action.payload);
    },
  },
});

export const { addNote, updateNote, deleteNote } = notesSlice.actions;
export default notesSlice.reducer;
