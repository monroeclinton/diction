# editor
A text editor based on Notion.

# Installation
```
npm i @monroeclinton/editor
```

# Usage
Create new editor:
```js
const editor = new Diction("#editor", {
  maxElements?: number,
  maxLength?: {
    title?: number,
    subtitle?: number,
    paragraph?: number,
  },
  beforeCreate?: (el: IElement) => Promise<IElement>,
});
```

Listen for events:
```js
editor.on('change', (el) => {
  
})

editor.on('delete', (id) => {

})
```

Editor method:
```js
// Create element by ElementType and position
editor.createElement(elementType, position);

// Update element
editor.updateElement(id, element);

// Delete element by ID
editor.deleteElement(id);

// IElement[]
editor.getElements();

// Return HTML of content
editor.getHTML();
```

An element is defined as:
```ts
interface IElement {
  id: string,
  type: ElementType,
  position: number,
  text: string,
}

enum ElementType {
  TITLE = 'h1',
  SUBTITLE = 'h3',
  PARAGRAPH = 'p',
}
```

## License

Editor is [MIT licensed](./LICENSE).

