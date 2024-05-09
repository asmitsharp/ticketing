import { Publisher, OrderCreatedEvent, Subjects } from '@ticketscx/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}