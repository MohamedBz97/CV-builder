
import React from 'react';

const SVGIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    {props.children}
  </svg>
);

export const BriefcaseIcon: React.FC<{className?: string}> = ({className}) => (
  <SVGIcon className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.07a2.25 2.25 0 01-2.25 2.25H5.92a2.25 2.25 0 01-2.25-2.25v-4.07m16.5 0v-3.875a2.25 2.25 0 00-2.25-2.25H5.92a2.25 2.25 0 00-2.25 2.25v3.875m16.5 0a2.25 2.25 0 002.25-2.25V6.125a2.25 2.25 0 00-2.25-2.25H5.92a2.25 2.25 0 00-2.25 2.25v5.75a2.25 2.25 0 002.25 2.25m16.5 0v-3.875M5.92 14.15v-3.875" />
  </SVGIcon>
);

export const AcademicCapIcon: React.FC<{className?: string}> = ({className}) => (
    <SVGIcon className={className || "w-6 h-6"}>
      <path d="M12 14l9-5-9-5-9 5 9 5z" />
      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20M1 12v7a2 2 0 002 2h18a2 2 0 002-2v-7" />
    </SVGIcon>
);

export const SparklesIcon: React.FC<{className?: string}> = ({className}) => (
    <SVGIcon className={className || "w-6 h-6"}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 22.5l-.648-1.938a3.375 3.375 0 00-2.672-2.672L11.25 18l1.938-.648a3.375 3.375 0 002.672-2.672L16.25 13.5l.648 1.938a3.375 3.375 0 002.672 2.672L21 18l-1.938.648a3.375 3.375 0 00-2.672 2.672z" />
    </SVGIcon>
);

export const UserCircleIcon: React.FC<{className?: string}> = ({className}) => (
  <SVGIcon className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
  </SVGIcon>
);

export const DocumentTextIcon: React.FC<{className?: string}> = ({className}) => (
    <SVGIcon className={className || "w-6 h-6"}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </SVGIcon>
);

export const LightBulbIcon: React.FC<{className?: string}> = ({className}) => (
    <SVGIcon className={className || "w-6 h-6"}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.311a2.997 2.997 0 01-2.7 0l-.1.08a2.997 2.997 0 01-2.7 0m-4.498-4.498a12.06 12.06 0 010-4.5m-2.311 3.75a2.997 2.997 0 010-2.7l-.08-.1a2.997 2.997 0 010-2.7m7.478 7.478a12.06 12.06 0 014.5 0m2.311-3.75a2.997 2.997 0 010 2.7l.08.1a2.997 2.997 0 010 2.7m-4.498 4.498a12.06 12.06 0 010 4.5m-7.478-7.478a12.06 12.06 0 01-4.5 0m-2.311-3.75a2.997 2.997 0 010-2.7l.08-.1a2.997 2.997 0 010-2.7" />
    </SVGIcon>
);

export const PlusCircleIcon: React.FC<{className?: string}> = ({className}) => (
    <SVGIcon className={className || "w-6 h-6"}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </SVGIcon>
);

export const TrashIcon: React.FC<{className?: string}> = ({className}) => (
    <SVGIcon className={className || "w-6 h-6"}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.54 0c-.265.04-1.52.24-2.213.668m15.156 0A48.055 48.055 0 018.25 5.25m5.42 0a48.053 48.053 0 01-5.42 0m5.42 0a48.053 48.053 0 00-5.42 0" />
    </SVGIcon>
);
export const ArrowDownTrayIcon: React.FC<{className?: string}> = ({className}) => (
    <SVGIcon className={className || "w-6 h-6"}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </SVGIcon>
);

export const EyeIcon: React.FC<{className?: string}> = ({className}) => (
  <SVGIcon className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.432 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </SVGIcon>
);

export const PencilSquareIcon: React.FC<{className?: string}> = ({className}) => (
  <SVGIcon className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
  </SVGIcon>
);

export const CodeBracketIcon: React.FC<{className?: string}> = ({className}) => (
    <SVGIcon className={className || "w-6 h-6"}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
    </SVGIcon>
);

