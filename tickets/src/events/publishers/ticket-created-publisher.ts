import { Publisher, Subjects, TicketCreatedEvent } from '@ticketscx/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}