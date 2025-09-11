import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Folder, File, Download, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const StudyMaterials: React.FC = () => {
  const { toast } = useToast();

  const materials = [
    {
      subject: 'Mathematics',
      teacher: 'Dr. Sharma',
      chapters: [
        { name: 'Chapter 1: Calculus', files: ['notes.pdf', 'problems.pdf'] },
        { name: 'Chapter 2: Linear Algebra', files: ['lecture.ppt', 'assignment.docx'] },
      ],
    },
    {
      subject: 'Physics',
      teacher: 'Prof. Kumar',
      chapters: [
        { name: 'Chapter 1: Mechanics', files: ['theory.pdf', 'examples.pdf'] },
        { name: 'Chapter 2: Thermodynamics', files: ['notes.pdf'] },
      ],
    },
  ];

  const handleView = (fileName: string) => {
    toast({
      title: "Opening File",
      description: `Viewing ${fileName}`,
    });
  };

  const handleDownload = (fileName: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${fileName}`,
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Study Materials</h1>

      <div className="grid gap-6">
        {materials.map((subject) => (
          <Card key={subject.subject}>
            <CardHeader>
              <CardTitle className="text-xl">
                {subject.subject}
                <p className="text-sm text-muted-foreground font-normal mt-1">
                  by {subject.teacher}
                </p>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {subject.chapters.map((chapter) => (
                <div key={chapter.name} className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Folder className="h-5 w-5 text-primary" />
                    <h4 className="font-medium">{chapter.name}</h4>
                  </div>
                  <div className="space-y-2 ml-7">
                    {chapter.files.map((file) => (
                      <div key={file} className="flex items-center justify-between p-2 rounded-lg bg-card-hover">
                        <div className="flex items-center gap-2">
                          <File className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{file}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleView(file)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDownload(file)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};