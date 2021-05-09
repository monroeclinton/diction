import { Dispatch } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  AppState,
  AppAction,
  AppActions,
  UPDATE_ELEMENTS,
} from './types';

import Diction from '../../diction';
import Logger from '../../logger';
import { IElement, ElementType } from '../elements/Elements';

function createActions(
  dispatch: Dispatch<AppAction>,
  state: AppState,
  diction: Diction,
): AppActions {
  const createElement = async (elementType: ElementType, pos: number) => {
    const { elements } = state;

    const maxElements = diction.options.getMaxElements();
    if (typeof maxElements === 'number' && elements.length >= maxElements) {
      Logger.debug('Max elements reached.');
      return;
    }

    let position = pos;
    if (pos < 0) position = 0;

    let element: IElement = {
      id: uuidv4(),
      position,
      type: elementType,
      text: '',
    };

    const beforeCreate = diction.options.getBeforeCreate();
    if (typeof beforeCreate === 'function') {
      try {
        element = await beforeCreate(element);
      } catch (e) {
        Logger.debug(e);
        return;
      }
    }

    elements.splice(position, 0, element);

    elements.forEach((value, i) => {
      elements[i].position = i;
    });

    diction.emit('change', element);

    dispatch({
      type: UPDATE_ELEMENTS,
      elements,
    });
  };

  function updateElement(id: string, element: IElement) {
    const { elements } = state;

    const maxLengths = diction.options.getMaxLength();
    if (typeof maxLengths[element.type] === 'number' && element.text.length > maxLengths[element.type]) {
      return;
    }

    elements.forEach((el, i) => {
      elements[i] = (el.id === id) ? element : el;
    });

    diction.emit('change', element);

    dispatch({
      type: UPDATE_ELEMENTS,
      elements,
    });
  }

  function deleteElement(id: string) {
    const { elements } = state;

    const newElements = elements.filter((el) => el.id !== id);

    diction.emit('delete', id);

    dispatch({
      type: UPDATE_ELEMENTS,
      elements: newElements,
    });
  }

  return {
    createElement,
    updateElement,
    deleteElement,
  };
}

export default createActions;
