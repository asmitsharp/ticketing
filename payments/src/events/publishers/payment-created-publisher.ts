import { Subjects, Publisher, PaymentCreatedEvent } from "@ticketscx/common"

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated
}