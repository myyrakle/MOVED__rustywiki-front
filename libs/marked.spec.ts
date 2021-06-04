import { customMarked } from './marked';

describe('markdown render to html', () => {
  describe('위키링크', () => {
    it('[[contents]] 렌더링이 a element로 되어야 한다.', async () => {
      const res = await customMarked.process('[[테스트]]');
      expect(String(res)).toMatchSnapshot();
    });

    it('[[content|alias]] alias가 대신 나와야 한다.', async () => {
      const res = await customMarked.process('[[content|alias]]');
      expect(String(res)).toMatchSnapshot();
    });
  });

  describe('footNotes', () => {
    it('[^1] 각주를 렌더링시 [^1] : 각주 링크가 서로 참조해야 한다', async () => {
      const res = await customMarked.process(
        `각주,[^longnote] lorem ipsum\n이것은 각주여[^1]\n[^longnote]: 각주입니다\n[^1]: 각주입니다`
      );
      expect(String(res)).toMatchSnapshot();
    });
  });

  describe('html xss', () => {
    it('허용되지 않은 html에 대해서는 위생화가 되어야 한다.', async () => {
      const res = await customMarked.process(
        `# lorem <div>ipsum</div> \n content`
      );
      expect(String(res)).toMatchSnapshot();
    });
    it('허용되지 않은 script에 대해서는 위생화가 되어야 한다.', async () => {
      const res = await customMarked.process(
        `# lorem <div>ipsum</div> \n content <script>alert("x")</script>`
      );
      expect(String(res)).toMatchSnapshot();
    });
  });
});
