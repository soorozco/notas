
import React, { useState } from 'react';

interface NoteFormProps {
  onAddNote: (text: string) => void;
}

export const NoteForm: React.FC<NoteFormProps> = ({ onAddNote }) => {
  const [noteText, setNoteText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (noteText.trim()) {
      onAddNote(noteText.trim());
      setNoteText('');
    }
  };
  
  const charCount = noteText.length;
  const maxChars = 300;

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4 transition-all duration-300">
      <div className="relative">
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Escribe tu nota aquí..."
          className="w-full h-24 p-3 bg-transparent text-slate-700 dark:text-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-shadow resize-none placeholder-slate-400 dark:placeholder-slate-500"
          rows={3}
          maxLength={maxChars}
        />
        <div className={`absolute bottom-2 right-3 text-xs ${charCount > maxChars - 20 ? 'text-red-500' : 'text-slate-400 dark:text-slate-500'} transition-opacity duration-300 ${isFocused || charCount > 0 ? 'opacity-100' : 'opacity-0'}`}>
          {charCount}/{maxChars}
        </div>
      </div>
      <div className="flex justify-end mt-2">
        <button
          type="submit"
          disabled={!noteText.trim()}
          className="px-6 py-2 bg-primary text-white font-bold rounded-full hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-white dark:focus:ring-offset-slate-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-100"
        >
          Añadir Nota
        </button>
      </div>
    </form>
  );
};
