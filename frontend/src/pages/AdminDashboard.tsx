import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  BookOpen, 
  Home, 
  Clock, 
  TrendingUp,
  Calendar,
  Plus,
  Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const stats = [
    {
      title: t('totalClassrooms'),
      value: '24',
      icon: Home,
      color: 'text-primary',
      bgColor: 'bg-primary-light',
    },
    {
      title: t('totalFaculty'),
      value: '48',
      icon: Users,
      color: 'text-secondary',
      bgColor: 'bg-secondary-light',
    },
    {
      title: t('totalSubjects'),
      value: '36',
      icon: BookOpen,
      color: 'text-accent',
      bgColor: 'bg-accent-light',
    },
    {
      title: t('pendingTimetables'),
      value: '3',
      icon: Clock,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
  ];

  const departments = [
    { name: 'CS', fullName: t('cs'), status: 'finalized', classes: 8 },
    { name: 'ECE', fullName: t('ece'), status: 'underReview', classes: 7 },
    { name: 'EEE', fullName: t('eee'), status: 'draft', classes: 6 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'finalized':
        return 'bg-success text-success-foreground';
      case 'underReview':
        return 'bg-warning text-warning-foreground';
      case 'draft':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6 px-2 sm:px-4 md:px-6">
      {/* Welcome Header */}
      <div className="bg-gradient-primary rounded-lg p-4 sm:p-6 text-primary-foreground shadow-lg text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          Welcome to Admin Dashboard
        </h1>
        <p className="opacity-90 text-sm sm:text-base">
          Manage timetables for all departments efficiently
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="border-border hover:shadow-card transition-shadow"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <TrendingUp className="mr-1 h-3 w-3 text-success" />
                <span>+12% from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions + Department Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              className="w-full bg-gradient-primary hover:opacity-90"
              onClick={() => navigate('/generate-timetable')}
            >
              <Plus className="mr-2 h-4 w-4" />
              {t('createNewTimetable')}
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate('/view-timetables')}
            >
              <Eye className="mr-2 h-4 w-4" />
              {t('viewExistingTimetables')}
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Department Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {departments.map((dept) => (
                <div
                  key={dept.name}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 p-3 rounded-lg bg-card-hover"
                >
                  <div className="text-center sm:text-left">
                    <p className="font-medium text-foreground">
                      {dept.fullName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {dept.classes} classes/day
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium self-center sm:self-auto ${getStatusColor(
                      dept.status
                    )}`}
                  >
                    {t(dept.status)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 p-3 rounded-lg hover:bg-card-hover transition-colors">
              <div className="w-2 h-2 bg-success rounded-full mb-2 sm:mb-0"></div>
              <p className="text-sm flex-1">
                <span className="font-medium">CS Department</span> timetable
                was approved
              </p>
              <span className="text-xs text-muted-foreground sm:ml-auto">
                2 hours ago
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 p-3 rounded-lg hover:bg-card-hover transition-colors">
              <div className="w-2 h-2 bg-warning rounded-full mb-2 sm:mb-0"></div>
              <p className="text-sm flex-1">
                <span className="font-medium">Dr. Sharma</span> submitted ECE
                timetable for review
              </p>
              <span className="text-xs text-muted-foreground sm:ml-auto">
                5 hours ago
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 p-3 rounded-lg hover:bg-card-hover transition-colors">
              <div className="w-2 h-2 bg-primary rounded-full mb-2 sm:mb-0"></div>
              <p className="text-sm flex-1">
                <span className="font-medium">New faculty</span> added to EEE
                department
              </p>
              <span className="text-xs text-muted-foreground sm:ml-auto">
                1 day ago
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
