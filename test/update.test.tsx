import ReactTestUtils from 'react-dom/test-utils';

import Diction from '../src/diction';

it('tests update for editor', async () => {
  const dummyElement = document.createElement('div');
  dummyElement.id = 'editor';

  let diction: Diction;
  ReactTestUtils.act(() => {
    diction = new Diction(dummyElement);
  });

  await ReactTestUtils.act(async () => {
    const el = diction.getElements()[0];
    el.text = 'Test!';
    diction.updateElement(el.id, el);
  });

  await ReactTestUtils.act(async () => {
    expect(diction.getElements()[0].text)
      .toBe('Test!');
  });
});
