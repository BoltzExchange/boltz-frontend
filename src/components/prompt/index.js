import React from 'react';

const Prompt = () => {
  window.onbeforeunload = () => {
    return true;
  };

  return <span style={{ display: 'none' }} />;
};

export default Prompt;
