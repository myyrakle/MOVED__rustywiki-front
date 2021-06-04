import unified from 'unified';
import markdown from 'remark-parse';
import html from 'remark-html';
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

export const customMarked = md;
