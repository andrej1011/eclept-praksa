export interface Showing {
  id: string;
  movie_id: string;
  auditorium_id: string;
  start_time: string;      // ISO
  booked_seats: number;
  status: string;
  bookings?: unknown[];
}