import React from 'react';

interface SuggestedTagsProps {
  insertTag: (tag: string) => void;
  tagsList: string[];
}

export const SuggestedTags: React.FC<SuggestedTagsProps> = ({ insertTag, tagsList }) => {
  return (
    <div className="mt-2 flex flex-wrap">
      {tagsList.map((tag) => (
        <button
          key={tag}
          onClick={() => insertTag(tag)}
          className="bg-gray-200 hover:bg-gray-300 rounded-full px-3 py-1 text-sm mr-2 mb-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          {tag}
        </button>
      ))}
    </div>
  );
};