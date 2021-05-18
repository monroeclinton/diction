import React from 'react';

import Diction from '../diction';

import Document from './Document';
import Footer from './Footer';

import { AppProvider } from './context/reducer';
import { ProviderHandles } from './context/types';
import { ElementType, IElement } from './elements/Element';

type IProps = {
  diction: Diction,
};

// eslint-disable-next-line react/prefer-stateless-function
class Editor extends React.Component<IProps> {
  private readonly ref;

  constructor(props: IProps) {
    super(props);

    this.ref = React.createRef<ProviderHandles>();
  }

  getElements() {
    if (this.ref.current) {
      return this.ref.current.getElements();
    }

    return [];
  }

  createElement(elementType: ElementType, pos: number) {
    if (this.ref.current) {
      this.ref.current.createElement(elementType, pos);
    }
  }

  updateElement(id: string, element: IElement) {
    if (this.ref.current) {
      this.ref.current.updateElement(id, element);
    }
  }

  deleteElement(id: string) {
    if (this.ref.current) {
      this.ref.current.deleteElement(id);
    }
  }

  render() {
    const { diction } = this.props;

    return (
      <div className="mc-d-editor">
        <AppProvider diction={diction} ref={this.ref}>
          <Document lengthOptions={diction.options.getMaxLength()} />
          <Footer maxElements={diction.options.getMaxElements()} />
        </AppProvider>
      </div>
    );
  }
}

export default Editor;
