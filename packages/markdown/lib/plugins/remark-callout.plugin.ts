import type { Blockquote, Paragraph, Text } from 'mdast';
import type { Plugin } from 'unified';
import type { Node } from 'unist';
import { visit } from 'unist-util-visit';

/**
 * Extend mdast Data interfaces with hast bridge properties.
 * These are used by `remark-rehype` to control the HTML output.
 */
declare module 'mdast' {
  interface BlockquoteData {
    hName?: string;
    hProperties?: Record<string, unknown>;
  }

  interface ParagraphData {
    hName?: string;
    hProperties?: Record<string, unknown>;
  }
}

const REGEX = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\](?: (.*))?$/im;

export const remarkCallout: Plugin = () => {
  return (tree: Node) => {
    visit(tree, 'blockquote', (node: Blockquote) => {
      if (node.children.length > 0 && node.children[0].type === 'paragraph') {
        const p = node.children[0];
        if (p.children.length > 0 && p.children[0].type === 'text') {
          const textNode = p.children[0];
          const match = textNode.value.match(REGEX);

          if (match) {
            const type = match[1].toLowerCase();
            const customTitle = match[2]?.trim();

            node.data = {
              hName: 'div',
              hProperties: {
                className: 'markdown-callout',
                'data-callout-type': type,
              },
            };

            textNode.value = textNode.value.replace(REGEX, '').trim();

            const titleContent = customTitle || type.toUpperCase();

            const titleText: Text = { type: 'text', value: titleContent };

            const titleNode: Paragraph = {
              children: [titleText],
              data: {
                hName: 'div',
                hProperties: { className: 'markdown-callout-title' },
              },
              type: 'paragraph',
            };

            if (textNode.value === '') {
              p.children.shift();
            }

            const descriptionNode: Blockquote = {
              children: [...node.children],
              data: {
                hName: 'div',
                hProperties: { className: 'markdown-callout-description' },
              },
              type: 'blockquote',
            };

            if (p.children.length === 0) {
              descriptionNode.children.shift();
            }

            node.children = [titleNode, descriptionNode];
          }
        }
      }
    });
  };
};