export const TrophyIcon: React.FC<{className?: string}> = ({className}) => (
    <SVGIcon className={className || "w-6 h-6"}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 001.056 4.637m7.888-4.637a9.75 9.75 0 01-1.056 4.637m0 0a9.004 9.004 0 01-7.888 0M12 2.25v.01M12 6.75v.01M12 11.25v.01M12 15.75v.01M3.75 6.75h16.5M3.75 11.25h16.5m-16.5 4.5h16.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 001.056 4.637m7.888-4.637a9.75 9.75 0 01-1.056 4.637m0 0a9.004 9.004 0 01-7.888 0M12 2.25v.01M12 6.75v.01M12 11.25v.01M12 15.75v.01M3.75 6.75h16.5M3.75 11.25h16.5m-16.5 4.5h16.5" />
    </SVGIcon>
);

export const DocumentCheckIcon: React.FC<{className?: string}> = ({className}) => (
    <SVGIcon className={className || "w-6 h-6"}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </SVGIcon>
);

export const HeartIcon: React.FC<{className?: string}> = ({className}) => (
    <SVGIcon className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </SVGIcon>
);

export const BookOpenIcon: React.FC<{className?: string}> = ({className}) => (
    <SVGIcon className={className || "w-6 h-6"}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </SVGIcon>
);

export const LanguageIcon: React.FC<{className?: string}> = ({className}) => (
    <SVGIcon className={className || "w-6 h-6"}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C13.18 7.061 14.12 7 15 7c.878 0 1.797.06 2.666.174m-6.332 2.174A48.47 48.47 0 016 7.5c-1.12 0-2.233-.038-3.334-.114M9 7.5V15m3.334-7.136C13.18 7.939 14.12 8 15 8c.878 0 1.797-.06 2.666-.174m0 0a48.47 48.47 0 00-6.332-2.174m0 0a48.47 48.47 0 016.332 2.174" />
    </SVGIcon>
);

export const FaceSmileIcon: React.FC<{className?: string}> = ({className}) => (
    <SVGIcon className={className || "w-6 h-6"}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9 9.75h.008v.008H9V9.75zm6 0h.008v.008H15V9.75z" />
    </SVGIcon>
);

export const UsersIcon: React.FC<{className?: string}> = ({className}) => (
    <SVGIcon className={className || "w-6 h-6"}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.542 2.72c-3.142-.4-6.282-1.2-9.423-2.33a3 3 0 01-1.34-2.81V7.72c0-1.242.6-2.35 1.5-3.032.9-.68 2.05-1.135 3.25-1.488.42-.127.85-.24 1.28-.344 1.08-.28 2.22-.42 3.36-.42s2.28.14 3.36.42c.43.104.86.217 1.28.344 1.2.353 2.35.808 3.25 1.488.9.682 1.5 1.79 1.5 3.032v4.24c0 1.13-1.04 2.13-2.37 2.65a48.422 48.422 0 01-9.15 2.147zM12 12.75a3 3 0 100-6 3 3 0 000 6z" />
    </SVGIcon>
);

export const MagnifyingGlassCircleIcon: React.FC<{className?: string}> = ({className}) => (
  <SVGIcon className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </SVGIcon>
);

export const ChevronDoubleLeftIcon: React.FC<{className?: string}> = ({className}) => (
  <SVGIcon className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
  </SVGIcon>
);

export const Bars3Icon: React.FC<{className?: string}> = ({className}) => (
    <SVGIcon className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </SVGIcon>
);

export const XMarkIcon: React.FC<{className?: string}> = ({className}) => (
    <SVGIcon className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </SVGIcon>
);

export const CloudArrowUpIcon: React.FC<{className?: string}> = ({className}) => (
  <SVGIcon className={className || "w-6 h-6"}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
  </SVGIcon>
);

export const CheckCircleIcon: React.FC<{className?: string}> = ({className}) => (
  <SVGIcon className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </SVGIcon>
);

export const ShieldCheckIcon: React.FC<{className?: string}> = ({className}) => (
  <SVGIcon className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c1.268 0 2.39-.63 3.068-1.593a3.746 3.746 0 013.296-1.043 3.746 3.746 0 011.043-3.296A3.745 3.745 0 0121 12z" />
  </SVGIcon>
);

export const BoltIcon: React.FC<{className?: string}> = ({className}) => (
  <SVGIcon className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </SVGIcon>
);
