import unified from 'unified';
import markdown from 'remark-parse';
import html from 'remark-html';
import * as remarkWikiLink from 'remark-wiki-link';
import * as footnotes from 'remark-footnotes';
const md = unified()
  .use(markdown)
  .use(footnotes.default)
  .use(remarkWikiLink.wikiLinkPlugin, {
    hrefTemplate: (permalink: string) => `/d/wiki/${permalink}`,
    aliasDivider: '|',
  })
  .use(html, { sanitize: true });

export const customMarked = md;
