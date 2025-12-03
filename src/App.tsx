import { useState, useEffect } from 'react';
import { useFileSystem } from './hooks/useFileSystem';
import { DirectoryPicker } from './components/DirectoryPicker';
import { Sidebar } from './components/Sidebar';
import { DailyView } from './components/DailyView';
import './App.css';

function App() {
  const { directoryHandle, files, selectDirectory, readFile, writeFile } = useFileSystem();
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>('');

  const getTodayFilename = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}.md`;
  };

  useEffect(() => {
    if (directoryHandle) {
      const today = getTodayFilename();
      if (files.includes(today)) {
        handleSelectFile(today);
      } else {
        // Create today's file if it doesn't exist
        const initialContent = `# ${today.replace('.md', '')}\n\n`;
        writeFile(today, initialContent).then(() => {
          handleSelectFile(today);
        });
      }
    }
  }, [directoryHandle, files.length]); // Check when directory or files list changes

  const handleSelectFile = async (filename: string) => {
    setSelectedFile(filename);
    const content = await readFile(filename);
    setFileContent(content || '');
  };

  const handleSave = async (content: string) => {
    if (selectedFile) {
      setFileContent(content);
      await writeFile(selectedFile, content);
    }
  };

  if (!directoryHandle) {
    return <DirectoryPicker onSelect={selectDirectory} />;
  }

  return (
    <div className="app-container">
      <Sidebar
        files={files}
        selectedFile={selectedFile}
        onSelectFile={handleSelectFile}
      />
      <main className="main-content">
        {selectedFile ? (
          <DailyView
            date={selectedFile.replace('.md', '')}
            content={fileContent}
            onSave={handleSave}
          />
        ) : (
          <div className="empty-state">ファイルを選択してください</div>
        )}
      </main>
    </div>
  );
}

export default App;
