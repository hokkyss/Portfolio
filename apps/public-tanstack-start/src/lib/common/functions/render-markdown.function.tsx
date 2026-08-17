import cn from '@portfolio/design-system/cn';
import tw from '@portfolio/design-system/tw';
import remarkCallout from '@portfolio/markdown/callout';
import remarkMermaid from '@portfolio/markdown/mermaid';
import { createServerFn } from '@tanstack/react-start';
import { renderServerComponent } from '@tanstack/react-start/rsc';
import { setResponseHeader } from '@tanstack/react-start/server';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import remarkGemoji from 'remark-gemoji';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import MarkdownCallout from '../components/markdown-callout.component';
import MarkdownMermaid from '../components/markdown-mermaid.component';
import { renderMarkdownRequestDto } from '../dto/render-markdown.dto';

const renderMarkdownFunction = createServerFn({
  method: 'GET',
})
  .inputValidator(renderMarkdownRequestDto)
  .handler(({ data }) => {
    // server side/edge cache for 30 days
    setResponseHeader('X-Cache-Maxage', '2592000');
    // client side cache is valid for 7 days
    setResponseHeader('X-Stale-After', '604800');

    return renderServerComponent(
      <article className={tw`prose prose-neutral dark:prose-invert black-eagles:prose-rose black-eagles:prose-invert blue-lions:prose-blue blue-lions:prose-invert golden-deer:prose-amber max-w-none`}>
        <ReactMarkdown
          components={{
            a: (props) => (
              <a {...props} rel="noopener noreferrer" target="_blank" />
            ),
            div: (props) => {
              if (props.className === 'markdown-mermaid') {
                const chart = (props['data-chart'] as string | undefined) || (typeof props.children === 'string' ? props.children : '');
                return <MarkdownMermaid chart={chart} />;
              }
              return <MarkdownCallout {...props} />;
            },
            pre: ({ className, ...props }) => (
              <pre className={cn(tw`grid`, className)} {...props} />
            ),
          }}
          rehypePlugins={[
            [rehypeHighlight, { ignoreMissing: true }],
            rehypeKatex,
          ]}
          remarkPlugins={[
            remarkGfm,
            remarkGemoji,
            remarkMath,
            remarkCallout,
            remarkMermaid,
          ]}
        >
          {data.content}
        </ReactMarkdown>
      </article>,
    );
  });

export default renderMarkdownFunction;
