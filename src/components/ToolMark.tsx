import { motion } from 'framer-motion';
import { tools, type ToolId } from '../data/tools';

/**
 * One tool in a capability row: a monochrome brand glyph where the brand
 * publishes one, a typographic tile where it doesn't. Both sit in the same
 * frame so a mixed row still reads as a set.
 */
export function ToolMark({ id, index = 0 }: { id: ToolId; index?: number }) {
  const tool = tools[id];
  if (!tool) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="group/tool flex items-center gap-2.5"
      title={tool.name}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/70 bg-white/60 backdrop-blur-md transition-colors duration-500 group-hover/tool:border-purple/30">
        {tool.path ? (
          <svg
            viewBox="0 0 24 24"
            className="h-[15px] w-[15px] fill-navy/70 transition-colors duration-500 group-hover/tool:fill-purple"
            aria-hidden="true"
          >
            <path d={tool.path} />
          </svg>
        ) : (
          <span className="font-sans text-[10px] font-medium tracking-tight text-navy/70 transition-colors duration-500 group-hover/tool:text-purple">
            {tool.initials}
          </span>
        )}
      </span>
      <span className="whitespace-nowrap font-sans text-[11px] font-light tracking-wide text-muted transition-colors duration-500 group-hover/tool:text-navy">
        {tool.name}
      </span>
    </motion.div>
  );
}
