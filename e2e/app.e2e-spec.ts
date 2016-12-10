import { WebpacktemplatePage } from './app.po';

describe('webpacktemplate App', function() {
  let page: WebpacktemplatePage;

  beforeEach(() => {
    page = new WebpacktemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
