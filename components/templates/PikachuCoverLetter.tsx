import React from 'react';
import { CoverLetterSchema, Basics } from '../../types';

interface TemplateProps {
  data: CoverLetterSchema;
  basics: Basics;
}

const PikachuCoverLetter: React.FC<TemplateProps> = ({ data, basics }) => {
  const { date, recipientName, recipientTitle, companyName, salutation, body, signoff } = data;

  return (
    <div className="flex font-sans text-sm h-full bg-white">
      {/* Sidebar */}
      <div className="w-1/3 bg-gray-800 text-white p-8 flex flex-col">
        <div className="text-left mb-8">
            <h1 className="text-2xl font-bold text-white leading-tight break-words">{basics.name}</h1>
            <p className="text-sm text-secondary mt-1 uppercase tracking-wider">{basics.label}</p>
        </div>
        
        <div className="mb-5">
           <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2 border-b border-gray-600 pb-1">Contact</h3>
           <ul className="space-y-2 text-xs text-gray-300 break-words mt-3">
            <li>{basics.email}</li>
            <li>{basics.phone}</li>
            <li>{basics.location.city}, {basics.location.region}</li>
            {basics.url && <li>{basics.url}</li>}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-8 text-gray-700 flex flex-col bg-white">
        <div className="mb-8 pb-2 border-b-2 border-secondary">
            <p className="text-right font-bold text-gray-500">{date}</p>
        </div>

        <div className="space-y-1 mb-8">
          <p className="font-bold text-gray-900 uppercase">{recipientName}</p>
          <p className="text-gray-600">{recipientTitle}</p>
          <p className="text-gray-600">{companyName}</p>
        </div>

        <p className="mb-6 font-bold text-gray-800">{salutation}</p>

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

export default PikachuCoverLetter;