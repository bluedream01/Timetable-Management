import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Edit, Trash2, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const ManageUsers: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const users = [
    { id: 1, name: 'Dr. Sharma', email: 'sharma@jharkhand.gov.in', role: 'teacher', department: 'CS' },
    { id: 2, name: 'Prof. Kumar', email: 'kumar@jharkhand.gov.in', role: 'teacher', department: 'ECE' },
    { id: 3, name: 'Rahul Singh', email: 'rahul@jharkhand.gov.in', role: 'student', department: 'CS' },
    { id: 4, name: 'Priya Patel', email: 'priya@jharkhand.gov.in', role: 'student', department: 'EEE' },
  ];

  const handleAddUser = () => {
    toast({
      title: "Add User",
      description: "User creation form opened.",
    });
  };

  const handleEditUser = (id: number) => {
    toast({
      title: "Edit User",
      description: `Editing user with ID: ${id}`,
    });
  };

  const handleDeleteUser = (id: number) => {
    toast({
      title: "User Deleted",
      description: "User has been removed from the system.",
      variant: "destructive",
    });
  };

  const getRoleBadge = (role: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'outline'> = {
      admin: 'default',
      teacher: 'secondary',
      student: 'outline',
    };
    return <Badge variant={variants[role] || 'outline'}>{role}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">Manage Users</h1>
        <Button onClick={handleAddUser} className="bg-gradient-primary hover:opacity-90">
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {users
              .filter(user => 
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 rounded-lg bg-card-hover">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {getRoleBadge(user.role)}
                      <span className="text-xs text-muted-foreground">• {user.department}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEditUser(user.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};