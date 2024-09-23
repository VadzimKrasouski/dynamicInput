import React from 'react';

interface Tag {
  id: string;
  text: string;
}

interface TagProps {
  tag: Tag;
  index: number;
  removeTag: (index: number) => void;
}

export const Tag: React.FC<TagProps> = ({ tag, index, removeTag }) => {
  return (
    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full inline-flex items-center h-8 m-1">
      {tag.text}
      <button
        onClick={() => removeTag(index)}
        className="ml-1 text-blue-600 hover:text-blue-800 focus:outline-none"
      >
        ×
      </button>
    </span>
  );
};