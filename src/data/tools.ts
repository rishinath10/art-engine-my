import {
  siN8n,
  siZapier,
  siMake,
  siAirtable,
  siNotion,
  siHubspot,
  siRetool,
  siLangchain,
  siCursor,
  siClaude,
  siClaudecode,
  siDeepseek,
  siMetaai,
  siBlender,
  siCinema4d,
  siFigma,
} from 'simple-icons';

export interface Tool {
  name: string;
  /** monochrome brand glyph, where the brand publishes one openly */
  path?: string;
  /** typographic fallback for brands with no open mark */
  initials?: string;
}

/**
 * Brand marks come from the open Simple Icons set. Adobe, Canva and OpenAI
 * withdrew theirs from it, and several of the newer agent tools have none, so
 * those render as typographic tiles instead — supply an SVG and they can be
 * swapped in.
 */
export const tools: Record<string, Tool> = {
  n8n: { name: 'n8n', path: siN8n.path },
  zapier: { name: 'Zapier', path: siZapier.path },
  make: { name: 'Make', path: siMake.path },
  sleekflow: { name: 'SleekFlow', initials: 'SF' },
  powerAutomate: { name: 'Power Automate', initials: 'PA' },
  airtable: { name: 'Airtable', path: siAirtable.path },
  notion: { name: 'Notion', path: siNotion.path },
  hubspot: { name: 'HubSpot', path: siHubspot.path },
  retool: { name: 'Retool', path: siRetool.path },

  claudeCode: { name: 'Claude Code', path: siClaudecode.path },
  claude: { name: 'Claude', path: siClaude.path },
  codex: { name: 'Codex', initials: 'CX' },
  deepseek: { name: 'DeepSeek', path: siDeepseek.path },
  hermes: { name: 'Hermes AI', initials: 'HA' },
  openClaw: { name: 'OpenClaw', initials: 'OC' },
  metaMuse: { name: 'Meta Muse', path: siMetaai.path },
  langchain: { name: 'LangChain', path: siLangchain.path },
  cursor: { name: 'Cursor', path: siCursor.path },

  photoshop: { name: 'Photoshop', initials: 'Ps' },
  illustrator: { name: 'Illustrator', initials: 'Ai' },
  indesign: { name: 'InDesign', initials: 'Id' },
  afterEffects: { name: 'After Effects', initials: 'Ae' },
  canva: { name: 'Canva', initials: 'Cv' },
  blender: { name: 'Blender', path: siBlender.path },
  cinema4d: { name: 'Cinema 4D', path: siCinema4d.path },
  figma: { name: 'Figma', path: siFigma.path },
};

export type ToolId = keyof typeof tools;
