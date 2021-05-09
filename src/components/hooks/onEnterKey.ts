import React from 'react';

const handleEnterKey = (callback: Function) => (event: React.KeyboardEvent<HTMLElement>) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    event.stopPropagation();

    callback();
  }
};

export { handleEnterKey };
