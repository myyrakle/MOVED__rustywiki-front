import markdown from 'markdown-it';
import wikiLinkPlugin from '@ig3/markdown-it-wikilinks';

//TODO:  특수문자 encodeURIComponent처리 필요
const md = markdown().use(
  wikiLinkPlugin({
    baseURL: '/d/wiki/',
    uriSuffix: '',
    linkPattern: /\[\[([\w\s가-힣一-龯#+)(/]+)(\|([\w\s가-힣一-龯#+)(/]+))?\]\]/,
  })
);

export const customMarked = md;
