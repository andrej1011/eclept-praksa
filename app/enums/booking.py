import enum

class BookingStatus(enum.Enum):
    active = "active"
    used = "used"
    expired = "expired"
    cancelled = "cancelled"