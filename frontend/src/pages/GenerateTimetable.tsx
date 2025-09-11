import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarView } from '@/components/CalendarView';
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const GenerateTimetable: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [timetable, setTimetable] = useState<any>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const mockTimetable = {
        monday: [
          { time: '9:00-10:00', subject: 'Mathematics', room: 'Room 101', faculty: 'Dr. Sharma' },
          { time: '10:00-11:00', subject: 'Physics', room: 'Room 102', faculty: 'Prof. Kumar' },
          { time: '11:00-12:00', subject: 'Chemistry', room: 'Lab 1', faculty: 'Dr. Singh' },
        ],
        tuesday: [
          { time: '9:00-10:00', subject: 'Computer Science', room: 'Lab 2', faculty: 'Prof. Verma' },
          { time: '10:00-11:00', subject: 'English', room: 'Room 103', faculty: 'Ms. Patel' },
        ],
      };
      setTimetable(mockTimetable);
      setIsGenerating(false);
      toast({
        title: "Timetable Generated",
        description: "Your timetable has been generated successfully!",
      });
    }, 2000);
  };

  const handleSave = () => {
    toast({
      title: "Timetable Saved",
      description: "The timetable has been saved as draft.",
    });
  };

  const handleSendForReview = () => {
    toast({
      title: "Sent for Review",
      description: "The timetable has been sent to admin for review.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">{t('generateTimetable')}</h1>
      </div>

      {!timetable ? (
        <Card>
          <CardHeader>
            <CardTitle>Generate New Timetable</CardTitle>
          </CardHeader>
          <CardContent className="text-center py-12">
            <Sparkles className="h-16 w-16 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Ready to Generate</h3>
            <p className="text-muted-foreground mb-6">
              Click the button below to generate an optimized timetable based on your constraints
            </p>
            <Button 
              size="lg" 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="bg-gradient-primary hover:opacity-90"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Timetable
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Generated Timetable</CardTitle>
            </CardHeader>
            <CardContent>
              <CalendarView timetable={timetable} />
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setTimetable(null)}>
              Generate New
            </Button>
            <Button variant="secondary" onClick={handleSave}>
              Save as Draft
            </Button>
            <Button onClick={handleSendForReview} className="bg-gradient-primary hover:opacity-90">
              Send for Review
            </Button>
          </div>
        </>
      )}
    </div>
  );
};