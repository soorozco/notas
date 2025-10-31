
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { Note } from './types';
import { NoteCard } from './components/NoteCard';
import { NoteForm } from './components/NoteForm';
import { Header } from './components/Header';

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    try {
      const storedNotes = localStorage.getItem('notes-app-data');
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      }
    } catch (error) {
      console.error("Failed to load notes from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('notes-app-data', JSON.stringify(notes));
    } catch (error) {
      console.error("Failed to save notes to localStorage", error);
    }
  }, [notes]);

  const addNote = useCallback((text: string) => {
    const newNote: Note = {
      id: Date.now(),
      text,
      isPinned: false,
      createdAt: new Date().toISOString(),
    };
    setNotes(prevNotes => [newNote, ...prevNotes]);
  }, []);

  const deleteNote = useCallback((id: number) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  }, []);

  const updateNote = useCallback((id: number, newText: string) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === id ? { ...note, text: newText } : note
      )
    );
  }, []);

  const togglePinNote = useCallback((id: number) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === id ? { ...note, isPinned: !note.isPinned } : note
      )
    );
  }, []);

  const sortedNotes = useMemo(() => {
    return [...notes].sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [notes]);

  return (
    <div className="min-h-screen font-sans text-slate-800 dark:text-slate-200">
      <div className="container mx-auto max-w-4xl p-4 md:p-8">
        <Header />
        
        <main>
          <NoteForm onAddNote={addNote} />

          {sortedNotes.length > 0 ? (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sortedNotes.map(note => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onDelete={deleteNote}
                  onUpdate={updateNote}
                  onTogglePin={togglePinNote}
                />
              ))}
            </div>
          ) : (
            <div className="mt-16 text-center text-slate-500 dark:text-slate-400">
              <p className="text-xl">¡No hay notas todavía!</p>
              <p>Añade una nueva nota para empezar.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
