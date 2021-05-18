import React, {
  useState, useEffect, useRef,
} from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

import Grabber from './parts/Grabber';

import { useAppActions, useAppState } from '../context/reducer';
import { handleEnterKey } from '../hooks/onEnterKey';
import strip from '../utils/strip';

export const enum ElementType {
  TITLE = 'h1',
  SUBTITLE = 'h3',
  PARAGRAPH = 'p',
}

export interface IElement {
  id: string,
  type: ElementType,
  position: number,
  text: string,
}

interface IProps {
  element: IElement,
  maxLength?: number,
}

function Element({ element, maxLength }: React.PropsWithChildren<IProps>) {
  const {
    id, type, position, text,
  } = element;

  const { createElement, updateElement } = useAppActions();
  const { elements } = useAppState();

  const [active, setActive] = useState(false);

  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.focus();
      setActive(true);
    }
  }, []);

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      // Prevent the default action
      e.preventDefault();

      // Get the copied text from the clipboard
      let pasteText = '';

      if (e.clipboardData) {
        pasteText = e.clipboardData.getData('text/plain');
      }

      if (document.queryCommandSupported('insertText')) {
        document.execCommand('insertText', false, pasteText);
      } else {
        const docSelection = document.getSelection();

        if (!docSelection) {
          return;
        }

        const range = docSelection.getRangeAt(0);

        range.deleteContents();

        const textNode = document.createTextNode(text);
        range.insertNode(textNode);
        range.selectNodeContents(textNode);
        range.collapse(false);

        const winSelection = window.getSelection();

        if (!winSelection) {
          return;
        }

        winSelection.removeAllRanges();
        winSelection.addRange(range);
      }
    };

    if (ref.current) {
      ref.current.addEventListener('paste', handlePaste);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('paste', handlePaste);
      }
    };
  }, []);

  function handleGrabber(state: boolean) {
    if (ref.current && ref.current !== document.activeElement) {
      setActive(state);
    }
  }

  function handleKeyDown() {
    createElement(ElementType.PARAGRAPH, elements.length);
  }

  function checkLength(e: React.KeyboardEvent<HTMLInputElement>) {
    const { innerText } = e.currentTarget;

    if (typeof maxLength === 'number' && innerText.length >= maxLength) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  function handleChange(e: ContentEditableEvent) {
    const { value } = e.target;

    updateElement(id, {
      ...element,
      text: strip(value),
    });
  }

  return (
    <div className={`mc-d-element mc-d-${type}${active ? ' mc-d-active' : ''}`} data-pos={position}>
      <ContentEditable
        className="mc-d-input"
        placeholder="Enter some text..."
        innerRef={ref}
        html={text}
        tagName={type}
        onFocus={() => { setActive(true); }}
        onBlur={() => { setActive(false); }}
        onKeyDown={handleEnterKey(handleKeyDown)}
        onKeyPress={checkLength}
        onChange={handleChange}
      />
      <Grabber element={element} setActive={handleGrabber} />
    </div>
  );
}

Element.defaultProps = {
  maxLength: null,
};

export default Element;
