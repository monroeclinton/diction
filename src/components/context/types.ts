import Diction from '../../diction';
import { ElementType, IElement } from '../elements/Elements';

// Constants
export const UPDATE_ELEMENTS = 'UPDATE_ELEMENTS';

// Dispatch actions
export interface UpdateElementsAction {
    type: typeof UPDATE_ELEMENTS,
    elements: Array<IElement>,
}

export type AppAction = UpdateElementsAction;

// State
export interface AppState {
    elements: Array<IElement>,
}

// Actions
export interface AppActions {
    createElement: (elementType: ElementType, position: number) => void,
    updateElement: (id: string, element: IElement) => void,
    deleteElement: (id: string) => void,
}

// Provider props
export interface IProviderProps {
    diction: Diction,
}

// Provider handles
export type ProviderHandles = {
    getElements: () => Array<IElement>,
    createElement: (elementType: ElementType, pos: number) => void,
    updateElement: (id: string, element: IElement) => void,
    deleteElement: (id: string) => void,
}
