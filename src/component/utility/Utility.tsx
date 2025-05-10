// src/component/utility/Utility.ts

export const getTodayDate = () => {
  return new Date().toISOString().split("T")[0]; // "2025-04-16"
};

export const getCurrentTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`; // "09:13"
};
// 1. User Authentication (JWT-based) – Login, Signup, Role-based Access (admin/user).
// 2.	Hub Management – Admin can create/edit hubs, which contain tables and seats.
// 3.	Table & Seat Management – CRUD operations for tables and their seats.
// 4.	Real-Time Seat Availability – Show available seats dynamically.
// 5.	Booking System – Book a seat with start time, end time, and seat/table ID.
// 6.	Cancellation/Reschedule – Allow users to cancel or reschedule their bookings.
// 7.	Conflict Detection – No double booking; prevent overlaps.
// 8.	Booking History – User can view their past/future bookings.

// advanced features:
// Rate Limiting / Booking Quota
// Users can only book X times per day/week — implement using Redis or in-memory cache.
// Optimistic Locking
// Prevent race conditions on seat booking (JPA versioning or manual DB-based locking).
// Caching Layer
// Use Redis or in-memory cache for frequently accessed data (e.g., hub layout, seat availability).
// Pagination & Filtering
// List hubs/tables/bookings with filters, pagination, and sorting — shows real API design thinking.
// Notifications (Async)
// Simulate email/SMS alerts using event queues (e.g., RabbitMQ, Kafka, or just @Async).
