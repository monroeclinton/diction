import React from 'react';
import ReactDOM from 'react-dom';
import EventEmitter from 'eventemitter3';

import { ElementType, IElement } from './components/elements/Element';

import Editor from './components/Editor';
import { Options } from './options';

interface IOptions {
  maxElements?: number,
  maxLength?: {
    title?: number,
    subtitle?: number,
    paragraph?: number,
  },
  beforeCreate?: (el: IElement) => Promise<IElement>,
}

class Diction extends EventEmitter {
    public options: Options = new Options();

    private editor: null | Editor = null;

    constructor(containerId: HTMLDivElement | string, options?: IOptions) {
      super();

      this.parseConfig(containerId, options);

      const container = this.options.getContainer();

      container.classList.add('mc-d-container');

      ReactDOM.render(
        <React.StrictMode>
          <Editor
            ref={(editor) => { this.editor = editor; }}
            diction={this}
          />
        </React.StrictMode>,
        container,
      );
    }

    private parseConfig(containerId: HTMLDivElement | string, options?: IOptions) {
      const dictionOptions = new Options();

      dictionOptions.setContainer(containerId);

      if (options && options.maxElements) {
        dictionOptions.setMaxElements(options.maxElements);
      }

      if (options && options.maxLength) {
        dictionOptions.setMaxLength(options.maxLength);
      }

      if (options && options.beforeCreate) {
        dictionOptions.setBeforeCreate(options.beforeCreate);
      }

      this.options = dictionOptions;
    }

    createElement(elementType: ElementType, pos: number) {
      this.editor?.createElement(elementType, pos);
    }

    updateElement(id: string, element: IElement) {
      this.editor?.updateElement(id, element);
    }

    deleteElement(id: string) {
      this.editor?.deleteElement(id);
    }

    getElements() {
      if (this.editor) {
        return this.editor.getElements();
      }

      return [];
    }

    getHTML() {
      const doc = document.createElement('div');
      const elements = this.getElements();

      elements.forEach((el: IElement) => {
        const elHTML = document.createElement(el.type);
        elHTML.innerText = el.text;

        doc.innerHTML += elHTML.outerHTML;
      });

      return doc.outerHTML;
    }
}

export {
  Diction, IOptions, Options, ElementType, IElement,
};
export default Diction;
