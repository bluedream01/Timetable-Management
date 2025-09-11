import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const languages = [
  { value: 'en', label: 'English', native: 'English' },
  { value: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { value: 'nagpuri', label: 'Nagpuri', native: 'नागपुरी' },
  { value: 'santali', label: 'Santali', native: 'संताली' },
];

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
      <SelectTrigger className="w-[180px] bg-card border-border">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-primary" />
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent className="bg-card border-border">
        {languages.map((lang) => (
          <SelectItem 
            key={lang.value} 
            value={lang.value}
            className="hover:bg-muted cursor-pointer"
          >
            <span className="font-medium">{lang.native}</span>
            {lang.value !== 'en' && (
              <span className="ml-2 text-muted-foreground text-sm">({lang.label})</span>
            )}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};