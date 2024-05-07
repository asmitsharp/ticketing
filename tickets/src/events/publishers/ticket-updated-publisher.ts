import { Publisher, Subjects, TicketUpdatedEvent } from '@ticketscx/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}