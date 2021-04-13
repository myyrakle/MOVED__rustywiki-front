import markdown from 'markdown-it';
import wikiLinkPlugin from 'markdown-it-wikilinks';

const md = markdown().use(
  wikiLinkPlugin({ baseURL: '/d/wiki/', uriSuffix: '' })
);

export const customMarked = md;
