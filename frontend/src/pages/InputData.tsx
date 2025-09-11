import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const InputData: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [subjects, setSubjects] = useState<string[]>(['']);
  const [faculty, setFaculty] = useState<string[]>(['']);

  const handleAddSubject = () => {
    setSubjects([...subjects, '']);
  };

  const handleRemoveSubject = (index: number) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const handleAddFaculty = () => {
    setFaculty([...faculty, '']);
  };

  const handleRemoveFaculty = (index: number) => {
    setFaculty(faculty.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    toast({
      title: "Data Saved",
      description: "Timetable input data has been saved successfully.",
    });
  };

  const handleUpload = () => {
    toast({
      title: "Upload Started",
      description: "Please select an Excel/CSV file to upload.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">{t('inputData')}</h1>
        <Button onClick={handleUpload} variant="outline">
          <Upload className="mr-2 h-4 w-4" />
          Upload Excel/CSV
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="classrooms">Number of Classrooms</Label>
              <Input id="classrooms" type="number" placeholder="Enter number" />
            </div>
            <div>
              <Label htmlFor="batches">Number of Batches</Label>
              <Input id="batches" type="number" placeholder="Enter number" />
            </div>
            <div>
              <Label htmlFor="maxClasses">Max Classes per Day</Label>
              <Input id="maxClasses" type="number" placeholder="Enter number" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Subjects
              <Button size="sm" onClick={handleAddSubject}>
                <Plus className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {subjects.map((subject, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={subject}
                  onChange={(e) => {
                    const newSubjects = [...subjects];
                    newSubjects[index] = e.target.value;
                    setSubjects(newSubjects);
                  }}
                  placeholder="Enter subject name"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleRemoveSubject(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Faculty
              <Button size="sm" onClick={handleAddFaculty}>
                <Plus className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {faculty.map((member, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={member}
                  onChange={(e) => {
                    const newFaculty = [...faculty];
                    newFaculty[index] = e.target.value;
                    setFaculty(newFaculty);
                  }}
                  placeholder="Enter faculty name"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleRemoveFaculty(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Constraints</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="maxPerWeek">Max Classes per Week</Label>
              <Input id="maxPerWeek" type="number" placeholder="Enter number" />
            </div>
            <div>
              <Label htmlFor="fixedSlots">Fixed Time Slots</Label>
              <Input id="fixedSlots" placeholder="e.g., Monday 9-10 AM" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSave} className="bg-gradient-primary hover:opacity-90">
          Save Data
        </Button>
      </div>
    </div>
  );
};