import React from 'react';

interface SidebarProps {
  files: string[];
  selectedFile: string | null;
  onSelectFile: (filename: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ files, selectedFile, onSelectFile }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>History</h2>
      </div>
      <ul className="file-list">
        {files.map((file) => (
          <li
            key={file}
            className={file === selectedFile ? 'selected' : ''}
            onClick={() => onSelectFile(file)}
          >
            {file.replace('.md', '')}
          </li>
        ))}
      </ul>
    </aside>
  );
};
