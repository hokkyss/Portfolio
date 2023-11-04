'use server';

import 'server-only';

import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

import { cn, tw } from '~/_common/utils/classname.util';

interface MarkdownProps {
  allowedElements?: (keyof JSX.IntrinsicElements)[];
  children: string;
}

export default async function Markdown(props: MarkdownProps) {
  const { allowedElements, children } = props;

  return (
    <ReactMarkdown
      components={{
        h1: ({ className, node, ...props }) => (
          <h1 className={cn(tw`text-lg font-bold`, className)} data-node={node} {...props} />
        ),
        ol: ({ className, node, ...props }) => (
          <ol className={cn(tw`list-inside list-decimal`, className)} data-node={node} {...props} />
        ),
        ul: ({ className, node, ...props }) => (
          <ul className={cn(tw`list-inside list-disc`, className)} data-node={node} {...props} />
        ),
      }}
      allowedElements={allowedElements}
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkGfm]}
    >
      {children}
    </ReactMarkdown>
  );
}
