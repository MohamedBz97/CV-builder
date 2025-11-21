
import React, { useState } from 'react';
import { CloudArrowUpIcon } from './icons';

interface ImportResumeModalProps {
  onImport: (data: { name: string; email: string; summary: string }) => void;
  onClose: () => void;
}

const ImportResumeModal: React.FC<ImportResumeModalProps> = ({ onImport, onClose }) => {
  const [rawText, setRawText] = useState('');

  const handleImport = () => {
    if (!rawText.trim()) return;

    // Simple rule-based extraction logic
    const lines = rawText.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    if (lines.length === 0) return;

    // Rule 1: First line is the name
    const name = lines[0];

    // Rule 2: Line with '@' is the email
    const emailIndex = lines.findIndex(line => line.includes('@'));
    const email = emailIndex !== -1 ? lines[emailIndex] : '';

    // Rule 3: Remaining text goes to summary (excluding name and email lines to avoid duplication if possible)
    // We filter out the name line (index 0) and the email line (if found)
    const summaryLines = lines.filter((_, index) => index !== 0 && index !== emailIndex);
    const summary = summaryLines.join('\n');

    onImport({ name, email, summary });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl flex flex-col animate-scale-in">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-neutral-800 flex items-center gap-2">
            <CloudArrowUpIcon className="w-6 h-6" />
            Import CV Data
          </h2>
          <button onClick={onClose} className="text-2xl font-bold text-neutral-500 hover:text-neutral-800">&times;</button>
        </div>

        <p className="text-neutral-600 mb-4 text-sm">
          Paste the text from your LinkedIn profile or existing CV below. We will extract your name and email, and place the rest of the text into the Professional Summary section for you to edit and organize.
        </p>

        <textarea
          className="w-full p-3 border border-neutral-300 rounded-md shadow-sm focus:ring-primary focus:border-primary mb-6 font-mono text-sm"
          rows={10}
          placeholder="Paste your resume content here..."
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
        />

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-200 text-neutral-700 font-semibold rounded-lg hover:bg-neutral-300"
          >
            Cancel
          </button>
          <button
            onClick={handleImport}
            disabled={!rawText.trim()}
            className="px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Load into Editor (Draft)
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportResumeModal;
