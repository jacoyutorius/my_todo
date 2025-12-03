import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import confetti from 'canvas-confetti';

interface DailyViewProps {
  date: string;
  content: string;
  onSave: (content: string) => void;
}

export const DailyView: React.FC<DailyViewProps> = ({ date, content, onSave }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    setLines(content.split('\n'));
  }, [content]);

  const handleToggle = (index: number) => {
    const newLines = [...lines];
    const line = newLines[index];
    if (line.startsWith('- [ ] ')) {
      const now = new Date();
      const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      newLines[index] = line.replace('- [ ] ', '- [x] ') + ` (Completed: ${timestamp})`;
      // Trigger confetti when completing a task
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else if (line.startsWith('- [x] ')) {
      // Remove completion timestamp if exists
      newLines[index] = line.replace('- [x] ', '- [ ] ').replace(/ \(Completed: .*\)$/, '');
    }
    updateContent(newLines);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    const newLines = [...lines, `- [ ] ${newTask}`];
    updateContent(newLines);
    setNewTask('');
  };

  const updateContent = (newLines: string[]) => {
    setLines(newLines);
    onSave(newLines.join('\n'));
  };

  // Simple parser to render interactive list
  return (
    <div className="daily-view">
      <header className="daily-header">
        <h1>{date}</h1>
      </header>

      <div className="todo-list">
        {lines.map((line, index) => {
          if (line.startsWith('- [ ] ') || line.startsWith('- [x] ')) {
            const isChecked = line.startsWith('- [x] ');
            const text = line.substring(6);
            return (
              <div key={index} className={`todo-item ${isChecked ? 'completed' : ''}`}>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleToggle(index)}
                />
                <span className="todo-text">{text}</span>
              </div>
            );
          } else if (line.trim() === '') {
            return <div key={index} className="spacer"></div>;
          } else {
            // Render other markdown content (headers, etc)
            return (
              <div key={index} className="markdown-block">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{line}</ReactMarkdown>
              </div>
            )
          }
        })}
      </div>

      <form onSubmit={handleAddTask} className="add-task-form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="新しいタスクを追加..."
          className="add-task-input"
        />
        <button type="submit" className="add-button">+</button>
      </form>
    </div>
  );
};
