import React from 'react';

interface InputPartProps {
  index: number;
  part: string;
  cursorPosition: number;
  inputWidth: number;
  inputRef: React.RefObject<HTMLInputElement>;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  setCursorPosition: (position: number) => void;
  placeholder: string;
}

export const TextInput: React.FC<InputPartProps> = ({
  index,
  part,
  cursorPosition,
  inputWidth,
  inputRef,
  handleInput,
  handleKeyDown,
  setCursorPosition,
  placeholder,
}) => {
  if (index === cursorPosition) {
    return (
      <div style={{ width: `${inputWidth}px` }} className="inline-block last:flex-grow last:flex-basis-full">
        <input
          ref={inputRef}
          type="text"
          value={part}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="outline-none h-8 my-1 w-full"
        />
      </div>
    );
  } else {
    return (
      <span
        onClick={() => {
          setCursorPosition(index);
          setTimeout(() => {
            if (inputRef.current) {
              inputRef.current.focus();
        }
      }, 0);
        }}
        className="whitespace-pre h-8 flex items-center my-1 min-w-[1px] cursor-text hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded last:flex-grow last:flex-basis-full"
      >
        {part || '\u00A0'}
      </span>
    );
  }
};