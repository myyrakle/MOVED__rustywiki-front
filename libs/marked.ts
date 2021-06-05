import unified from 'unified';
import markdown from 'remark-parse';
import html from 'remark-html';
import u from 'unist-builder';
import * as remarkWikiLink from 'remark-wiki-link';
import * as footnotes from 'remark-footnotes';

const md = unified()
  .use(markdown)
  .use(remarkWikiLink.wikiLinkPlugin, {
    hrefTemplate: (permalink: string) => `/d/wiki/${permalink}`,
    aliasDivider: '|',
  })
  .use(footnotes.default, { inlineNotes: true })
  .use(html, {
    sanitize: { clobberPrefix: '' },
  });

const threadMd = unified()
  .use(markdown)
  .use(remarkWikiLink.wikiLinkPlugin, {
    hrefTemplate: (permalink: string) => `/d/wiki/${permalink}`,
    aliasDivider: '|',
  })
  .use(html, {
    sanitize: { clobberPrefix: '' },
    handlers: {
      heading(h, node) {
        return h(node, '', {}, [{ type: 'text', value: node.value }]);
      },
      text(h, node) {
        const str = node.value as string;
        const iter = Array.from(str.matchAll(/#\d/g));
        const nodes = str.split(/#\d/);
        const reduced = nodes.reduce<any[]>((pre, cur, i) => {
          pre.push(u('text', cur));
          if (iter[i]) {
            pre.push(
              h(node, 'a', { href: iter[i][0] }, [u('text', iter[i][0])])
            );
          }
          return pre;
        }, []);
        return h(node, '', {}, reduced);
      },
    },
  });

export const contentMark = md;

export const threadMark = threadMd;
