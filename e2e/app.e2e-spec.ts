import { AotAndJitPage } from './app.po';

describe('aot-and-jit App', () => {
  let page: AotAndJitPage;

  beforeEach(() => {
    page = new AotAndJitPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
