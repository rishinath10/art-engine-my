import { User, LayoutGrid, FolderOpen, FileText, Mail, Rocket, type LucideIcon } from 'lucide-react';

export interface NavNode {
  id: string;
  index: string;
  label: string;
  shortLabel: string;
  subtitle: string;
  path: string;
  icon: LucideIcon;
  previewLabel: string;
  previewText: string;
  angle: number;
}

export const navNodes: NavNode[] = [
  {
    id: 'about',
    index: '01',
    label: 'About Us',
    shortLabel: 'About',
    subtitle: 'Who We Are',
    path: '/about',
    icon: User,
    previewLabel: 'Who We Are',
    previewText: 'A creative technology partner blending strategy, design and technology into meaningful digital experiences.',
    angle: -90,
  },
  {
    id: 'services',
    index: '02',
    label: 'Services',
    shortLabel: 'Services',
    subtitle: 'What We Do',
    path: '/services',
    icon: LayoutGrid,
    previewLabel: 'What We Do',
    previewText: 'Digital solutions designed to move businesses forward.',
    angle: -30,
  },
  {
    id: 'work',
    index: '03',
    label: 'Our Work',
    shortLabel: 'Work',
    subtitle: 'Real Impact',
    path: '/work',
    icon: FolderOpen,
    previewLabel: 'Real Impact',
    previewText: 'Projects that turned ambitious ideas into measurable results.',
    angle: 30,
  },
  {
    id: 'insights',
    index: '04',
    label: 'Insights',
    shortLabel: 'Insights',
    subtitle: 'Ideas & Trends',
    path: '/insights',
    icon: FileText,
    previewLabel: 'Ideas & Trends',
    previewText: 'Perspectives on AI, digitalization and the future of digital experience.',
    angle: 90,
  },
  {
    id: 'contact',
    index: '05',
    label: 'Contact',
    shortLabel: 'Contact',
    subtitle: "Let's Create",
    path: '/contact',
    icon: Mail,
    previewLabel: "Let's Create",
    previewText: "Have a project in mind? We'd love to hear from you.",
    angle: 150,
  },
  {
    id: 'start-a-project',
    index: '06',
    label: 'Start a Project',
    shortLabel: 'Start',
    subtitle: 'Turn Ideas Into Reality',
    path: '/start-a-project',
    icon: Rocket,
    previewLabel: 'Turn Ideas Into Reality',
    previewText: "Tell us what you're building — we'll help you build it right.",
    angle: -150,
  },
];
