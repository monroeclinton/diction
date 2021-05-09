import React, { useState } from 'react';

import OutsideClickHandler from 'react-outside-click-handler';
import GrabberIcon from '../../../../assets/icons/grip-vertical.svg';

import { ElementType, IElement } from '../Elements';

import { useAppActions } from '../../context/reducer';
import { handleEnterKey } from '../../hooks/onEnterKey';

interface IProps {
  element: IElement,
  setActive: (state: boolean) => void;
}

enum Menu {
  MAIN,
  NEW,
  TURN,
}

enum NewPosition {
  ABOVE = 0,
  BELOW = 2,
}

function Grabber(props: IProps) {
  const { createElement, deleteElement, updateElement } = useAppActions();

  const [dropdown, setDropdown] = useState<boolean>(false);

  const [menu, setMenu] = useState<Menu>(Menu.MAIN);

  function handleClick() {
    setDropdown(true);
    props.setActive(true);
  }

  function handleMenu(newMenu: Menu) {
    setMenu(newMenu);
  }

  function handleDelete() {
    deleteElement(props.element.id);
  }

  function handleType(type: ElementType) {
    const { element } = props;

    updateElement(props.element.id, {
      ...element,
      type,
    });
  }

  function handleNew(pos: NewPosition) {
    const elPos = props.element.position + pos;
    createElement(ElementType.PARAGRAPH, elPos);
  }

  function onOutsideClick() {
    if (dropdown) {
      setDropdown(false);
      setMenu(Menu.MAIN);
      props.setActive(false);
    }
  }

  return (
    <OutsideClickHandler onOutsideClick={onOutsideClick}>
      <div className="mc-d-grabber">
        <div
          role="button"
          tabIndex={0}
          className="mc-d-grabber-icon"
          onClick={handleClick}
          onKeyDown={handleEnterKey(handleClick)}
        >
          <GrabberIcon height={16} />
        </div>
        {
          dropdown
          && (
            <div className="mc-d-grabber-dropdown">
              {
                menu === Menu.MAIN
                && (
                  <div role="menu" className="mc-d-grabber-menu">
                    <div
                      role="menuitem"
                      tabIndex={0}
                      className="mc-d-option"
                      onClick={() => { handleMenu(Menu.TURN); }}
                      onKeyDown={handleEnterKey(() => { handleMenu(Menu.TURN); })}
                    >
                      Turn Into
                    </div>
                    <div
                      role="menuitem"
                      tabIndex={0}
                      className="mc-d-option"
                      onClick={() => { handleMenu(Menu.NEW); }}
                      onKeyDown={handleEnterKey(() => { handleMenu(Menu.NEW); })}
                    >
                      New Element
                    </div>
                    <div
                      role="menuitem"
                      tabIndex={0}
                      className="mc-d-option mc-d-danger"
                      onClick={handleDelete}
                      onKeyDown={handleDelete}
                    >
                      Delete
                    </div>
                  </div>
                )
              }
              {
                menu === Menu.NEW
                && (
                  <div role="menu" className="mc-d-grabber-menu">
                    <div
                      role="menuitem"
                      tabIndex={0}
                      className="mc-d-option"
                      onClick={() => { handleNew(NewPosition.ABOVE); }}
                      onKeyDown={handleEnterKey(() => { handleNew(NewPosition.ABOVE); })}
                    >
                      New Above
                    </div>
                    <div
                      role="menuitem"
                      tabIndex={0}
                      className="mc-d-option"
                      onClick={() => { handleNew(NewPosition.BELOW); }}
                      onKeyDown={handleEnterKey(() => { handleNew(NewPosition.BELOW); })}
                    >
                      New Below
                    </div>
                  </div>
                )
              }
              {
                menu === Menu.TURN
                && (
                  <div role="menu" className="mc-d-grabber-menu">
                    <div
                      role="menuitem"
                      tabIndex={0}
                      className="mc-d-option"
                      onClick={() => { handleType(ElementType.TITLE); }}
                      onKeyDown={handleEnterKey(() => { handleType(ElementType.TITLE); })}
                    >
                      Page Title
                    </div>
                    <div
                      role="menuitem"
                      tabIndex={0}
                      className="mc-d-option"
                      onClick={() => { handleType(ElementType.SUBTITLE); }}
                      onKeyDown={handleEnterKey(() => { handleType(ElementType.SUBTITLE); })}
                    >
                      Heading
                    </div>
                    <div
                      role="menuitem"
                      tabIndex={0}
                      className="mc-d-option"
                      onClick={() => { handleType(ElementType.PARAGRAPH); }}
                      onKeyDown={handleEnterKey(() => { handleType(ElementType.PARAGRAPH); })}
                    >
                      Paragraph
                    </div>
                  </div>
                )
              }
            </div>
          )
        }
      </div>
    </OutsideClickHandler>
  );
}

export default Grabber;
