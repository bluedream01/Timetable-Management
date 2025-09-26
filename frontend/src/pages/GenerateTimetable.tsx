import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarView } from "@/components/CalendarView";
import { Loader2, Sparkles, CheckCircle2, Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// ✅ Subjects
const availableSubjects = ["DSA", "Analog", "Maths-III", "Signal & Systems"];

// ✅ Faculty List
const availableFaculty = [
  { name: "Dr. Sharma", teaches: "DSA" },
  { name: "Prof. Nair", teaches: "DSA" },
  { name: "Ms. Kapoor", teaches: "DSA" },

  { name: "Prof. Verma", teaches: "Analog" },
  { name: "Dr. Raghavan", teaches: "Analog" },
  { name: "Mr. Sinha", teaches: "Analog" },

  { name: "Ms. Gupta", teaches: "Maths-III" },
  { name: "Dr. Rao", teaches: "Maths-III" },
  { name: "Prof. Kulkarni", teaches: "Maths-III" },

  { name: "Mr. Khan", teaches: "Signal & Systems" },
  { name: "Dr. Banerjee", teaches: "Signal & Systems" },
  { name: "Ms. Thomas", teaches: "Signal & Systems" },

  { name: "Prof. Iyer", teaches: "Digital Electronics" },
  { name: "Ms. Fernandes", teaches: "Digital Electronics" },
  { name: "Dr. Choudhury", teaches: "Digital Electronics" },

  { name: "Mr. Mehta", teaches: "Computer Networks" },
  { name: "Prof. Mukherjee", teaches: "Computer Networks" },
  { name: "Dr. Reddy", teaches: "Computer Networks" },

  { name: "Ms. Joshi", teaches: "Operating Systems" },
  { name: "Dr. Singh", teaches: "Operating Systems" },
  { name: "Prof. Menon", teaches: "Operating Systems" },

  { name: "Dr. Krishnan", teaches: "DBMS" },
  { name: "Mr. Joseph", teaches: "DBMS" },
  { name: "Ms. Roy", teaches: "DBMS" },
];

export const GenerateTimetable: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const [isGenerating, setIsGenerating] = useState(false);
  const [timetables, setTimetables] = useState<any[]>([]);
  const [approved, setApproved] = useState<any | null>(null);

  // ✅ Pick random faculty for each subject
  const randomFaculty = (subject: string) => {
    const faculty = availableFaculty.filter((f) => f.teaches === subject);
    return faculty[Math.floor(Math.random() * faculty.length)].name;
  };

  // ✅ Generate single timetable
  const generateSingleTimetable = () => {
    return {
      monday: [
        { time: "09:00 - 10:00", subject: "DSA", room: "Room 101", faculty: randomFaculty("DSA") },
        { time: "10:00 - 11:00", subject: "Analog", room: "Room 102", faculty: randomFaculty("Analog") },
        { time: "11:00 - 12:00", subject: "Maths-III", room: "Room 103", faculty: randomFaculty("Maths-III") },
        { time: "02:00 - 04:00", subject: "DSA Lab", room: "Lab 201", faculty: randomFaculty("DSA") },
      ],
      tuesday: [
        { time: "09:00 - 10:00", subject: "Signals & Systems", room: "Room 104", faculty: randomFaculty("Signal & Systems") },
        { time: "10:00 - 11:00", subject: "Operating Systems", room: "Room 105", faculty: randomFaculty("Operating Systems") },
        { time: "11:00 - 12:00", subject: "Maths-III", room: "Room 106", faculty: randomFaculty("Maths-III") },
        { time: "02:00 - 04:00", subject: "DBMS Lab", room: "Lab 202", faculty: randomFaculty("DBMS") },
      ],
      wednesday: [
        { time: "09:00 - 10:00", subject: "Analog", room: "Room 107", faculty: randomFaculty("Analog") },
        { time: "10:00 - 11:00", subject: "Computer Networks", room: "Room 108", faculty: randomFaculty("Computer Networks") },
        { time: "11:00 - 12:00", subject: "Maths-III", room: "Room 109", faculty: randomFaculty("Maths-III") },
        { time: "02:00 - 03:00", subject: "Digital Electronics", room: "Room 110", faculty: randomFaculty("Digital Electronics") },
        { time: "03:00 - 04:00", subject: "Signals & Systems", room: "Room 111", faculty: randomFaculty("Signal & Systems") },
      ],
      thursday: [
        { time: "09:00 - 10:00", subject: "Operating Systems", room: "Room 112", faculty: randomFaculty("Operating Systems") },
        { time: "10:00 - 11:00", subject: "DBMS", room: "Room 113", faculty: randomFaculty("DBMS") },
        { time: "11:00 - 12:00", subject: "DSA", room: "Room 114", faculty: randomFaculty("DSA") },
        { time: "02:00 - 04:00", subject: "Networks Lab", room: "Lab 203", faculty: randomFaculty("Computer Networks") },
      ],
      friday: [
        { time: "09:00 - 10:00", subject: "Digital Electronics", room: "Room 115", faculty: randomFaculty("Digital Electronics") },
        { time: "10:00 - 11:00", subject: "Signals & Systems", room: "Room 116", faculty: randomFaculty("Signal & Systems") },
        { time: "11:00 - 12:00", subject: "Analog", room: "Room 117", faculty: randomFaculty("Analog") },
        { time: "02:00 - 03:00", subject: "Operating Systems", room: "Room 118", faculty: randomFaculty("Operating Systems") },
        { time: "03:00 - 04:00", subject: "DBMS", room: "Room 119", faculty: randomFaculty("DBMS") },
      ],
    };
  };

  // ✅ Generate 3 timetables
  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const generated = [generateSingleTimetable(), generateSingleTimetable(), generateSingleTimetable()];
      setTimetables(generated);
      setIsGenerating(false);
      toast({
        title: "Timetables Generated",
        description: "Three timetables have been generated. Please review and approve one.",
      });
    }, 2000);
  };

  const handleApprove = (timetable: any) => {
    setApproved(timetable);
    toast({
      title: "Timetable Approved",
      description: "You approved one of the generated timetables.",
    });
  };

  const handleEdit = (timetable: any) => {
    toast({
      title: "Edit Mode",
      description: "You can now edit this timetable.",
    });
  };

  const handleSave = () => {
    toast({
      title: "Timetable Saved",
      description: "The timetable has been saved as draft.",
    });
  };

  return (
    <div className="space-y-6 px-2 sm:px-4 md:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          {t("generateTimetable")}
        </h1>
      </div>

      {/* Case 1: No timetables generated yet */}
      {timetables.length === 0 && !approved ? (
        <Card>
          <CardHeader>
            <CardTitle>Generate New Timetable</CardTitle>
          </CardHeader>
          <CardContent className="text-center py-12">
            <Sparkles className="h-16 w-16 text-primary mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              Ready to Generate
            </h3>
            <p className="text-muted-foreground mb-6 text-sm sm:text-base">
              Click the button below to generate 3 optimized timetables
            </p>
            <Button
              size="lg"
              onClick={handleGenerate}
              disabled={isGenerating}
              className="bg-gradient-primary hover:opacity-90 w-full sm:w-auto"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Timetables
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      ) : approved ? (
        // Case 2: Approved timetable
        <>
          <Card>
            <CardHeader>
              <CardTitle>Approved Timetable</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <CalendarView schedule={approved} />
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row justify-end gap-3">
            <Button variant="outline" onClick={() => setApproved(null)}>
              Generate Again
            </Button>
            <Button variant="secondary" onClick={handleSave}>
              Save as Draft
            </Button>
          </div>
        </>
      ) : (
        // Case 3: Show generated timetables (responsive grid)
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-6">
          {timetables.map((tt, idx) => (
            <Card key={idx} className="shadow-md hover:shadow-lg transition">
              <CardHeader>
                <CardTitle>Option {idx + 1}</CardTitle>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <CalendarView schedule={tt} />
                <div className="flex flex-col sm:flex-row justify-between mt-4 gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => handleEdit(tt)}
                    className="w-full sm:w-auto"
                  >
                    <Pencil className="mr-2 h-4 w-4" /> Edit
                  </Button>
                  <Button
                    onClick={() => handleApprove(tt)}
                    className="bg-gradient-primary hover:opacity-90 w-full sm:w-auto"
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" /> Approve
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
