import { contentMark, threadMark } from './marked';

describe('markdown render to html', () => {
  describe('위키링크', () => {
    it('[[contents]] 렌더링이 a element로 되어야 한다.', async () => {
      const res = await contentMark.process('[[테스트]]');
      expect(String(res)).toMatchInlineSnapshot(`
        "<p><a href=\\"/d/wiki/테스트\\">테스트</a></p>
        "
      `);
    });

    it('[[content|alias]] alias가 text node로 나와야 한다.', async () => {
      const res = await contentMark.process('[[content|alias]]');
      expect(String(res)).toMatchInlineSnapshot(`
        "<p><a href=\\"/d/wiki/content\\">alias</a></p>
        "
      `);
    });
  });

  describe('footNotes', () => {
    it('[^1] 각주를 렌더링시 [^1] : 각주 링크가 서로 참조해야 한다', async () => {
      const res = await contentMark.process(
        `각주,[^longnote] lorem ipsum\n이것은 각주여[^1]\n[^longnote]: 각주입니다\n[^1]: 각주입니다`
      );
      expect(String(res)).toMatchInlineSnapshot(`
        "<p>각주,<sup id=\\"fnref-longnote\\"><a href=\\"#fn-longnote\\">longnote</a></sup> lorem ipsum
        이것은 각주여<sup id=\\"fnref-1\\"><a href=\\"#fn-1\\">1</a></sup></p>
        <div>
        <hr>
        <ol>
        <li id=\\"fn-longnote\\">각주입니다<a href=\\"#fnref-longnote\\">↩</a></li>
        <li id=\\"fn-1\\">각주입니다<a href=\\"#fnref-1\\">↩</a></li>
        </ol>
        </div>
        "
      `);
    });
  });

  describe('html xss', () => {
    it('허용되지 않은 html에 대해서는 위생화가 되어야 한다.', async () => {
      const res = await contentMark.process(
        `# lorem <div>ipsum</div> \n content`
      );
      expect(String(res)).toMatchInlineSnapshot(`
        "<h1>lorem ipsum</h1>
        <p>content</p>
        "
      `);
    });
    it('허용되지 않은 script에 대해서는 위생화가 되어야 한다.', async () => {
      const res = await contentMark.process(
        `# lorem <div>ipsum</div> \n content <script>alert("x")</script>`
      );
      expect(String(res)).toMatchInlineSnapshot(`
        "<h1>lorem ipsum</h1>
        <p>content alert(\\"x\\")</p>
        "
      `);
    });
  });

  describe('threadMark', () => {
    it('heading은 무시하고 a element로 치환해야 한다.', async () => {
      const res = await threadMark.process(`#1 lorem`);
      expect(String(res)).toMatchInlineSnapshot(`
        "<p><a href=\\"#1\\">#1</a> lorem</p>
        "
      `);
    });
    it('사이에 있는 element도 a element로 치환되어야 한다.', async () => {
      const res = await threadMark.process(`#1 lorem #3 ipsum #2`);
      expect(String(res)).toMatchInlineSnapshot(`
        "<p><a href=\\"#1\\">#1</a> lorem <a href=\\"#3\\">#3</a> ipsum <a href=\\"#2\\">#2</a></p>
        "
      `);
    });
  });
});
