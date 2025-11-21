import React from 'react';
import { CoverLetterSchema, Basics } from '../../types';

interface TemplateProps {
  data: CoverLetterSchema;
  basics: Basics;
}

const ModernCoverLetter: React.FC<TemplateProps> = ({ data, basics }) => {
  const { date, recipientName, recipientTitle, companyName, salutation, body, signoff } = data;

  return (
    <div className="flex font-sans text-sm h-full bg-white">
      {/* Sidebar */}
      <div className="w-1/3 bg-neutral-800 text-white p-8 flex flex-col">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white leading-tight break-words">{basics.name}</h1>
            <p className="text-base text-secondary mt-2 tracking-widest">{basics.label}</p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-base font-bold text-white uppercase tracking-wider mb-3">Contact</h3>
          <ul className="space-y-3 text-xs text-neutral-200 break-words">
            <li>{basics.email}</li>
            <li>{basics.phone}</li>
            <li>{basics.location.city}, {basics.location.region}</li>
            {basics.url && <li>{basics.url}</li>}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-8 text-neutral-700 flex flex-col">
        <p className="mb-8 text-right font-medium text-primary">{date}</p>

        <div className="space-y-1 mb-8 text-sm">
          <p className="font-bold text-gray-900">{recipientName}</p>
          <p>{recipientTitle}</p>
          <p>{companyName}</p>
        </div>

        <p className="mb-6 font-bold text-gray-900">{salutation}</p>

        <div className="space-y-4 mb-8 flex-grow">
          {body.map((p, i) => (
            <p key={i} className="text-justify leading-relaxed">{p}</p>
          ))}
        </div>

        <p className="mb-2">{signoff}</p>
        <p className="font-bold text-gray-900">{basics.name}</p>
      </div>
    </div>
  );
};

export default ModernCoverLetter;