import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarClock, CalendarIcon } from 'lucide-react';
import { useToast } from 'hooks/use-toast';
import { Button } from 'components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from 'components/ui/form';
import { Input } from 'components/ui/input';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from 'components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover';
import { Separator } from 'components/ui/separator';
import { Switch } from 'components/ui/switch';
import { Calendar } from 'components/ui/calendar';
import { Label } from 'components/ui/label';
import { ColorPickerTool } from '../../color-picker-tool/color-picker-tool';
import CustomTextEditor from 'components/blocks/custom-text-editor/custom-text-editor';
import { AddEventFormValues, formSchema } from '../../../utils/form-schema';
import { timePickerRange } from '../../../utils/date-utils';
import { EventParticipant } from '../../event-participant/event-participant';
import { Member } from '../../../types/calendar-event.types';
import { members } from '../../../services/calendar-services';
import { EditRecurrence } from '../edit-recurrence/edit-recurrence';
import { CalendarEvent } from '../../../types/calendar-event.types';

type FinalAddEventFormValues = Omit<AddEventFormValues, 'members'> & {
  members: Member[];
  events?: CalendarEvent[];
};

interface AddEventProps {
  start: Date;
  end: Date;
  onSubmit: (data: FinalAddEventFormValues) => void;
  onCancel: () => void;
}

/**
 * AddEvent Component
 *
 * A dialog-based form for creating or editing calendar events. It includes fields for event details
 * such as title, meeting link, participants, date/time, recurrence, and color selection.
 *
 * Features:
 * - Form validation using `react-hook-form` and `zod`.
 * - Date and time pickers for setting event start and end times.
 * - Participant selection using the `EventParticipant` component.
 * - Recurrence handling with a modal (`EditRecurrence`).
 * - Color picker for event customization.
 * - All-day and recurring event toggles.
 *
 * Props:
 * - `start`: `{Date}` – The initial start date and time for the event.
 * - `end`: `{Date}` – The initial end date and time for the event.
 * - `onSubmit`: `{Function}` – Callback triggered when the form is submitted. Receives the final event data.
 * - `onCancel`: `{Function}` – Callback triggered when the form is canceled.
 *
 * @param {AddEventProps} props - The props for configuring the event creation form.
 * @returns {JSX.Element} The rendered JSX element for the event creation dialog.
 *
 * @example
 * <AddEvent
 *   start={new Date()}
 *   end={new Date(new Date().getTime() + 3600 * 1000)}
 *   onSubmit={(data) => handleEventSubmit(data)}
 *   onCancel={() => handleCloseForm()}
 * />
 */
