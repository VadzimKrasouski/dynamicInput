import React, { useState } from 'react';
import { DynamicInput } from './components/DynamicInput/DynamicInput';

const suggestedTags = ['React', 'TypeScript', 'JavaScript', 'CSS', 'HTML'];

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState<(string | { id: string; text: string })[]>([]);

  const handleInputChange = (value: (string | { id: string; text: string })[]) => {
    setInputValue(value);
    console.log('Current input value:', value);
  };

  return (
    <div className="container mx-auto p-4 items-center">
      <h1 className="text-2xl font-bold mb-4 text-center">Dynamic Input Component</h1>
      <DynamicInput
        tagsList={suggestedTags}
        onChange={handleInputChange}
        placeholder="Type here..."
        value={inputValue}
      />
    </div>
  );
};

export default App;
