import { useState, useCallback } from 'react';

// Types for File System Access API (if not globally available)
// These are usually available in modern environments but good to have for reference
interface FileSystemHandle {
  kind: 'file' | 'directory';
  name: string;
}

interface FileSystemFileHandle extends FileSystemHandle {
  kind: 'file';
  getFile(): Promise<File>;
  createWritable(): Promise<FileSystemWritableFileStream>;
}

interface FileSystemDirectoryHandle extends FileSystemHandle {
  kind: 'directory';
  values(): AsyncIterableIterator<FileSystemHandle>;
  getFileHandle(name: string, options?: { create?: boolean }): Promise<FileSystemFileHandle>;
}

interface FileSystemWritableFileStream extends WritableStream {
  write(data: string | BufferSource | Blob): Promise<void>;
  close(): Promise<void>;
}

// Global declaration for showDirectoryPicker
declare global {
  interface Window {
    showDirectoryPicker(): Promise<FileSystemDirectoryHandle>;
  }
}

export const useFileSystem = () => {
  const [directoryHandle, setDirectoryHandle] = useState<FileSystemDirectoryHandle | null>(null);
  const [files, setFiles] = useState<string[]>([]);

  const selectDirectory = useCallback(async () => {
    try {
      const handle = await window.showDirectoryPicker();
      setDirectoryHandle(handle);
      await loadFiles(handle);
    } catch (error) {
      console.error('Error selecting directory:', error);
    }
  }, []);

  const loadFiles = async (handle: FileSystemDirectoryHandle) => {
    const fileNames: string[] = [];
    for await (const entry of handle.values()) {
      if (entry.kind === 'file' && entry.name.endsWith('.md')) {
        fileNames.push(entry.name);
      }
    }
    // Sort files by name (date) descending
    setFiles(fileNames.sort().reverse());
  };

  const readFile = useCallback(async (filename: string) => {
    if (!directoryHandle) return null;
    try {
      const fileHandle = await directoryHandle.getFileHandle(filename);
      const file = await fileHandle.getFile();
      return await file.text();
    } catch (error) {
      console.error(`Error reading file ${filename}:`, error);
      return null;
    }
  }, [directoryHandle]);

  const writeFile = useCallback(async (filename: string, content: string) => {
    if (!directoryHandle) return;
    try {
      const fileHandle = await directoryHandle.getFileHandle(filename, { create: true });
      const writable = await fileHandle.createWritable();
      await writable.write(content);
      await writable.close();

      // Refresh file list if it's a new file
      if (!files.includes(filename)) {
        await loadFiles(directoryHandle);
      }
    } catch (error) {
      console.error(`Error writing file ${filename}:`, error);
    }
  }, [directoryHandle, files]);

  return {
    directoryHandle,
    files,
    selectDirectory,
    readFile,
    writeFile,
  };
};
