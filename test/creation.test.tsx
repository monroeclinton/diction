import ReactTestUtils from 'react-dom/test-utils';

import Diction from '../src/diction';
import { ElementType } from '../src/components/elements/Elements';

it('tests creation, delete, get for editor.', async () => {
  const dummyElement = document.createElement('div');
  dummyElement.id = 'editor';

  let diction: Diction;
  ReactTestUtils.act(() => {
    diction = new Diction(dummyElement);
  });

  await ReactTestUtils.act(async () => {
    diction.createElement(ElementType.TITLE, 0);
    diction.createElement(ElementType.TITLE, 0);
  });

  await ReactTestUtils.act(async () => {
    const el = diction.getElements()[0];
    diction.deleteElement(el.id);
  });

  let count = 0;
  await ReactTestUtils.act(async () => {
    count = diction.getElements().length;
  });

  expect(count)
    .toBe(2);
});
