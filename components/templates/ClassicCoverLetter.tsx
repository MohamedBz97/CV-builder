import React from 'react';
import { CoverLetterSchema, Basics } from '../../types';

interface TemplateProps {
  data: CoverLetterSchema;
  basics: Basics;
}

const ClassicCoverLetter: React.FC<TemplateProps> = ({ data, basics }) => {
  const { date, recipientName, recipientTitle, companyName, salutation, body, signoff } = data;

  return (
    <div className="p-12 font-serif text-sm text-gray-800 h-full flex flex-col bg-white">
       <header className="text-center mb-8 border-b-2 border-gray-300 pb-4">
        <h1 className="text-4xl font-bold tracking-wider text-gray-900">{basics.name}</h1>
        <p className="text-lg text-blue-800 font-semibold mt-1">{basics.label}</p>
        <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-600">
          <span>{basics.email}</span>
          <span className="hidden sm:inline">|</span>
          <span>{basics.phone}</span>
          <span className="hidden sm:inline">|</span>
          <span>{basics.location.city}, {basics.location.region}</span>
           {basics.url && (
            <>
              <span className="hidden sm:inline">|</span>
              <a href={`https://${basics.url}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{basics.url}</a>
            </>
          )}
        </div>
      </header>

      <div className="flex-grow">
        <p className="mb-6 text-right">{date}</p>

        <div className="space-y-1 mb-6">
          <p className="font-bold">{recipientName}</p>
          <p>{recipientTitle}</p>
          <p>{companyName}</p>
        </div>

        <p className="mb-4 font-bold">{salutation}</p>

        <div className="space-y-4 mb-6">
          {body.map((p, i) => (
            <p key={i} className="text-justify leading-relaxed">{p}</p>
          ))}
        </div>

        <p className="mb-4">{signoff}</p>
        <p className="font-bold">{basics.name}</p>
      </div>
    </div>
  );
};

export default ClassicCoverLetter;