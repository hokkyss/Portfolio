import { createServerFn } from '@tanstack/react-start';
import { renderServerComponent } from '@tanstack/react-start/rsc';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { renderMarkdownRequestDto } from '../dto/render-markdown.dto';

const renderMarkdownFunction = createServerFn({
  method: 'GET',
})
  .inputValidator(renderMarkdownRequestDto)
  .handler(({ data }) => {
    return renderServerComponent(
      <ReactMarkdown rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]}>
        {data.content}
      </ReactMarkdown>,
    );
  });

export default renderMarkdownFunction;
