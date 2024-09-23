import React, { useState, useRef, useEffect } from 'react';
import { TextInput } from './TextInput';
import { Tag } from './Tag';
import { SuggestedTags } from './SuggestedTags';

interface Tag {
  id: string;
  text: string;
}

interface DynamicInputProps {
  tagsList: string[];
  onChange: (value: (string | Tag)[]) => void;
  placeholder?: string;
  value: (string | Tag)[];
}

export const DynamicInput: React.FC<DynamicInputProps> = ({ tagsList, onChange, placeholder = 'Type here...', value }) => {
  const [inputParts, setInputParts] = useState<(string | Tag)[]>(value.length > 0 ? value : ['']);
  const [cursorPosition, setCursorPosition] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputWidth, setInputWidth] = useState<number>(0);
  const hiddenSpanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    updateInputWidth();
  }, [inputParts, cursorPosition]);

  useEffect(() => {
    const filteredParts = inputParts.filter(part => part !== '');
    if (JSON.stringify(filteredParts) !== JSON.stringify(value)) {
      onChange(filteredParts);
    }
  }, [inputParts, onChange, value]);

  const updateInputWidth = () => {
    if (hiddenSpanRef.current) {
      const currentInput = inputParts[cursorPosition];
      const textToMeasure = typeof currentInput === 'string' && currentInput.length > 0
        ? currentInput
        : placeholder;
      hiddenSpanRef.current.textContent = textToMeasure;
      const width = hiddenSpanRef.current.offsetWidth;
      setInputWidth(width);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    const newParts = [...inputParts];

    if (typeof newParts[cursorPosition] === 'string') {
      newParts[cursorPosition] = newText;
    } else {
      newParts.splice(cursorPosition, 0, newText);
    }

    setInputParts(newParts);
    updateInputWidth();
  };

  const insertTag = (tagText: string) => {
    const newTag: Tag = { id: Math.random().toString(), text: tagText };
    const newParts = [...inputParts];

    if (typeof newParts[cursorPosition] === 'string') {
      const currentText = newParts[cursorPosition] as string;
      const beforeCursor = currentText.slice(0, inputRef.current?.selectionStart || 0);
      const afterCursor = currentText.slice(inputRef.current?.selectionStart || 0);

      newParts.splice(cursorPosition, 1, beforeCursor, newTag, afterCursor || '');
      setInputParts(newParts);
      setCursorPosition(cursorPosition + 2);
    } else {
      newParts.splice(cursorPosition, 0, newTag, '');
      setInputParts(newParts);
      setCursorPosition(cursorPosition + 1);
    }
  };

  const removeTag = (index: number) => {
    const newParts = inputParts.filter((_, i) => i !== index);
    if (newParts.length === 0) {
      newParts.push('');
    }
    for (let i = 0; i < newParts.length - 1; i++) {
      if (typeof newParts[i] === 'string' && typeof newParts[i + 1] === 'string') {
        newParts[i] = (newParts[i] as string) + (newParts[i + 1] as string);
        newParts.splice(i + 1, 1);
        i--;
      }
    }
    setInputParts(newParts);
    setCursorPosition(Math.min(index, newParts.length - 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && cursorPosition > 0 && inputRef.current?.selectionStart === 0) {
      e.preventDefault();
      const prevPart = inputParts[cursorPosition - 1];
      if (typeof prevPart !== 'string') {
        removeTag(cursorPosition - 1);
      } else {
        const newParts = [...inputParts];
        const currentPart = newParts[cursorPosition] as string;
        newParts[cursorPosition - 1] = prevPart + currentPart;
        newParts.splice(cursorPosition, 1);
        setInputParts(newParts);
        setCursorPosition(cursorPosition - 1);
      }
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="border border-gray-300 rounded p-2 focus-within:ring-2 focus-within:ring-blue-500 flex flex-wrap items-start">
        {inputParts.map((part, index) =>
          typeof part === 'string' ? (
            <TextInput
              key={index}
              index={index}
              part={part}
              cursorPosition={cursorPosition}
              inputWidth={inputWidth}
              inputRef={inputRef}
              handleInput={handleInput}
              handleKeyDown={handleKeyDown}
              setCursorPosition={setCursorPosition}
              placeholder={placeholder}
            />
          ) : (
            <Tag
              key={part.id}
              tag={part}
              index={index}
              removeTag={removeTag}
            />
          )
        )}
      </div>
      <SuggestedTags insertTag={insertTag} tagsList={tagsList}/>
      <span
        ref={hiddenSpanRef}
        className="absolute opacity-0 whitespace-pre"
        style={{ font: 'inherit' }}
      />
    </div>
  );
};