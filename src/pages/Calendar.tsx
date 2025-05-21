import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay, addDays } from 'date-fns';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Filter, Clock } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { cn } from '../utils/cn';

interface Event {
  id: string;
  title: string;
  date: Date;
  time?: string;
  project?: {
    name: string;
    color: 'primary' | 'success' | 'warning' | 'error';
  };
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Team Meeting',
    date: new Date(2025, 4, 15, 10, 0),
    time: '10:00 AM',
    project: { name: 'Website Redesign', color: 'primary' }
  },
  {
    id: '2',
    title: 'Client Presentation',
    date: new Date(2025, 4, 15, 14, 0),
    time: '2:00 PM',
    project: { name: 'Mobile App', color: 'success' }
  },
  {
    id: '3',
    title: 'Project Deadline',
    date: new Date(2025, 4, 20),
    project: { name: 'Marketing Campaign', color: 'warning' }
  }
];

const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(2025, 4, 1)); // May 2025
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2025, 4, 15));
  
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Add days to complete the calendar grid
  const startDay = monthStart.getDay();
  const endDay = 6 - monthEnd.getDay();
  
  const previousMonthDays = Array.from({ length: startDay }, (_, i) => 
    addDays(monthStart, -(startDay - i))
  );
  
  const nextMonthDays = Array.from({ length: endDay }, (_, i) => 
    addDays(monthEnd, i + 1)
  );
  
  const allDays = [...previousMonthDays, ...days, ...nextMonthDays];
  
  const previousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const goToToday = () => {
    setCurrentMonth(new Date(2025, 4, 1));
    setSelectedDate(new Date(2025, 4, 15));
  };
  
  const getEventsForDate = (date: Date) => 
    mockEvents.filter(event => isSameDay(event.date, date));
  
  return (
    <div className="space-y-6 animate-fade-in pb-16 lg:pb-0">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="font-heading font-semibold text-xl">{format(currentMonth, 'MMMM yyyy')}</h2>
          <div className="flex items-center gap-1">
            <button 
              className="p-1.5 rounded-md hover:bg-hover"
              onClick={previousMonth}
            >
              <ChevronLeft size={16} className="text-text/60" />
            </button>
            <button 
              className="p-1.5 rounded-md hover:bg-hover"
              onClick={nextMonth}
            >
              <ChevronRight size={16} className="text-text/60" />
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={goToToday}>Today</Button>
          <Button variant="outline" size="sm" icon={<Filter size={14} />}>
            Filter
          </Button>
          <Button size="sm" icon={<Plus size={14} />}>Add Event</Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-7 gap-px bg-border">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div 
                key={day}
                className="p-3 text-sm font-medium text-text/60 text-center bg-hover/50"
              >
                {day}
              </div>
            ))}
            
            {allDays.map((day, index) => {
              const isCurrentMonth = isSameMonth(day, currentMonth);
              const isSelected = isSameDay(day, selectedDate);
              const dayEvents = getEventsForDate(day);
              
              return (
                <div
                  key={day.toString()}
                  className={cn(
                    "min-h-28 p-2 bg-white relative",
                    !isCurrentMonth && "bg-hover/30"
                  )}
                  onClick={() => setSelectedDate(day)}
                >
                  <button
                    className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center text-sm",
                      isSelected && "bg-primary text-white font-medium",
                      isToday(day) && !isSelected && "bg-primary/10 text-primary font-medium",
                      !isSelected && !isToday(day) && "hover:bg-hover",
                      !isCurrentMonth && "text-text/30"
                    )}
                  >
                    {format(day, 'd')}
                  </button>
                  
                  <div className="mt-1 space-y-1">
                    {dayEvents.map(event => (
                      <div
                        key={event.id}
                        className="group rounded-md hover:bg-hover p-1.5 cursor-pointer"
                      >
                        {event.time && (
                          <div className="flex items-center text-xs text-text/60 mb-0.5">
                            <Clock size={10} className="mr-1" />
                            {event.time}
                          </div>
                        )}
                        <div className="flex items-start gap-1.5">
                          {event.project && (
                            <div className={cn(
                              "w-1 h-1 rounded-full mt-1.5",
                              event.project.color === 'primary' && "bg-primary",
                              event.project.color === 'success' && "bg-success",
                              event.project.color === 'warning' && "bg-warning",
                              event.project.color === 'error' && "bg-error"
                            )} />
                          )}
                          <p className="text-xs font-medium leading-tight">{event.title}</p>
                        </div>
                        {event.project && (
                          <div className="hidden group-hover:block mt-1">
                            <Badge 
                              variant={event.project.color} 
                              size="sm"
                              className="text-[10px] py-px"
                            >
                              {event.project.name}
                            </Badge>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Calendar;