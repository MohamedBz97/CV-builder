import React, { useRef } from 'react';
import { ResumeLayout, SectionKey } from '../types';
import ManageSectionsModal from './ManageSectionsModal';
import { UserCircleIcon, BriefcaseIcon, AcademicCapIcon, LightBulbIcon, CodeBracketIcon, TrophyIcon, DocumentCheckIcon, HeartIcon, BookOpenIcon, LanguageIcon, FaceSmileIcon, UsersIcon, ChevronDoubleLeftIcon } from './icons';

interface SectionSidebarProps {
  layout: ResumeLayout;
  setLayout: React.Dispatch<React.SetStateAction<ResumeLayout>>;
  activeSection: SectionKey | 'basics';
  setActiveSection: (section: SectionKey | 'basics') => void;
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}

const sectionIcons: { [key in SectionKey | 'basics']: React.ReactNode } = {
  basics: <UserCircleIcon className="w-5 h-5" />,
  work: <BriefcaseIcon className="w-5 h-5" />,
  education: <AcademicCapIcon className="w-5 h-5" />,
  skills: <LightBulbIcon className="w-5 h-5" />,
  projects: <CodeBracketIcon className="w-5 h-5" />,
  awards: <TrophyIcon className="w-5 h-5" />,
  certificates: <DocumentCheckIcon className="w-5 h-5" />,
  volunteer: <HeartIcon className="w-5 h-5" />,
  publications: <BookOpenIcon className="w-5 h-5" />,
  languages: <LanguageIcon className="w-5 h-5" />,
  interests: <FaceSmileIcon className="w-5 h-5" />,
  references: <UsersIcon className="w-5 h-5" />,
};

const SectionSidebar: React.FC<SectionSidebarProps> = ({ layout, setLayout, activeSection, setActiveSection, isCollapsed, setIsCollapsed }) => {
  const [isManageModalOpen, setIsManageModalOpen] = React.useState(false);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, position: number) => {
    dragItem.current = position;
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnter = (e: React.DragEvent<HTMLLIElement>, position: number) => {
    dragOverItem.current = position;
    const list = [...layout.sectionOrder];
    const dragItemContent = list[dragItem.current!];
    list.splice(dragItem.current!, 1);
    list.splice(dragOverItem.current!, 0, dragItemContent);
    dragItem.current = dragOverItem.current;
    setLayout(prev => ({ ...prev, sectionOrder: list }));
  };

  const handleDragEnd = () => {
    dragItem.current = null;
    dragOverItem.current = null;
  };
  
  const allSections: (SectionKey | 'basics')[] = ['basics', ...layout.sectionOrder];

  return (
    <aside className={`bg-neutral-100 border-r border-neutral-200 p-4 flex flex-col transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <h2 className={`text-lg font-bold text-neutral-700 mb-4 transition-opacity ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
        {isCollapsed ? '' : 'Resume Sections'}
      </h2>
      <ul className="flex-grow space-y-1">
        {allSections.map((key, index) => {
          const section = key === 'basics' ? { id: 'basics', name: 'Basic Information', enabled: true } : layout.sections[key];
          if (!section || !section.enabled) return null;

          return (
            <li
              key={key}
              title={isCollapsed ? section.name : ''}
              draggable={!isCollapsed && key !== 'basics'}
              onDragStart={(e) => handleDragStart(e, index - 1)}
              onDragEnter={(e) => handleDragEnter(e, index - 1)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => setActiveSection(key)}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isCollapsed ? 'justify-center' : ''} ${
                activeSection === key
                  ? 'bg-secondary text-white shadow-sm'
                  : 'text-neutral-600 hover:bg-neutral-200 hover:text-neutral-800'
              } ${key !== 'basics' ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'}`}
            >
              {sectionIcons[key]}
              {!isCollapsed && <span>{section.name}</span>}
            </li>
          );
        })}
      </ul>
      <div className="mt-4 pt-4 border-t border-neutral-200 space-y-2">
        <button
          onClick={() => setIsManageModalOpen(true)}
          className={`w-full px-4 py-2 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 font-semibold flex items-center gap-2 ${isCollapsed ? 'justify-center' : ''}`}
        >
          {!isCollapsed && <span>Manage Sections</span>}
        </button>
         <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`w-full px-4 py-2 text-neutral-500 rounded-lg hover:bg-neutral-200 font-semibold flex items-center gap-2 ${isCollapsed ? 'justify-center' : ''}`}
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
            <ChevronDoubleLeftIcon className={`w-5 h-5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>
      {isManageModalOpen && (
        <ManageSectionsModal
          layout={layout}
          setLayout={setLayout}
          onClose={() => setIsManageModalOpen(false)}
        />
      )}
    </aside>
  );
};

export default SectionSidebar;