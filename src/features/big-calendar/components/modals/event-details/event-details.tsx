import { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import { Calendar, ChevronDown, ChevronUp, Link, Trash, Users } from 'lucide-react';
import { Button } from 'components/ui/button';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Dialog,
} from 'components/ui/dialog';
import { useToast } from 'hooks/use-toast';
import ConfirmationModal from 'components/blocks/confirmation-modal/confirmation-modal';
import { CalendarEvent } from '../../../types/calendar-event.types';
import { MEMBER_STATUS } from '../../../enums/calendar.enum';

interface EventDetailsProps {
  event: CalendarEvent;
  onClose: () => void;
  onNext: () => void;
  onDelete: (eventId: string) => void;
}

/**
 * EventDetails Component
 *
 * A dialog-based component for displaying detailed information about a calendar event.
 * It shows event details such as title, date/time, meeting link, participants, and description.
 * Additionally, it provides options to edit or delete the event and supports toggling the visibility of long descriptions.
 *
 * Features:
 * - Displays event details like title, start/end time, meeting link, and participant status.
 * - Handles truncation of long descriptions with a "Show more/less" toggle button.
 * - Provides buttons to edit or delete the event.
 * - Displays a confirmation modal before deleting the event.
 *
 * Props:
 * - `event`: `{CalendarEvent}` – The event object containing details like title, start/end time, meeting link, members, and description.
 * - `onClose`: `{Function}` – Callback triggered when the dialog is closed.
 * - `onNext`: `{Function}` – Callback triggered when the "Edit" button is clicked.
 * - `onDelete`: `{Function}` – Callback triggered when the event is deleted. Receives the event ID as an argument.
 *
 * @param {EventDetailsProps} props - The props for configuring the event details dialog.
 * @returns {JSX.Element} The rendered JSX element for the event details dialog.
 *
 * @example
 * <EventDetails
 *   event={{
 *     eventId: '123',
 *     title: 'Team Meeting',
 *     start: new Date('2023-10-01T09:00:00'),
 *     end: new Date('2023-10-01T10:00:00'),
 *     allDay: false,
 *     resource: {
 *       meetingLink: 'https://zoom.com/meeting',
 *       description: 'Discuss project updates.',
 *       members: [
 *         { id: '1', name: 'John Doe', status: MEMBER_STATUS.ACCEPTED },
 *         { id: '2', name: 'Jane Smith', status: MEMBER_STATUS.DECLINED },
 *       ],
 *     },
 *   }}
 *   onClose={() => console.log('Dialog closed')}
 *   onNext={() => console.log('Edit clicked')}
 *   onDelete={(id) => console.log(`Deleted event with ID: ${id}`)}
 * />
 */
export function EventDetails({ event, onClose, onNext, onDelete }: Readonly<EventDetailsProps>) {
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const [showToggleButton, setShowToggleButton] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    const checkTruncation = () => {
      const el = descriptionRef.current;
      if (el) {
        const isTruncated = el.scrollHeight > el.clientHeight;
        setShowToggleButton(isTruncated);
      }
    };

    const timeout = setTimeout(checkTruncation, 0);

    return () => clearTimeout(timeout);
  }, [event.resource?.description]);

  const members = event.resource?.members || [];

  const acceptedCount = members.filter((m) => m.status === MEMBER_STATUS.ACCEPTED).length;
  const declinedCount = members.filter((m) => m.status === MEMBER_STATUS.DECLINED).length;
  const noResponseCount = members.filter((m) => m.status === MEMBER_STATUS.NORESPONSE).length;

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    onDelete(event.eventId ?? '');
    setShowDeleteDialog(false);
    onClose();
    toast({
      variant: 'success',
      title: 'Event Deleted Successfully',
      description: `The event titled "${event.title}" has been successfully deleted.`,
    });
  };

  return (
    <>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle>{event.title}</DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <div className="flex flex-col w-full gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-medium-emphasis" />
              <p className="font-semibold text-base text-high-emphasis">
                {event?.allDay
                  ? `${format(event.start, 'dd.MM.yyyy')}, Whole Day`
                  : `${format(event.start, 'dd.MM.yyyy, HH:mm')} - ${format(event.end, 'HH:mm')}`}
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                className={`w-5 h-5 mt-1 ${event.resource?.meetingLink ? 'text-medium-emphasis' : 'text-low-emphasis'}`}
              />
              {event.resource?.meetingLink ? (
                <a
                  onClick={() => {
                    toast({
                      variant: 'success',
                      title: 'Zoom link clicked',
                      description: 'Opening Zoom. Please note this is a placeholder link.',
                    });
                  }}
                  className="text-base font-normal underline text-primary leading-6 break-all hover:text-primary-800 cursor-pointer w-[90%]"
                >
                  {event.resource?.meetingLink}
                </a>
              ) : (
                <span className="text-base leading-6 text-low-emphasis">No meeting link</span>
              )}
            </div>
            {members.length > 0 && (
              <div className="flex gap-2">
                <Users className="w-5 h-5 text-medium-emphasis" />
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-base text-high-emphasis">
                    {members.length} invited
                  </p>
                  <p className="font-normal text-xs text-medium-emphasis">
                    Accepted {acceptedCount}, Didn’t respond {noResponseCount}, & Declined{' '}
                    {`${declinedCount}`}
                  </p>
                </div>
              </div>
            )}
            {event.resource?.description && (
              <div className="flex flex-col items-start gap-3">
                <p className="font-semibold text-base text-high-emphasis">Description</p>
                <div className="flex-1" style={{ minHeight: '60px' }}>
                  <p
                    ref={descriptionRef}
                    className={`font-normal text-sm text-high-emphasis transition-all ${
                      !isExpanded && 'line-clamp-3'
                    }`}
                    style={{
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: isExpanded ? 'unset' : 3,
                      overflow: 'hidden',
                    }}
                    dangerouslySetInnerHTML={{ __html: event.resource?.description }}
                  />
                  {showToggleButton && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-sm font-semibold text-high-emphasis mt-2"
                      onClick={() => setIsExpanded(!isExpanded)}
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 mr-1" />
                      ) : (
                        <ChevronDown className="w-4 h-4 mr-1" />
                      )}
                      {isExpanded ? 'Show less' : 'Show more'}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
          <DialogFooter className="flex !flex-row w-full !justify-between items-center mt-6">
            <Button variant="outline" size="icon" onClick={handleDeleteClick}>
              <Trash className="w-5 h-4 text-destructive" />
            </Button>
            <Button variant="outline" onClick={onNext}>
              Edit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <ConfirmationModal
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title="Delete Event"
        description={`Are you sure you want to delete the event: "${event.title}"? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
