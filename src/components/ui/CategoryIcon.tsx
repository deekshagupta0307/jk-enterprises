import React from 'react';

interface CategoryIconProps {
  slug: string;
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ slug, className = 'w-5 h-5' }) => {
  switch (slug) {
    case 'keyboards':
    case 'gaming-keyboards':
      // Keyboard
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M8 16h8" />
        </svg>
      );

    case 'mice':
    case 'gaming-mice':
      // Computer Mouse
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
          <rect x="6" y="3" width="12" height="18" rx="6" />
          <line x1="12" y1="3" x2="12" y2="9" />
        </svg>
      );

    case 'keyboard-mouse-combos':
      // Desktop Combo
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="6" width="13" height="12" rx="2" />
          <path d="M5 10h.01M8 10h.01M11 10h.01M5 14h6" />
          <rect x="17" y="8" width="5" height="10" rx="2.5" />
          <line x1="19.5" y1="8" x2="19.5" y2="12" />
        </svg>
      );

    case 'mouse-pads':
      // Desk Mat / Mouse Pad
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <circle cx="17" cy="12" r="2" />
        </svg>
      );

    case 'usb-hubs-docks':
      // USB Hub / Docking Station
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <line x1="7" y1="12" x2="7.01" y2="12" strokeWidth={2.5} />
          <line x1="12" y1="12" x2="12.01" y2="12" strokeWidth={2.5} />
          <line x1="17" y1="12" x2="17.01" y2="12" strokeWidth={2.5} />
          <path d="M12 18v3m-3 0h6" />
        </svg>
      );

    case 'webcams':
      // Webcam / Conferencing
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="10" rx="3" />
          <circle cx="12" cy="9" r="2.5" />
          <path d="M12 14v4m-4 2h8" />
        </svg>
      );

    case 'pc-cabinets':
      // Tower Chassis
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" />
          <circle cx="12" cy="6" r="1" fill="currentColor" />
          <line x1="9" y1="10" x2="15" y2="10" />
          <line x1="9" y1="14" x2="15" y2="14" />
          <line x1="9" y1="18" x2="15" y2="18" />
        </svg>
      );

    case 'pc-power-supplies':
    case 'power-strips':
    case 'ups-power':
      // Power / Electricity
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );

    case 'monitors':
      // Display / Monitor
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      );

    case 'barcode-scanners':
      // Barcode Scanner / Barcode
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 5v14M7 5v14M11 5v14M15 5v14M17 5v14M21 5v14" />
          <line x1="2" y1="12" x2="22" y2="12" stroke="#ef4444" strokeWidth={1.5} />
        </svg>
      );

    case 'laptop-bags-backpacks':
      // Backpack / Briefcase
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 8a4 4 0 0 1 8 0v1" />
          <rect x="4" y="9" width="16" height="13" rx="2" />
          <path d="M9 13h6" />
        </svg>
      );

    case 'headsets-audio':
    case 'gaming-headsets':
      // Headset / Audio
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
        </svg>
      );

    case 'gaming-accessories':
      // Gamepad
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
          <line x1="6" y1="12" x2="10" y2="12" />
          <line x1="8" y1="10" x2="8" y2="14" />
          <circle cx="15" cy="11" r="1" fill="currentColor" />
          <circle cx="17" cy="13" r="1" fill="currentColor" />
          <path d="M18 11l-1.5-6a2 2 0 0 0-2-1.5H9.5a2 2 0 0 0-2 1.5L6 11a4.5 4.5 0 0 0 3 5.5l1.5.5a2 2 0 0 0 2-1l.5-1h2l.5 1a2 2 0 0 0 2 1l1.5-.5a4.5 4.5 0 0 0 3-5.5z" />
        </svg>
      );

    case 'processors':
      // Microprocessor / CPU icon
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="8.5" y="8.5" width="7" height="7" rx="1" />
          <path d="M4 9H2m2 6H2m18-6h2m-2 6h2M9 4V2m6 2V2m-6 18v2m6-2v2" />
        </svg>
      );
    case 'storage':
      // NVMe SSD / Storage Drive
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <circle cx="7.5" cy="12" r="1.5" />
          <path d="M13 12h5" />
          <path d="M13 8h5" />
          <path d="M13 16h5" />
        </svg>
      );
    case 'memory':
      // RAM Stick
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 7h18v10H3z" />
          <path d="M6 10v4m4-4v4m4-4v4m4-4v4" />
          <path d="M7 17v2m3-2v2m4-2v2m3-2v2" />
          <path d="M6 7V5m12 2V5" />
        </svg>
      );
    case 'systems':
      // Workstation / Desktop Tower & Monitor
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="14" height="12" rx="2" />
          <path d="M6 18h6m-3-3v3" />
          <rect x="18" y="5" width="4" height="14" rx="1" />
          <circle cx="20" cy="8" r="0.75" fill="currentColor" />
          <line x1="19.5" y1="12" x2="20.5" y2="12" />
        </svg>
      );
    case 'networking':
      // Network switch / Hub / Router
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="6" width="20" height="8" rx="2" />
          <circle cx="6" cy="10" r="1" fill="currentColor" />
          <circle cx="10" cy="10" r="1" fill="currentColor" />
          <circle cx="14" cy="10" r="1" fill="currentColor" />
          <path d="M18 10h.01" />
          <path d="M6 14v4m6-4v4m6-4v4" />
          <path d="M3 18h18" />
        </svg>
      );
    case 'cctv-security':
      // Surveillance Camera / Shield
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a9 9 0 0 0-9 9c0 5 9 11 9 11s9-6 9-11a9 9 0 0 0-9-9z" />
          <circle cx="12" cy="11" r="3" />
        </svg>
      );
    case 'printers':
      // Office Laser Printer
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9V4h12v5" />
          <rect x="4" y="9" width="16" height="8" rx="2" />
          <path d="M6 15h12v5H6z" />
          <circle cx="17" cy="12" r="1" fill="currentColor" />
        </svg>
      );
    case 'military-outdoor':
    case 'tactical-bags-backpacks':
    case 'outdoor-boots-footwear':
    case 'tactical-apparel':
    case 'camping-survival-gear':
    case 'military-accessories-gear':
      // Tactical / Mountain / Compass / Field Gear
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19L12 5L20 19H4Z" />
          <path d="M9 19L12 13L15 19" />
          <circle cx="12" cy="10" r="1" fill="currentColor" />
        </svg>
      );

    case 'cables-connectivity':
    case 'cables':
    case 'connectivity':
    case 'adapters-converters':
      // Cables / Video / Plugs / Connectors
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 6h4a2 2 0 0 1 2 2v8a2 2 0 0 0 2 2h4" />
          <path d="M2 4v4m0-2h2M22 16v4m0-2h-2" />
          <rect x="18" y="15" width="4" height="6" rx="1" />
          <rect x="2" y="3" width="4" height="6" rx="1" />
        </svg>
      );

    case 'stationery-office':
    case 'office-supplies':
    case 'office-stationery-paper':
    case 'files-folders-storage':
      // Stationery Dossier / Notepad / Pen
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      );

    case 'furnishing-carpets':
    case 'commercial-carpets-rugs':
    case 'office-furniture-seating':
    case 'carpets':
    case 'office-furnishings':
      // Commercial Seating / Armchair / Carpets
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 19v2m12-2v2" />
          <path d="M4 11a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6z" />
          <path d="M6 9V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3" />
          <line x1="4" y1="15" x2="20" y2="15" />
        </svg>
      );

    case 'peripherals':
    case 'computer-peripherals':
    case 'laptop-accessories':
    case 'workspace-accessories':
      // Business Display / Monitor & Mouse
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="16" height="12" rx="2" />
          <path d="M7 19h6m-3-3v3" />
          <rect x="19" y="10" width="3" height="6" rx="1.5" />
        </svg>
      );
    default:
      // General equipment / Box
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      );
  }
};
