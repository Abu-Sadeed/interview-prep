import type { HTMLAttributes } from 'react';

export function RichHtml({ html, className, ...props }: HTMLAttributes<HTMLDivElement> & { html: string }) {
  return <div {...props} className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
