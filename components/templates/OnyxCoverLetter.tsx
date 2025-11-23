
import React from 'react';
import { CoverLetterSchema, Basics } from '../../types';

interface TemplateProps {
  data: CoverLetterSchema;
  basics: Basics;
}

const OnyxCoverLetter: React.FC<TemplateProps> = ({ data, basics }) => {
   const { date, recipientName, recipientTitle, companyName, salutation, body, signoff } = data;

  return (
    <div className="p-8 text-xs font-sans text-gray-700 bg-white min-h-full flex flex-col">
      <header className="text-left mb-8 border-b pb-4 border-gray-200">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">{basics.name}</h1>
        <p className="text-lg text-gray-600 font-medium mt-1">{basics.label}</p>
        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-gray-500 text-sm">
          <span>{basics.email}</span>
          <span>&bull;</span>
          <span>{basics.phone}</span>
          <span>&bull;</span>
          <span>{basics.location.city}, {basics.location.region}</span>
          {basics.url && (
            <>
              <span>&bull;</span>
              <span>{basics.url}</span>
            </>
          )}
        </div>
      </header>

      <div className="flex-grow text-sm">
        <p className="mb-6">{date}</p>

        <div className="space-y-1 mb-6">
          <p className="font-bold text-gray-900">{recipientName}</p>
          <p>{recipientTitle}</p>
          <p>{companyName}</p>
        </div>

        <p className="mb-4 font-bold text-gray-900">{salutation}</p>

        <div className="space-y-4 mb-6">
          {body.map((p, i) => (
            <p key={i} className="text-justify leading-relaxed">{p}</p>
          ))}
        </div>

        <p className="mb-4">{signoff}</p>
        <p className="font-bold text-gray-900 text-base">{basics.name}</p>
      </div>
    </div>
  );
};

export default OnyxCoverLetter;
