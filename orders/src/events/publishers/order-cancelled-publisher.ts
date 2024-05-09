import { Subjects, Publisher, OrderCancelledEvent } from '@ticketscx/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}