export function AddEvent({ start, end, onCancel, onSubmit }: Readonly<AddEventProps>) {
  const { toast } = useToast();
  const [startDate, setStartDate] = useState<Date | undefined>(start);
  const [endDate, setEndDate] = useState<Date | undefined>(end);
  const [startTime, setStartTime] = useState(() => format(start, 'HH:mm'));
  const [endTime, setEndTime] = useState(() => format(end, 'HH:mm'));
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [showRecurrenceModal, setShowRecurrenceModal] = useState(false);
  const [tempEvent, setTempEvent] = useState<CalendarEvent | null>(null);
  const [recurringEvents, setRecurringEvents] = useState<CalendarEvent[]>([]);

  const form = useForm<AddEventFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      start: start.toISOString().slice(0, 16),
      end: end.toISOString().slice(0, 16),
      meetingLink: '',
      color: '',
      allDay: false,
      recurring: false,
      members: [],
      description: '',
    },
  });

  const handleFormSubmit = (data: AddEventFormValues) => {
    if (!startDate || !endDate) return;

    const memberIds: string[] = data.members ?? [];

    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    const fullStart = new Date(startDate);
    const fullEnd = new Date(endDate);

    if (!data?.allDay) {
      fullStart.setHours(startHour, startMinute, 0, 0);
      fullEnd.setHours(endHour, endMinute, 0, 0);
    } else {
      fullStart.setHours(0, 0, 0, 0);
      fullEnd.setHours(23, 59, 59, 999);
    }

    if (fullEnd < fullStart) {
      toast({
        variant: 'destructive',
        title: 'Error Selecting time slot',
        description: 'End time cannot be before start time.',
      });
      return;
    }

    const selectedMembers: Member[] = memberIds
      .map((id) => members.find((member) => member.id === id))
      .filter((member): member is Member => Boolean(member));

    if (data.recurring && recurringEvents.length > 0) {
      const payload: FinalAddEventFormValues = {
        ...data,
        start: fullStart.toISOString(),
        end: fullEnd.toISOString(),
        meetingLink: data.meetingLink,
        color: selectedColor,
        allDay: data.allDay,
        recurring: true,
        description: data.description,
        members: selectedMembers,
        events: recurringEvents,
      };
      onSubmit(payload);
    } else {
      const payload: FinalAddEventFormValues = {
        ...data,
        start: fullStart.toISOString(),
        end: fullEnd.toISOString(),
        meetingLink: data.meetingLink,
        color: selectedColor,
        allDay: data.allDay,
        recurring: data.recurring,
        description: data.description,
        members: selectedMembers,
      };
      onSubmit(payload);
    }
  };

  const handleCancel = () => {
    form.reset();
    setStartDate(start);
    setEndDate(end);
    setStartTime('');
    setEndTime('');
    setSelectedColor(null);
    setRecurringEvents([]);
    onCancel();
  };

  const handleRecurrenceClick = () => {
    if (!startDate || !endDate) return;

    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    const fullStart = new Date(startDate);
    const fullEnd = new Date(endDate);

    if (!form.getValues('allDay')) {
      fullStart.setHours(startHour, startMinute, 0, 0);
      fullEnd.setHours(endHour, endMinute, 0, 0);
    } else {
      fullStart.setHours(0, 0, 0, 0);
      fullEnd.setHours(23, 59, 59, 999);
    }

    // Create a temporary event for the recurrence modal
    const tempEventData: CalendarEvent = {
      eventId: crypto.randomUUID(),
      title: form.getValues('title') || 'New Event',
      start: fullStart,
      end: fullEnd,
      allDay: form.getValues('allDay'),
      resource: {
        meetingLink: form.getValues('meetingLink'),
        description: form.getValues('description'),
        color: selectedColor || undefined,
        recurring: true,
        members:
          (form
            .getValues('members')
            ?.map((id) => members.find((m) => m.id === id))
            .filter(Boolean) as Member[]) || [],
      },
    };

    window.localStorage.removeItem('tempEditEvent');
    window.localStorage.removeItem('tempRecurringEvents');

    setTempEvent(tempEventData);
    setShowRecurrenceModal(true);
  };

  const handleRecurrenceClose = () => {
    setShowRecurrenceModal(false);
    setTempEvent(null);

    const tempRecurringEvents = window.localStorage.getItem('tempRecurringEvents');
    if (tempRecurringEvents) {
      try {
        const parsedEvents = JSON.parse(tempRecurringEvents) as CalendarEvent[];
        if (Array.isArray(parsedEvents) && parsedEvents.length > 0) {
          setRecurringEvents(parsedEvents);
          form.setValue('recurring', true);
          window.localStorage.removeItem('tempRecurringEvents');
        }
      } catch (error) {
        console.error('Error parsing recurring events:', error);
      }
    }
  };

  return (
    <>
      <DialogContent
        className="w-full sm:max-w-[720px] max-h-[96vh] overflow-y-auto"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Add Event</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal text-sm">Title*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter event title" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="meetingLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal text-sm">Meeting Link*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your meeting link" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="members"
              render={({ field }) => (
                <EventParticipant selected={field.value ?? []} onChange={field.onChange} />
              )}
            />
            <div className="flex flex-col sm:flex-row w-full gap-4">
              <div className="flex gap-4 w-full sm:w-[60%]">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-[6px]">
                    <Label className="font-normal text-sm">Start date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <div className="relative">
                          <Input
                            readOnly
                            value={startDate ? format(startDate, 'dd.MM.yyyy') : ''}
                            className="cursor-pointer"
                          />
                          <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-medium-emphasis" />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={startDate} onSelect={setStartDate} />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex flex-col gap-[6px]">
                    <Label className="font-normal text-sm">Start time</Label>
                    <Select value={startTime} onValueChange={setStartTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timePickerRange.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-[6px]">
                    <Label className="font-normal text-sm">End date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <div className="relative">
                          <Input
                            readOnly
                            value={endDate ? format(endDate, 'dd.MM.yyyy') : ''}
                            className="cursor-pointer"
                          />
                          <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-medium-emphasis" />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={endDate} onSelect={setEndDate} />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex flex-col gap-[6px]">
                    <Label className="font-normal text-sm">End time</Label>
                    <Select value={endTime} onValueChange={setEndTime}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timePickerRange.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <Separator orientation="vertical" className="hidden sm:flex" />
              <div className="flex flex-col w-full sm:w-[40%] gap-4">
                <FormField
                  control={form.control}
                  name="allDay"
                  render={({ field }) => (
                    <div className="flex items-center gap-4">
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                      <Label>All day</Label>
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="recurring"
                  render={({ field }) => (
                    <div className="flex items-center gap-4">
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                      <Label>Recurring Event</Label>
                    </div>
                  )}
                />
                {form.watch('recurring') && (
                  <div className="flex items-center gap-4">
                    <CalendarClock className="w-5 h-5 text-medium-emphasis" />
                    <a
                      onClick={handleRecurrenceClick}
                      className="underline text-primary text-base cursor-pointer font-semibold hover:text-primary-800"
                    >
                      {recurringEvents.length > 0
                        ? `Occurs ${recurringEvents.length} times`
                        : 'Occurs every Monday'}
                    </a>
                  </div>
                )}
              </div>
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field, fieldState }) => (
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-base text-high-emphasis">Description</p>
                  <div className="flex flex-col flex-1">
                    <CustomTextEditor
                      value={field.value}
                      onChange={field.onChange}
                      showIcons={false}
                    />
                  </div>
                  {fieldState.error && (
                    <span className="text-xs text-destructive">{fieldState.error.message}</span>
                  )}
                </div>
              )}
            />
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-base text-high-emphasis">Colors</p>
              <ColorPickerTool
                selectedColor={selectedColor}
                onColorChange={(color) => setSelectedColor(color)}
              />
            </div>
            <div className="flex justify-end w-full gap-4 !mt-6">
              <Button variant="outline" type="button" onClick={handleCancel}>
                Discard
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
      {showRecurrenceModal && tempEvent && (
        <EditRecurrence
          event={tempEvent}
          onNext={handleRecurrenceClose}
          setEvents={(events) => {
            if (Array.isArray(events) && events.length > 0) {
              const processedEvents = events.map((event) => ({
                ...event,
                resource: {
                  ...event.resource,
                  color: selectedColor || tempEvent.resource?.color || 'hsl(var(--primary-500))',
                },
              }));
              setRecurringEvents(processedEvents);
              form.setValue('recurring', true);
              handleRecurrenceClose();
            }
          }}
        />
      )}
    </>
  );
}
