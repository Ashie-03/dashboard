import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Card, CardHeader, CardContent } from '../ui/Card';

interface Event {
  id: string;
  date: Date;
  name: string;
}

interface MiniCalendarProps {
  events?: Event[];
}

const MiniCalendar: React.FC<MiniCalendarProps> = ({ events = [] }) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const previousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const onDateClick = (day: Date) => {
    setSelectedDate(day);
  };

  const hasEvent = (day: Date) => {
    return events.some(event => isSameDay(day, event.date));
  };

  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <Card className="h-full">
      <CardHeader className="flex justify-between items-center py-3">
        <h3 className="font-heading font-medium">{format(currentMonth, 'MMMM yyyy')}</h3>
        <div className="flex items-center gap-1">
          <button
            onClick={previousMonth}
            className="p-1 rounded-md hover:bg-hover text-text/60"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={nextMonth}
            className="p-1 rounded-md hover:bg-hover text-text/60"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </CardHeader>
      <CardContent className="p-2">
        <div className="grid grid-cols-7 gap-1 mb-1">
          {dayNames.map(day => (
            <div
              key={day}
              className="text-center text-xs font-medium text-text/50 py-1"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map(day => {
            const formattedDate = format(day, 'd');
            const isCurrentMonth = isSameMonth(day, currentMonth);
            const isSelected = isSameDay(day, selectedDate);
            const hasEventClass = hasEvent(day);
            
            return (
              <button
                key={day.toString()}
                onClick={() => onDateClick(day)}
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs transition-colors",
                  !isCurrentMonth && "text-text/30",
                  isCurrentMonth && !isSelected && !isToday(day) && "text-text hover:bg-hover",
                  isToday(day) && !isSelected && "bg-primary/10 text-primary font-medium",
                  isSelected && "bg-primary text-white font-medium"
                )}
              >
                <div className="relative">
                  {formattedDate}
                  {hasEventClass && (
                    <span className={cn(
                      "absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full",
                      isSelected ? "bg-white" : "bg-primary"
                    )} />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default MiniCalendar;