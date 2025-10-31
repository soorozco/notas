
import React, { useState, useRef, useEffect } from 'react';
import type { Note } from '../types';
import { PinIcon, TrashIcon, EditIcon, CheckIcon, CancelIcon } from './icons';

interface NoteCardProps {
  note: Note;
  onDelete: (id: number) => void;
  onUpdate: (id: number, newText: string) => void;
  onTogglePin: (id: number) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onDelete, onUpdate, onTogglePin }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(note.text);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleUpdate = () => {
    if (editText.trim()) {
      onUpdate(note.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditText(note.text);
    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [isEditing]);
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className={`relative flex flex-col bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group ${note.isPinned ? 'border-l-4 border-primary' : ''}`}>
      <div className="p-5 flex-grow">
        {isEditing ? (
          <textarea
            ref={textareaRef}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full h-full bg-slate-100 dark:bg-slate-700 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            rows={5}
          />
        ) : (
          <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap break-words">
            {note.text}
          </p>
        )}
      </div>
      <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-b-lg border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400 dark:text-slate-500">{formatDate(note.createdAt)}</span>
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <>
                <button onClick={handleUpdate} className="p-1.5 text-green-500 hover:text-green-600 rounded-full hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors" aria-label="Guardar nota">
                  <CheckIcon className="w-5 h-5" />
                </button>
                <button onClick={handleCancelEdit} className="p-1.5 text-red-500 hover:text-red-600 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors" aria-label="Cancelar edición">
                  <CancelIcon className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <button onClick={() => onTogglePin(note.id)} className={`p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors ${note.isPinned ? 'text-primary' : 'text-slate-400'}`} aria-label="Anclar nota">
                  <PinIcon className="w-5 h-5" />
                </button>
                <button onClick={() => setIsEditing(true)} className="p-1.5 text-slate-400 hover:text-blue-500 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" aria-label="Editar nota">
                  <EditIcon className="w-5 h-5" />
                </button>
                <button onClick={() => onDelete(note.id)} className="p-1.5 text-slate-400 hover:text-red-500 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" aria-label="Eliminar nota">
                  <TrashIcon className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
