from datetime import datetime, timezone
from apscheduler.schedulers.background import BackgroundScheduler
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.db.database import SessionLocal
from app.models.booking import Booking
from app.models.showing import Showing
from app.models.movie import Movie
from app.enums.booking import BookingStatus

def expire_passed_bookings() -> None:
    db: Session = SessionLocal()
    try:
        now = datetime.now(timezone.utc)
        db.query(Booking).filter(
            Booking.status == BookingStatus.active,
            Booking.showing_id.in_(
                db.query(Showing.id).filter(Showing.start_time + func.make_interval(mins=Movie.duration)< now)
            ),
        ).update({"status": BookingStatus.expired}, synchronize_session=False)
        db.commit()
    except Exception:
        db.rollback()
    finally:
        db.close()

scheduler = BackgroundScheduler()
scheduler.add_job(expire_passed_bookings, "interval", minutes=5)