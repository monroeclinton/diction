import React from 'react';
import { useAppActions, useAppState } from './context/reducer';
import { ElementType } from './elements/Elements';

interface IProps {
  maxElements?: number,
}

function Footer({ maxElements }: IProps) {
  const { createElement } = useAppActions();
  const { elements } = useAppState();

  if (maxElements && elements.length >= maxElements) {
    return null;
  }

  function handleAdd() {
    const type = elements ? ElementType.PARAGRAPH : ElementType.TITLE;
    createElement(type, elements.length);
  }

  return (
    <div className="mc-d-footer">
      <button type="button" className="mc-d-button" onClick={handleAdd}>
        Add Element
      </button>
    </div>
  );
}

Footer.defaultProps = {
  maxElements: null,
};

export default Footer;
