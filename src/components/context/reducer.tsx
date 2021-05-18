import React, {
  forwardRef,
  useImperativeHandle,
  ForwardRefRenderFunction,
} from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ElementType, IElement } from '../elements/Element';

import createActions from './actions';
import {
  AppAction,
  AppActions,
  AppState,
  ProviderHandles,
  IProviderProps,
  UpdateElementsAction,
  UPDATE_ELEMENTS,
} from './types';

export const AppStateContext = React.createContext<AppState | null>(null);
const AppDispatchContext = React.createContext<React.Dispatch<UpdateElementsAction> | null>(null);
const AppActionsContext = React.createContext<AppActions | null>(null);

const initialState: AppState = {
  elements: [{
    id: uuidv4(),
    position: 0,
    type: ElementType.TITLE,
    text: '',
  }],
};

function appReducer(state = initialState, action: AppAction): AppState {
  switch (action.type) {
    case UPDATE_ELEMENTS:
      return { ...state, elements: action.elements };
    default: {
      return { ...state };
    }
  }
}

const provider:
  ForwardRefRenderFunction<ProviderHandles, React.PropsWithChildren<IProviderProps>> = (
    props, ref,
  ) => {
    const { children, diction } = props;

    const [state, dispatch] = React.useReducer(appReducer, initialState);

    const actions = createActions(dispatch, state, diction);

    useImperativeHandle(ref, () => ({
      getElements() {
        return state.elements;
      },
      createElement(elementType: ElementType, pos: number) {
        actions.createElement(elementType, pos);
      },
      updateElement(id: string, element: IElement) {
        actions.updateElement(id, element);
      },
      deleteElement(id: string) {
        actions.deleteElement(id);
      },
    }));

    return (
      <AppStateContext.Provider value={state}>
        <AppDispatchContext.Provider value={dispatch}>
          <AppActionsContext.Provider value={actions}>
            {children}
          </AppActionsContext.Provider>
        </AppDispatchContext.Provider>
      </AppStateContext.Provider>
    );
  };

const AppProvider = forwardRef(provider);

function useAppState(): AppState {
  const context = React.useContext(AppStateContext);
  if (context === undefined || context === null) {
    throw new Error('useAppState must be used within a AppProvider');
  }

  return context;
}

function useAppDispatch() {
  const context = React.useContext(AppDispatchContext);
  if (context === undefined || context === null) {
    throw new Error('useAppDispatch must be used within a AppProvider');
  }

  return context;
}

function useAppActions() {
  const context = React.useContext(AppActionsContext);
  if (context === undefined || context === null) {
    throw new Error('useAppActions must be used within a AppProvider');
  }

  return context;
}

export {
  AppProvider, useAppState, useAppDispatch, useAppActions,
};
