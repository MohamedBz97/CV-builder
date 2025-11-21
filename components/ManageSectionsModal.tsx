import React from 'react';
import { ResumeLayout, SectionKey, Section } from '../types';

interface ManageSectionsModalProps {
  layout: ResumeLayout;
  setLayout: React.Dispatch<React.SetStateAction<ResumeLayout>>;
  onClose: () => void;
}

const ManageSectionsModal: React.FC<ManageSectionsModalProps> = ({ layout, setLayout, onClose }) => {
  const handleToggle = (key: SectionKey) => {
    setLayout(prev => {
      const newSections = { ...prev.sections };
      newSections[key] = { ...newSections[key], enabled: !newSections[key].enabled };
      return { ...prev, sections: newSections };
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Manage Sections</h3>
          <button onClick={onClose} className="text-2xl font-bold text-neutral-500 hover:text-neutral-800">&times;</button>
        </div>
        <p className="text-neutral-600 mb-6 text-sm">Select the sections you want to include in your resume.</p>
        <div className="space-y-3">
          {Object.values(layout.sections).map((section: Section) => (
            <div key={section.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
              <span className="font-medium text-neutral-700">{section.name}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={section.enabled}
                  onChange={() => handleToggle(section.id)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-neutral-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-secondary peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          ))}
        </div>
        <div className="mt-6 text-right">
          <button onClick={onClose} className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-blue-800">Done</button>
        </div>
      </div>
    </div>
  );
};

export default ManageSectionsModal;