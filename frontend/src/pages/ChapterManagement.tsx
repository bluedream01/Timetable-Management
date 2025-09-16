import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Folder, File, Plus, Upload, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Chapter {
  id: number;
  name: string;
  files: string[];
}

export const ChapterManagement: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const [chapters, setChapters] = useState<Chapter[]>([
    { id: 1, name: 'Chapter 1: Introduction', files: ['notes.pdf', 'assignment1.docx'] },
    { id: 2, name: 'Chapter 2: Basics', files: ['lecture.ppt'] },
  ]);

  const [newChapterName, setNewChapterName] = useState('');

  // Create new chapter with user input
  const handleCreateChapter = () => {
    if (!newChapterName.trim()) {
      toast({ title: 'Error', description: 'Please enter a chapter name.', variant: 'destructive' });
      return;
    }

    const newChapter: Chapter = {
      id: chapters.length + 1,
      name: newChapterName,
      files: [],
    };
    setChapters([...chapters, newChapter]);
    setNewChapterName('');
    toast({ title: 'Chapter Created', description: `Chapter "${newChapterName}" has been created.` });
  };

  // Upload files to a chapter
  const handleUploadFile = (chapterId: number) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;

    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (!target.files) return;
      const filesArray = Array.from(target.files).map(f => f.name);

      setChapters(prev =>
        prev.map(ch =>
          ch.id === chapterId ? { ...ch, files: [...ch.files, ...filesArray] } : ch
        )
      );

      toast({ title: 'Files Uploaded', description: `${filesArray.length} file(s) added.` });
    };

    input.click();
  };

  // Delete a file
  const handleDeleteFile = (chapterId: number, fileName: string) => {
    setChapters(prev =>
      prev.map(ch =>
        ch.id === chapterId ? { ...ch, files: ch.files.filter(f => f !== fileName) } : ch
      )
    );

    toast({ title: 'File Deleted', description: `${fileName} has been removed.` });
  };

  // Update chapter name
  const handleChapterNameChange = (chapterId: number, name: string) => {
    setChapters(prev =>
      prev.map(ch => (ch.id === chapterId ? { ...ch, name } : ch))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{t('chapterManagement')}</h1>

        {/* Input + Button responsive row */}
        <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
          <Input
            placeholder="Enter chapter name"
            value={newChapterName}
            onChange={e => setNewChapterName(e.target.value)}
            className="flex-1"
          />
          <Button
            onClick={handleCreateChapter}
            className="bg-gradient-primary hover:opacity-90 w-full sm:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Chapter
          </Button>
        </div>
      </div>

      {/* Chapter Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {chapters.map((chapter) => (
          <Card key={chapter.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Folder className="h-5 w-5 text-primary shrink-0" />
                <Input
                  className="bg-transparent border-none px-0 py-0 text-lg font-semibold w-full"
                  value={chapter.name}
                  onChange={e => handleChapterNameChange(chapter.id, e.target.value)}
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-1">
              <div className="space-y-3 flex-1">
                <Button
                  size="sm"
                  onClick={() => handleUploadFile(chapter.id)}
                  className="w-full sm:w-auto"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Files
                </Button>

                <div className="space-y-2">
                  {chapter.files.map((file) => (
                    <div
                      key={file}
                      className="flex items-center justify-between p-2 rounded-lg bg-card-hover flex-wrap"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <File className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span className="text-sm truncate">{file}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteFile(chapter.id, file)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                  {chapter.files.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No files uploaded yet
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
