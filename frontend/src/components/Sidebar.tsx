import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Settings,
  LogOut,
  Database,
  ClipboardList,
  BookOpen,
  Bell,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  const getMenuItems = () => {
    if (!user) return [];

    const baseItems = [
      {
        icon: LayoutDashboard,
        label: t('dashboard'),
        path: '/dashboard',
      },
    ];

    if (user.role === 'admin') {
      return [
        ...baseItems,
        {
          icon: Database,
          label: t('inputData'),
          path: '/input-data',
        },
        {
          icon: Calendar,
          label: t('generateTimetable'),
          path: '/generate-timetable',
        },
        {
          icon: ClipboardList,
          label: t('viewTimetables'),
          path: '/view-timetables',
        },
        {
          icon: Users,
          label: 'Manage Users',
          path: '/manage-users',
        },
      ];
    }

    if (user.role === 'teacher') {
      return [
        ...baseItems,
        {
          icon: BookOpen,
          label: t('chapterManagement'),
          path: '/chapter-management',
        },
        {
          icon: Bell,
          label: t('notifications'),
          path: '/notifications',
        },
      ];
    }

    if (user.role === 'student') {
      return [
        ...baseItems,
        {
          icon: Calendar,
          label: 'My Timetable',
          path: '/my-timetable',
        },
        {
          icon: BookOpen,
          label: 'Study Materials',
          path: '/study-materials',
        },
        {
          icon: Bell,
          label: t('notifications'),
          path: '/notifications',
        },
      ];
    }

    return baseItems;
  };

  const menuItems = getMenuItems();

  return (
    <aside className="w-64 h-screen bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">GC</span>
          </div>
          <div>
            <h2 className="font-semibold text-sidebar-foreground">Jharkhand Gov</h2>
            <p className="text-xs text-muted-foreground">Timetable System</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="px-6 py-4 border-b border-sidebar-border">
        <div className="text-sm">
          <p className="font-medium text-sidebar-foreground">{user?.name}</p>
          <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg transition-all',
                'hover:bg-sidebar-accent text-sidebar-foreground',
                isActive && 'bg-sidebar-primary text-sidebar-primary-foreground font-medium'
              )
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
        
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg transition-all',
              'hover:bg-sidebar-accent text-sidebar-foreground',
              isActive && 'bg-sidebar-primary text-sidebar-primary-foreground font-medium'
            )
          }
        >
          <Settings className="w-5 h-5" />
          <span>{t('settings')}</span>
        </NavLink>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={logout}
        >
          <LogOut className="w-5 h-5 mr-3" />
          {t('logout')}
        </Button>
      </div>
    </aside>
  );
};