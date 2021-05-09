import { IElement } from './components/elements/Elements';

export default class DictionOptions {
  /**
   * Container of editor
   *
   * @private
   */
  private container?: HTMLElement;

  /**
   * Number if there is a limit, null if no limit
   *
   * @private
   */
  private maxElements?: number;

  /**
   * Max length of each element type
   *
   * @private
   */
  private readonly maxLength: { [key: string]: number; };

  /**
   * Function to be called before element creation
   *
   * @private
   */
  private beforeCreate: (el: IElement) => Promise<IElement>;

  constructor() {
    this.maxLength = {};
    this.beforeCreate = (el: IElement) => new Promise((res) => {
      res(el);
    });
  }

  setContainer(containerId: HTMLDivElement | string): void {
    if (containerId instanceof HTMLDivElement) {
      this.container = containerId;
      return;
    }

    const el = document.querySelector(containerId);

    if (el === null) {
      throw new Error(`Unable to find container with ID of: ${containerId}`);
    }

    this.container = (el as HTMLElement);
  }

  getContainer(): HTMLElement {
    if (!this.container) {
      throw new Error('No container has been set.');
    }

    return this.container;
  }

  setMaxElements(max?: number): void {
    if (typeof max === 'number') {
      this.maxElements = max;
    }
  }

  getMaxElements(): number | undefined {
    return this.maxElements;
  }

  setMaxLength(elements: { [key: string]: number; }): void {
    Object.keys(elements).forEach((key) => {
      this.maxLength[key] = elements[key];
    });
  }

  getMaxLength(): { [key: string]: number; } {
    return this.maxLength;
  }

  setBeforeCreate(func: (el: IElement) => Promise<IElement>): void {
    this.beforeCreate = func;
  }

  getBeforeCreate(): (el: IElement) => Promise<IElement> {
    return this.beforeCreate;
  }
}
