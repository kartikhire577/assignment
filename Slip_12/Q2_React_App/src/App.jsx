import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNote, deleteNote, updateNote } from "./notesSlice.js";
import "./App.css";

export default function App() {
  const notes = useSelector((state) => state.notes.items);
  const dispatch = useDispatch();
  const [form, setForm] = useState({ title: "", content: "" });
  const [editId, setEditId] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    if (editId) {
      dispatch(updateNote({ id: editId, ...form }));
      setEditId(null);
    } else {
      dispatch(addNote(form));
    }
    setForm({ title: "", content: "" });
  };

  const startEdit = (n) => {
    setEditId(n.id);
    setForm({ title: n.title, content: n.content });
  };

  return (
    <div className="container wide">
      <h1>Notes Manager (Redux Toolkit)</h1>
      <form onSubmit={submit}>
        <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <textarea rows="3" placeholder="Content" style={{ marginTop: 8 }} value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })} />
        <button type="submit">{editId ? "Update Note" : "Add Note"}</button>
      </form>
      {notes.length === 0 && <p>No notes yet.</p>}
      {notes.map((n) => (
        <div key={n.id} style={{ borderTop: "1px solid #e2e8f0", marginTop: 12, paddingTop: 8 }}>
          <h3 style={{ margin: 0 }}>{n.title}</h3>
          <p>{n.content}</p>
          <button onClick={() => startEdit(n)}>Edit</button>
          <button className="danger" onClick={() => dispatch(deleteNote(n.id))}>Delete</button>
        </div>
      ))}
    </div>
  );
}
