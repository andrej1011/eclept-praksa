export interface Booking {
  id: string;
  user_id: string;
  showing_id: string;
  seats: number;
  status: string;
  booked_at: string;
}
export interface BookingCreate {
  user_id: string;
  showing_id: string;
  seats: number;
}