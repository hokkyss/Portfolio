import type { Code, Paragraph, Text } from 'mdast';
import type { Plugin } from 'unified';
import type { Node, Parent } from 'unist';
import { visit } from 'unist-util-visit';

/**
 * Extend mdast Data interfaces with hast bridge properties.
 * These are used by `remark-rehype` to control the HTML output.
 */
declare module 'mdast' {
  interface ParagraphData {
    hName?: string;
    hProperties?: Record<string, unknown>;
  }
}

export const remarkMermaid: Plugin = () => {
  return (tree: Node) => {
    visit(tree, 'code', (node: Code, index: number | undefined, parent: Parent | undefined) => {
      if (node.lang === 'mermaid' && parent && typeof index === 'number') {
        const mermaidNode: Paragraph = {
          children: [
            {
              type: 'text',
              value: node.value,
            } as Text,
          ],
          data: {
            hName: 'div',
            hProperties: {
              className: 'markdown-mermaid',
              'data-chart': node.value,
            },
          },
          type: 'paragraph',
        };

        parent.children[index] = mermaidNode;
      }
    });
  };
};

export default remarkMermaid;
