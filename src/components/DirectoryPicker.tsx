import React from 'react';

interface DirectoryPickerProps {
  onSelect: () => void;
}

export const DirectoryPicker: React.FC<DirectoryPickerProps> = ({ onSelect }) => {
  return (
    <div className="directory-picker-container">
      <div className="directory-picker-card">
        <h1>Daily TODO</h1>
        <p>作業フォルダを選択して始めましょう</p>
        <button onClick={onSelect} className="primary-button">
          フォルダを選択
        </button>
      </div>
    </div>
  );
};
