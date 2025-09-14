import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Upload, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export const InputData: React.FC = () => {
  const availableSubjects = ["DSA", "Analog", "Maths-III", "Signal & systems"];
  const availableFaculty = [
    // 1. Data Structures & Algorithms (DSA)
    { name: "Dr. Sharma", teaches: "DSA" },
    { name: "Prof. Nair", teaches: "DSA" },
    { name: "Ms. Kapoor", teaches: "DSA" },

    // 2. Analog Electronics
    { name: "Prof. Verma", teaches: "Analog" },
    { name: "Dr. Raghavan", teaches: "Analog" },
    { name: "Mr. Sinha", teaches: "Analog" },

    // 3. Mathematics-III
    { name: "Ms. Gupta", teaches: "Maths-III" },
    { name: "Dr. Rao", teaches: "Maths-III" },
    { name: "Prof. Kulkarni", teaches: "Maths-III" },

    // 4. Signals & Systems
    { name: "Mr. Khan", teaches: "Signal & Systems" },
    { name: "Dr. Banerjee", teaches: "Signal & Systems" },
    { name: "Ms. Thomas", teaches: "Signal & Systems" },

    // 5. Digital Electronics
    { name: "Prof. Iyer", teaches: "Digital Electronics" },
    { name: "Ms. Fernandes", teaches: "Digital Electronics" },
    { name: "Dr. Choudhury", teaches: "Digital Electronics" },

    // 6. Computer Networks
    { name: "Mr. Mehta", teaches: "Computer Networks" },
    { name: "Prof. Mukherjee", teaches: "Computer Networks" },
    { name: "Dr. Reddy", teaches: "Computer Networks" },

    // 7. Operating Systems
    { name: "Ms. Joshi", teaches: "Operating Systems" },
    { name: "Dr. Singh", teaches: "Operating Systems" },
    { name: "Prof. Menon", teaches: "Operating Systems" },

    // 8. Database Management Systems (DBMS)
    { name: "Dr. Krishnan", teaches: "DBMS" },
    { name: "Mr. Joseph", teaches: "DBMS" },
    { name: "Ms. Roy", teaches: "DBMS" },

  ];

  const allClassrooms = ["Room 101", "Room 102", "Room 103", "Room 104"];
  const unavailableClassrooms = ["Room 103"]; // example, can be fetched from backend

  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();

  const [subjects, setSubjects] = useState<string[]>([""]);
  const [faculty, setFaculty] = useState<string[]>([""]);
  const [selectedClassrooms, setSelectedClassrooms] = useState<string[]>([]);

  const handleAddSubject = () => setSubjects([...subjects, ""]);
  const handleRemoveSubject = (index: number) =>
    setSubjects(subjects.filter((_, i) => i !== index));

  const handleAddFaculty = () => setFaculty([...faculty, ""]);
  const handleRemoveFaculty = (index: number) =>
    setFaculty(faculty.filter((_, i) => i !== index));

  const handleClassroomClick = (room: string, disabled: boolean) => {
    if (disabled) return;
    if (selectedClassrooms.includes(room)) {
      setSelectedClassrooms(selectedClassrooms.filter((r) => r !== room));
    } else {
      setSelectedClassrooms([...selectedClassrooms, room]);
    }
  };

  const handleSave = async () => {
    const payload = {
      classrooms: selectedClassrooms.length,
      batches: Number((document.getElementById("batches") as HTMLInputElement)?.value || 0),
      maxClassesPerDay: Number((document.getElementById("maxClasses") as HTMLInputElement)?.value || 0),
      maxClassesPerWeek: Number((document.getElementById("maxPerWeek") as HTMLInputElement)?.value || 0),
      fixedSlots: [(document.getElementById("fixedSlots") as HTMLInputElement)?.value || ""],
      subjects,
      faculty,
    };

    try {
      const res = await fetch("http://localhost:5000/api/input-data/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast({
          title: "✅ Data Saved",
          description: "Timetable input data has been saved successfully.",
        });
        setSubjects([""]);
        setFaculty([""]);
        setSelectedClassrooms([]);
        navigate("/generate-timetable");
      } else {
        const err = await res.json();
        toast({
          title: "❌ Error",
          description: err.error || "Failed to save data",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "🚨 Network Error",
        description: "Backend not reachable. Please start Express server.",
        variant: "destructive",
      });
    }
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
        <h1 className="text-3xl font-bold text-foreground">{t("inputData")}</h1>
        <Button onClick={handleUpload} variant="outline">
          <Upload className="mr-2 h-4 w-4" />
          Upload Excel/CSV
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Classroom Selector */}
        <Card>
          <CardHeader>
            <CardTitle>Select Classrooms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {allClassrooms.map((room) => {
                const disabled = unavailableClassrooms.includes(room);
                const selected = selectedClassrooms.includes(room);
                return (
                  <div
                    key={room}
                    onClick={() => handleClassroomClick(room, disabled)}
                    className={`
                      relative cursor-pointer rounded-xl border p-4 text-center font-medium transition-all
                      ${disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed opacity-70 border-gray-300" : ""}
                      ${selected ? "bg-gradient-to-r from-blue-400 to-indigo-400 text-white shadow-lg scale-105" : "bg-white hover:bg-blue-50 border-blue-200"}
                    `}
                  >
                    {room}
                    {selected && !disabled && <Check className="absolute top-1 right-1 h-5 w-5 text-white" />}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Max Classes per Day */}
        <Card>
          <CardHeader>
            <CardTitle>Max Classes per Day</CardTitle>
          </CardHeader>
          <CardContent>
            <input
              id="maxClasses"
              type="number"
              min="1"
              className="w-full border rounded-md p-2"
              placeholder="Enter number"
            />
          </CardContent>
        </Card>

        {/* Subjects */}
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
                <select
                  className="w-full border rounded-md p-2"
                  value={subject}
                  onChange={(e) => {
                    const newSubjects = [...subjects];
                    newSubjects[index] = e.target.value;
                    setSubjects(newSubjects);
                  }}
                >
                  <option value="">Select subject</option>
                  {availableSubjects.map((s, i) => (
                    <option key={i} value={s}>{s}</option>
                  ))}
                </select>
                <Button size="icon" variant="ghost" onClick={() => handleRemoveSubject(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Faculty */}
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
                <select
                  className="w-full border rounded-md p-2"
                  value={member}
                  onChange={(e) => {
                    const newFaculty = [...faculty];
                    newFaculty[index] = e.target.value;
                    setFaculty(newFaculty);
                  }}
                >
                  <option value="">Select faculty</option>
                  {availableFaculty.map((f, i) => (
                    <option key={i} value={f.name}>
                      {f.name} ({f.teaches})
                    </option>
                  ))}
                </select>
                <Button size="icon" variant="ghost" onClick={() => handleRemoveFaculty(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
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
