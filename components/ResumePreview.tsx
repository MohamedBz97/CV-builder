
import React from 'react';
import { ResumeSchema, Template, SectionKey } from '../types';
import ClassicTemplate from './templates/ClassicTemplate';
import ModernTemplate from './templates/ModernTemplate';
import OnyxTemplate from './templates/OnyxTemplate';
import PikachuTemplate from './templates/PikachuTemplate';


interface ResumePreviewProps {
  resumeData: ResumeSchema;
  template: Template;
  sectionOrder: SectionKey[];
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData, template, sectionOrder }) => {
  const renderTemplate = () => {
    const props = { data: resumeData, sectionOrder: sectionOrder };
    switch (template) {
      case Template.MODERN:
        return <ModernTemplate {...props} />;
      case Template.ONYX:
        return <OnyxTemplate {...props} />;
      case Template.PIKACHU:
        return <PikachuTemplate {...props} />;
      case Template.CLASSIC:
      default:
        return <ClassicTemplate {...props} />;
    }
  };

  return (
    <div className="bg-white shadow-lg w-full max-w-[816px] min-h-[1056px] mx-auto relative">
      {renderTemplate()}
    </div>
  );
};

export default ResumePreview;
