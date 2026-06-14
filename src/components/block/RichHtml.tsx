import type { HTMLAttributes } from 'react';
import { sanitizeHtml } from '../../utils/sanitize';

export function RichHtml({ html, className, ...props }: HTMLAttributes<HTMLDivElement> & { html: string }) {
  return <div {...props} className={className} dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }} />;
}
