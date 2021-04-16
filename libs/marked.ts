import markdown from 'markdown-it';
import wikiLinkPlugin from '@ig3/markdown-it-wikilinks';
const md = markdown().use(
  wikiLinkPlugin({
    baseURL: '/d/wiki/',
    uriSuffix: '',
    // linkPattern: /\[\[([\w\s가-힣一-龯\\#+)(/]+)(\|([\w\s가-힣一-龯\\#+)(/]+))?\]\]/,
    // linkPattern: /\[\[(.*?)\]\]/,
  })
);

export const customMarked = md;
