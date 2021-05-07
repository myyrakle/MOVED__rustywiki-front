/* eslint-disable no-useless-escape */
import * as React from 'react';

import { css } from '@emotion/react';
import * as monaco from 'monaco-editor';

monaco.languages.register({ id: 'markdown-custom' });
monaco.languages.setMonarchTokensProvider('markdown-custom', {
  // escape codes
  control: /[\\`*_\[\]{}()#+\-\.!]/,
  noncontrol: /[^\\`*_\[\]{}()#+\-\.!]/,
  escapes: /\\(?:@control)/,

  // escape codes for javascript/CSS strings
  jsescapes: /\\(?:[btnfr\\"']|[0-7][0-7]?|[0-3][0-7]{2})/,

  // non matched elements
  empty: [
    'area',
    'base',
    'basefont',
    'br',
    'col',
    'frame',
    'hr',
    'img',
    'input',
    'isindex',
    'link',
    'meta',
    'param',
  ],

  tokenizer: {
    root: [
      // headers (with #)
      [
        /^(\s{0,3})(#+)((?:[^\\#]|@escapes)+)((?:#+)?)/,
        ['white', 'keyword', 'keyword', 'keyword'],
      ],

      // headers (with =)
      [/^\s*(=+|\-+)\s*$/, 'keyword'],

      // headers (with ***)
      [/^\s*((\*[ ]?)+)\s*$/, 'meta.separator'],

      // quote
      [/^\s*>+/, 'comment'],

      // list (starting with * or number)
      [/^\s*([\*\-+:]|\d+\.)\s/, 'keyword'],

      // code block (4 spaces indent)
      [/^(\t|[ ]{4})[^ ].*$/, 'string'],

      // code block (3 tilde)
      [
        /^\s*~~~\s*((?:\w|[\/\-#])+)?\s*$/,
        { token: 'string', next: '@codeblock' },
      ],

      // github style code blocks (with backticks and language)
      [
        /^\s*```\s*((?:\w|[\/\-#])+)\s*$/,
        { token: 'string', next: '@codeblockgh', nextEmbedded: '$1' },
      ],

      // github style code blocks (with backticks but no language)
      [/^\s*```\s*$/, { token: 'string', next: '@codeblock' }],

      // markup within lines
      { include: '@linecontent' },
    ],

    codeblock: [
      [/^\s*~~~\s*$/, { token: 'string', next: '@pop' }],
      [/^\s*```\s*$/, { token: 'string', next: '@pop' }],
      [/.*$/, 'variable.source'],
    ],

    // github style code blocks
    codeblockgh: [
      [
        /```\s*$/,
        { token: 'variable.source', next: '@pop', nextEmbedded: '@pop' },
      ],
      [/[^`]+/, 'variable.source'],
    ],

    linecontent: [
      // escapes
      [/&\w+;/, 'string.escape'],
      [/@escapes/, 'escape'],

      // various markup
      [/\b__([^\\_]|@escapes|_(?!_))+__\b/, 'strong'],
      [/\*\*([^\\*]|@escapes|\*(?!\*))+\*\*/, 'strong'],
      [/\b_[^_]+_\b/, 'emphasis'],
      [/\*([^\\*]|@escapes)+\*/, 'emphasis'],
      [/`([^\\`]|@escapes)+`/, 'variable'],

      // links
      [/\[\[.*\]\]/, 'string.link'],
      [/\{+[^}]+\}+/, 'string.target'],
      [
        /(!?\[)((?:[^\]\\]|@escapes)*)(\]\([^\)]+\))/,
        ['string.link', '', 'string.link'],
      ],
      [/(!?\[)((?:[^\]\\]|@escapes)*)(\])/, 'string.link'],

      // or html
      { include: 'html' },
    ],

    // Note: it is tempting to rather switch to the real HTML mode instead of building our own here
    // but currently there is a limitation in Monarch that prevents us from doing it: The opening
    // '<' would start the HTML mode, however there is no way to jump 1 character back to let the
    // HTML mode also tokenize the opening angle bracket. Thus, even though we could jump to HTML,
    // we cannot correctly tokenize it in that mode yet.
    html: [
      // html tags
      [/<(\w+)\/>/, 'tag'],
      [
        /<(\w+)/,
        {
          cases: {
            '@empty': { token: 'tag', next: '@tag.$1' },
            '@default': { token: 'tag', next: '@tag.$1' },
          },
        },
      ],
      [/<\/(\w+)\s*>/, { token: 'tag' }],

      [/<!--/, 'comment', '@comment'],
    ],

    comment: [
      [/[^<\-]+/, 'comment.content'],
      [/-->/, 'comment', '@pop'],
      [/<!--/, 'comment.content.invalid'],
      [/[<\-]/, 'comment.content'],
    ],

    // Almost full HTML tag matching, complete with embedded scripts & styles
    tag: [
      [/[ \t\r\n]+/, 'white'],
      [
        /(type)(\s*=\s*)(")([^"]+)(")/,
        [
          'attribute.name.html',
          'delimiter.html',
          'string.html',
          { token: 'string.html', switchTo: '@tag.$S2.$4' },
          'string.html',
        ],
      ],
      [
        /(type)(\s*=\s*)(')([^']+)(')/,
        [
          'attribute.name.html',
          'delimiter.html',
          'string.html',
          { token: 'string.html', switchTo: '@tag.$S2.$4' },
          'string.html',
        ] as any,
      ],
      [
        /(\w+)(\s*=\s*)("[^"]*"|'[^']*')/,
        ['attribute.name.html', 'delimiter.html', 'string.html'],
      ],
      [/\w+/, 'attribute.name.html'],
      [/\/>/, 'tag', '@pop'],
      [
        />/,
        {
          cases: {
            '$S2==style': {
              token: 'tag',
              switchTo: 'embeddedStyle',
              nextEmbedded: 'text/css',
            },
            '$S2==script': {
              cases: {
                $S3: {
                  token: 'tag',
                  switchTo: 'embeddedScript',
                  nextEmbedded: '$S3',
                },
                '@default': {
                  token: 'tag',
                  switchTo: 'embeddedScript',
                  nextEmbedded: 'text/javascript',
                },
              },
            },
            '@default': { token: 'tag', next: '@pop' },
          },
        },
      ],
    ],

    embeddedStyle: [
      [/[^<]+/, ''],
      [
        /<\/style\s*>/,
        { token: '@rematch', next: '@pop', nextEmbedded: '@pop' },
      ],
      [/</, ''],
    ],

    embeddedScript: [
      [/[^<]+/, ''],
      [
        /<\/script\s*>/,
        { token: '@rematch', next: '@pop', nextEmbedded: '@pop' },
      ],
      [/</, ''],
    ],
  },
});

monaco.editor.defineTheme('custom-theme', {
  base: 'vs-dark',
  inherit: true,
  rules: [
    // { token: 'wiki-link', fontStyle: 'medium', foreground: 'FFA500' }
  ],
  colors: {},
});
monaco.languages.registerCompletionItemProvider('markdown-custom', {
  provideCompletionItems: () => {
    const suggestions: monaco.languages.CompletionItem[] = [
      // {
      //   label: 'testing',
      //   kind: monaco.languages.CompletionItemKind.Keyword,
      //   insertText: 'testing(${1:condition})',
      //   insertTextRules:
      //     monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      //   range: undefined as any,
      // },
      // {
      //   label: 'ifelse',
      //   kind: monaco.languages.CompletionItemKind.Snippet,
      //   insertText: [
      //     'if (${1:condition}) {',
      //     '\t$1',
      //     '} else {',
      //     '\t$2',
      //     '}',
      //   ].join('\n'),
      //   insertTextRules:
      //     monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      //   documentation: 'If-Else Statement',
      //   range: undefined as any,
      // },
    ];
    return { suggestions };
  },
});

interface IRichEditorProps {
  onChange?: (v: string) => void;

  value?: string;
}

const MarkdownEditor: React.FunctionComponent<IRichEditorProps> = ({
  onChange,
  value,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const monacoRef = React.useRef<monaco.editor.IStandaloneCodeEditor>(null);

  React.useEffect(() => {
    if (!monacoRef.current && containerRef.current) {
      containerRef.current.innerHTML = '<div style="min-height: 50vh;"/>';
      (monacoRef.current as any) = monaco.editor.create(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        containerRef.current.querySelector('div')!,
        {
          theme: 'custom-theme',
          language: 'markdown-custom',
          automaticLayout: true,
        }
      );
    }

    if ((window as any)?.MonacoEnvironment) {
      (window as any).MonacoEnvironment.getWorkerUrl = (
        moduleId: string,
        label: string
      ) => {
        if (label === 'json') return '/_next/static/json.worker.js';
        if (label === 'css') return '/_next/static/css.worker.js';
        if (label === 'html') return '/_next/static/html.worker.js';
        if (label === 'typescript' || label === 'javascript')
          return '/_next/static/ts.worker.js';
        return '/_next/static/editor.worker.js';
      };
    }

    monacoRef.current?.onDidChangeModelContent(() => {
      onChange?.(monacoRef.current?.getModel()?.getValue() ?? '');
    });

    monacoRef.current?.setValue(value ?? '');
    return () => {
      monacoRef.current?.dispose();
      (monacoRef.current as any) = null;
    };
  }, []);

  return (
    <div
      css={css`
        min-height: 50vh;
      `}
    >
      <div ref={containerRef} style={{ height: '100%', minHeight: '50vh' }} />
    </div>
  );
};

export default MarkdownEditor;
