# diction
A text editor based on Notion.

# Installation
```
npm i @monroeclinton/diction
```

# Usage
Create new editor:
```js
const diction = new Diction("#editor", {
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
diction.on('change', (el) => {
  
})

diction.on('delete', (id) => {

})
```

Editor method:
```js
// Create element by ElementType and position
diction.createElement(elementType, position);

// Update element
diction.updateElement(id, element);

// Delete element by ID
diction.deleteElement(id);

// IElement[]
diction.getElements();

// Return HTML of content
diction.getHTML();
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

Diction is [MIT licensed](./LICENSE).

