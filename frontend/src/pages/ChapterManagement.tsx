import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Folder, File, Plus, Upload, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const ChapterManagement: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [chapters, setChapters] = useState([
    { id: 1, name: 'Chapter 1: Introduction', files: ['notes.pdf', 'assignment1.docx'] },
    { id: 2, name: 'Chapter 2: Basics', files: ['lecture.ppt'] },
  ]);

  const handleCreateChapter = () => {
    const newChapter = {
      id: chapters.length + 1,
      name: `Chapter ${chapters.length + 1}`,
      files: [],
    };
    setChapters([...chapters, newChapter]);
    toast({
      title: "Chapter Created",
      description: "New chapter folder has been created.",
    });
  };

  const handleUploadFile = (chapterId: number) => {
    toast({
      title: "Upload Started",
      description: "Select files to upload to this chapter.",
    });
  };

  const handleDeleteFile = (chapterId: number, fileName: string) => {
    toast({
      title: "File Deleted",
      description: `${fileName} has been removed.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">{t('chapterManagement')}</h1>
        <Button onClick={handleCreateChapter} className="bg-gradient-primary hover:opacity-90">
          <Plus className="mr-2 h-4 w-4" />
          Create Chapter
        </Button>
      </div>

      <div className="grid gap-4">
        {chapters.map((chapter) => (
          <Card key={chapter.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Folder className="h-5 w-5 text-primary" />
                {chapter.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input placeholder="Enter chapter name" defaultValue={chapter.name} />
                  <Button size="sm" onClick={() => handleUploadFile(chapter.id)}>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {chapter.files.map((file) => (
                    <div key={file} className="flex items-center justify-between p-2 rounded-lg bg-card-hover">
                      <div className="flex items-center gap-2">
                        <File className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{file}</span>
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