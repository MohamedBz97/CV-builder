import React from 'react';
import { CoverLetterSchema, Basics, Template } from '../types';
import ClassicCoverLetter from './templates/ClassicCoverLetter';
import ModernCoverLetter from './templates/ModernCoverLetter';
import OnyxCoverLetter from './templates/OnyxCoverLetter';
import PikachuCoverLetter from './templates/PikachuCoverLetter';

interface CoverLetterPreviewProps {
  coverLetterData: CoverLetterSchema;
  basics: Basics;
  template?: Template;
}

const CoverLetterPreview: React.FC<CoverLetterPreviewProps> = ({ coverLetterData, basics, template = Template.CLASSIC }) => {
    
  const renderTemplate = () => {
    const props = { data: coverLetterData, basics: basics };
    switch (template) {
      case Template.MODERN:
        return <ModernCoverLetter {...props} />;
      case Template.ONYX:
        return <OnyxCoverLetter {...props} />;
      case Template.PIKACHU:
        return <PikachuCoverLetter {...props} />;
      case Template.CLASSIC:
      default:
        return <ClassicCoverLetter {...props} />;
    }
  };

  return (
    <div className="bg-white shadow-lg aspect-[8.5/11] w-full max-w-[816px] mx-auto overflow-hidden">
      {renderTemplate()}
    </div>
  );
};

export default CoverLetterPreview;