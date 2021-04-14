import markdown from 'markdown-it';
import wikiLinkPlugin from '@ig3/markdown-it-wikilinks';
const md = markdown().use(
  wikiLinkPlugin({
    baseURL: '/d/wiki/',
    uriSuffix: '',
    // linkPattern: /\[\[([\w\s/]+)(\|([\w\s/]+))?\]\]/,
  })
);

export const customMarked = md;
