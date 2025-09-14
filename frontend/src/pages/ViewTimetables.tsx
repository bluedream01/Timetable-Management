import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarView } from "@/components/CalendarView";
import { Eye, Edit, Phone, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DayOfWeek, TimeSlot } from "@/types";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { v4 as uuidv4 } from "uuid";

export const ViewTimetables: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();

  const [visibleDeptId, setVisibleDeptId] = useState<number | null>(null);
  const [editableDeptId, setEditableDeptId] = useState<number | null>(null);
  const [editingSlot, setEditingSlot] = useState<{ day: DayOfWeek; index: number; deptId: number } | null>(null);
  const [slotData, setSlotData] = useState<TimeSlot>({
    subject: "",
    faculty: "",
    room: "",
    id: "",
    time: "",
  });

  const timetables = [
    { id: 1, name: "CS Department - Semester 1", createdDate: "2025-01-15", status: "finalized", department: "CS" },
    { id: 2, name: "ECE Department - Semester 1", createdDate: "2025-01-14", status: "finalized", department: "ECE" },
    { id: 3, name: "EEE Department - Semester 1", createdDate: "2025-01-13", status: "finalized", department: "EEE" },
  ];

  const [mockSchedules, setMockSchedules] = useState<Record<number, Record<DayOfWeek, TimeSlot[]>>>({
    1: {
      monday: [{ subject: "Mathematics", faculty: "Dr. Sharma", room: "Room 101", id: uuidv4(), time: "9:00" }],
      tuesday: [{ subject: "DSA", faculty: "Dr. Rao", room: "Room 101", id: uuidv4(), time: "9:00" }],
      wednesday: [],
      thursday: [],
      friday: [],
    },
    2: {
      monday: [{ subject: "Electronics", faculty: "Dr. Raghavan", room: "Room 201", id: uuidv4(), time: "9:00" }],
      tuesday: [{ subject: "Microcontrollers", faculty: "Dr. Banerjee", room: "Room 201", id: uuidv4(), time: "9:00" }],
      wednesday: [],
      thursday: [],
      friday: [],
    },
    3: {
      monday: [{ subject: "Circuits", faculty: "Prof. Kulkarni", room: "Room 301", id: uuidv4(), time: "9:00" }],
      tuesday: [{ subject: "Power Systems", faculty: "Ms. Gupta", room: "Room 301", id: uuidv4(), time: "9:00" }],
      wednesday: [],
      thursday: [],
      friday: [],
    },
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "outline"> = {
      finalized: "default",
      underReview: "secondary",
      draft: "outline",
    };
    return <Badge variant={variants[status] || "outline"}>{t(status) || status}</Badge>;
  };

  const handleViewToggle = (deptId: number) => {
    setVisibleDeptId((prev) => (prev === deptId ? null : deptId));
  };

  const handleEdit = (deptId: number) => {
    setEditableDeptId(deptId);
    setVisibleDeptId(deptId);
    toast({ title: "Edit Mode", description: "You can now edit this timetable." });
  };

  const handleEditSlot = (deptId: number, day: DayOfWeek, index: number) => {
    const slot =
      mockSchedules[deptId][day][index] || { subject: "", faculty: "", room: "", id: uuidv4(), time: "" };
    setSlotData(slot);
    setEditingSlot({ day, index, deptId });
  };

  const handleSaveSlot = () => {
    if (!editingSlot) return;

    setMockSchedules((prev) => {
      const updated = structuredClone(prev);

      // ⏰ auto-assign time from slot index
      const time = `${9 + editingSlot.index}:00`;

      updated[editingSlot.deptId][editingSlot.day][editingSlot.index] = {
        ...slotData,
        id: slotData.id || uuidv4(),
        time,
      };

      return updated;
    });

    setEditingSlot(null);
    setSlotData({ subject: "", faculty: "", room: "", id: "", time: "" });
    toast({ title: "Slot Updated", description: "The timetable slot has been updated." });
  };

  const handleSaveChanges = async () => {
    if (!editableDeptId) return;
    const schedule = mockSchedules[editableDeptId];

    const classes = Object.values(schedule).flatMap((slots) =>
      slots.map((slot) => ({
        subject: slot.subject,
        time: slot.time, // ✅ already assigned when slot was saved
        room: slot.room,
      }))
    );

    const payload = {
      studentPhone: "+919831224335",
      date: new Date().toISOString().split("T")[0],
      classes,
    };

    try {
      const res = await fetch("http://localhost:5000/api/sms/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to update timetable");

      toast({ title: "Saved", description: "Updated timetable sent to backend." });
      setEditableDeptId(null);
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Failed to save changes." });
    }
  };

  const handleCallAdmin = () => {
    toast({ title: "Admin Notified", description: "Admin has been notified about the delay." });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">{t("viewTimetables")}</h1>
        {user?.role === "teacher" && (
          <Button onClick={handleCallAdmin} variant="outline" aria-label="Call Admin">
            <Phone className="mr-2 h-4 w-4" />
            Call Admin (Follow-up)
          </Button>
        )}
      </div>

      <div className="grid gap-4">
        {timetables.map((timetable) => {
          const schedule = mockSchedules[timetable.id];
          const isEditable = editableDeptId === timetable.id;
          const isVisible = visibleDeptId === timetable.id;

          return (
            <div key={timetable.id} className="space-y-2">
              <Card className="hover:shadow-card transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{timetable.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        Created: {new Date(timetable.createdDate).toLocaleDateString()}
                      </p>
                    </div>
                    {getStatusBadge(timetable.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 justify-end">
                    <Button size="sm" variant="outline" onClick={() => handleViewToggle(timetable.id)}>
                      <Eye className="mr-2 h-4 w-4" /> {isVisible ? "Hide" : "View"}
                    </Button>
                    {(user?.role === "admin" || user?.role === "teacher") && (
                      <Button size="sm" variant="outline" onClick={() => handleEdit(timetable.id)}>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {isVisible && schedule && (
                <Card>
                  <CardHeader className="flex justify-between items-center">
                    <CardTitle>Timetable Preview</CardTitle>
                    {isEditable && (
                      <Button size="sm" onClick={handleSaveChanges} className="bg-gradient-primary hover:opacity-90">
                        <Save className="mr-2 h-4 w-4" /> Save Changes
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent>
                    <CalendarView
                      schedule={schedule}
                      editable={isEditable}
                      onEdit={(day, index) => handleEditSlot(timetable.id, day, index)}
                    />
                  </CardContent>
                </Card>
              )}
            </div>
          );
        })}
      </div>

      {editingSlot && (
        <Modal isOpen={!!editingSlot} onClose={() => setEditingSlot(null)}>
          <div className="space-y-4 p-4">
            <h2 className="text-lg font-bold">Edit Slot</h2>
            <div className="space-y-2">
              <div>
                <Label>Subject</Label>
                <Input
                  value={slotData.subject}
                  onChange={(e) => setSlotData({ ...slotData, subject: e.target.value })}
                />
              </div>
              <div>
                <Label>Room</Label>
                <Input value={slotData.room} onChange={(e) => setSlotData({ ...slotData, room: e.target.value })} />
              </div>
              <div>
                <Label>Faculty</Label>
                <Input
                  value={slotData.faculty}
                  onChange={(e) => setSlotData({ ...slotData, faculty: e.target.value })}
                />
              </div>
              <Button className="bg-gradient-primary hover:opacity-90" onClick={handleSaveSlot}>
                Save Slot
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
