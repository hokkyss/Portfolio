import tw from '@portfolio/design-system/tw';
import remarkCallout from '@portfolio/markdown/callout';
import { createServerFn } from '@tanstack/react-start';
import { renderServerComponent } from '@tanstack/react-start/rsc';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGemoji from 'remark-gemoji';
import remarkGfm from 'remark-gfm';
import MarkdownCallout from '../components/markdown-callout.component';
import { renderMarkdownRequestDto } from '../dto/render-markdown.dto';

const renderMarkdownFunction = createServerFn({
  method: 'GET',
})
  .inputValidator(renderMarkdownRequestDto)
  .handler(({ data }) => {
    return renderServerComponent(
      <article className={tw`prose prose-neutral dark:prose-invert black-eagles:prose-rose black-eagles:prose-invert blue-lions:prose-blue blue-lions:prose-invert golden-deer:prose-amber max-w-none`}>
        <ReactMarkdown
          components={{
            div: MarkdownCallout,
          }}
          rehypePlugins={[rehypeHighlight]}
          remarkPlugins={[remarkGfm, remarkGemoji, remarkCallout]}
        >
          {data.content}
        </ReactMarkdown>
      </article>,
    );
  });

export default renderMarkdownFunction;
