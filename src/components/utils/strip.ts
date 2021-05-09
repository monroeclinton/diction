function br2nl(str: string) {
  return str.replace(/<br>/g, '\n');
}

function strip(html: string): string {
  const doc = new DOMParser().parseFromString(br2nl(html), 'text/html');
  return doc.body.textContent || '';
}

export default strip;
