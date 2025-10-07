/**
 * Calendar Component Examples
 *
 * Working examples demonstrating Calendar component with react-day-picker.
 * Supports single date, date ranges, multiple selections, and advanced features.
 */

import { useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import type { DateRange } from 'react-day-picker';
import {
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components';
import { cn } from '@/utils';

/**
 * Example 1: Basic Single Date Selection
 * Simple calendar for selecting a single date.
 */
export function BasicCalendarExample() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Card>
      <CardHeader>
        <CardTitle>Single Date Selection</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
        {date && (
          <div className="mt-4 text-sm text-muted-foreground">
            Selected: {format(date, 'PPP')}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * Example 2: Date Range Selection
 * Calendar for selecting a date range (from and to dates).
 */
export function DateRangeCalendarExample() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: undefined,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Date Range Selection</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={setDateRange}
          numberOfMonths={2}
          className="rounded-md border"
        />
        {dateRange?.from && (
          <div className="mt-4 text-sm text-muted-foreground">
            {dateRange.to ? (
              <>
                {format(dateRange.from, 'PPP')} - {format(dateRange.to, 'PPP')}
              </>
            ) : (
              format(dateRange.from, 'PPP')
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * Example 3: Calendar with Popover (Date Picker)
 * Compact date picker in a popover for forms and inputs.
 */
export function CalendarWithPopoverExample() {
  const [date, setDate] = useState<Date>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Date Picker with Popover</CardTitle>
      </CardHeader>
      <CardContent>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-[280px] justify-start text-left font-normal',
                !date && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </CardContent>
    </Card>
  );
}

/**
 * Example 4: Date Range Picker with Popover
 * Compact date range picker in a popover.
 */
export function DateRangePickerExample() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Date Range Picker</CardTitle>
      </CardHeader>
      <CardContent>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-[300px] justify-start text-left font-normal',
                !dateRange && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, 'LLL dd, y')} -{' '}
                    {format(dateRange.to, 'LLL dd, y')}
                  </>
                ) : (
                  format(dateRange.from, 'LLL dd, y')
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </CardContent>
    </Card>
  );
}

/**
 * Example 5: Multiple Date Selection
 * Calendar allowing selection of multiple individual dates.
 */
export function MultipleDateCalendarExample() {
  const [dates, setDates] = useState<Date[] | undefined>([]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Multiple Date Selection</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="multiple"
          selected={dates}
          onSelect={setDates}
          className="rounded-md border"
        />
        {dates && dates.length > 0 && (
          <div className="mt-4 text-sm text-muted-foreground">
            Selected {dates.length} date(s):
            <div className="mt-2 space-y-1">
              {dates.map((date, index) => (
                <div key={index}>{format(date, 'PPP')}</div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * Example 6: Calendar with Disabled Dates
 * Calendar with specific dates disabled (e.g., past dates, weekends).
 */
export function CalendarWithDisabledDatesExample() {
  const [date, setDate] = useState<Date | undefined>();

  // Disable past dates and weekends
  const disabledDays = [
    { before: new Date() }, // Past dates
    { dayOfWeek: [0, 6] }, // Sunday and Saturday
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendar with Disabled Dates</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={disabledDays}
          className="rounded-md border"
        />
        <div className="mt-4 text-sm text-muted-foreground">
          Past dates and weekends are disabled
          {date && <div className="mt-2">Selected: {format(date, 'PPP')}</div>}
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Example 7: Calendar with Custom Modifiers
 * Calendar with custom styling for specific dates (booked, available, etc.).
 */
export function CalendarWithModifiersExample() {
  const [date, setDate] = useState<Date | undefined>();

  // Sample booked and available dates
  const bookedDates = [
    new Date(2025, 9, 5),
    new Date(2025, 9, 12),
    new Date(2025, 9, 20),
  ];

  const availableDates = [
    new Date(2025, 9, 8),
    new Date(2025, 9, 15),
    new Date(2025, 9, 22),
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendar with Custom Modifiers</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          modifiers={{
            booked: bookedDates,
            available: availableDates,
          }}
          modifiersClassNames={{
            booked: 'bg-red-100 text-red-900 line-through',
            available: 'bg-green-100 text-green-900 font-bold',
          }}
          className="rounded-md border"
        />
        <div className="mt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-green-100"></div>
            <span>Available dates</span>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-red-100"></div>
            <span>Booked dates</span>
          </div>
          {date && <div className="mt-2">Selected: {format(date, 'PPP')}</div>}
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Example 8: Calendar with Month/Year Dropdown
 * Calendar with dropdown navigation for quick month and year selection.
 */
export function CalendarWithDropdownExample() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendar with Dropdown Navigation</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          captionLayout="dropdown"
          fromYear={2020}
          toYear={2030}
          className="rounded-md border"
        />
        {date && (
          <div className="mt-4 text-sm text-muted-foreground">
            Selected: {format(date, 'PPP')}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
