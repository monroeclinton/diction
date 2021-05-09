import React, { useEffect } from 'react';

import Element from './elements/Element';
import { ElementType } from './elements/Elements';

import { useAppActions, useAppState } from './context/reducer';

interface IProps {
  lengthOptions: { [p: string]: number },
}

function Document({ lengthOptions }: IProps) {
  const { createElement } = useAppActions();
  const { elements } = useAppState();

  useEffect(() => {
    if (elements.length === 0) {
      createElement(ElementType.TITLE, 0);
    }
  }, [elements]);

  return (
    <>
      {
        elements.map((element) => (
          <Element
            key={element.id}
            element={element}
            maxLength={lengthOptions[element.type]}
          />
        ))
      }
    </>
  );
}

export default Document;
