import tw from '@portfolio/design-system/tw';
import { createServerFn } from '@tanstack/react-start';
import { renderServerComponent } from '@tanstack/react-start/rsc';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGemoji from 'remark-gemoji';
import remarkGfm from 'remark-gfm';
import { renderMarkdownRequestDto } from '../dto/render-markdown.dto';

const renderMarkdownFunction = createServerFn({
  method: 'GET',
})
  .inputValidator(renderMarkdownRequestDto)
  .handler(({ data }) => {
    return renderServerComponent(
      <article className={tw`prose prose-neutral dark:prose-invert max-w-none`}>
        <ReactMarkdown rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm, remarkGemoji]}>
          {data.content}
        </ReactMarkdown>
      </article>,
    );
  });

export default renderMarkdownFunction;
