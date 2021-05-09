export enum ElementType {
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
