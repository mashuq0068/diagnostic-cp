import PlaceHolder from "@/utility/PlaceHolder";
import { useState } from "react";
import { TbUserPlus } from "react-icons/tb";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const BookAppointmentPage = () => {
  const availableDates = [
    "2024-12-05",
    "2024-12-06",
    "2024-12-07",
    "2024-12-08",
  ];

  const availableSlots = {
    "2024-12-05": [
      { start: "9:00 AM", end: "10:15 AM" },
      { start: "12:00 PM", end: "1:15 PM" },
      { start: "3:00 PM", end: "4:15 PM" },
      { start: "12:00 PM", end: "1:15 PM" },
      { start: "3:00 PM", end: "4:15 PM" },
      { start: "12:00 PM", end: "1:15 PM" },
      { start: "3:00 PM", end: "4:15 PM" },
    ],
    "2024-12-06": [
      { start: "10:00 AM", end: "11:15 AM" },
      { start: "1:00 PM", end: "2:15 PM" },
      { start: "4:00 PM", end: "5:15 PM" },
      { start: "1:00 PM", end: "2:15 PM" },
      { start: "4:00 PM", end: "5:15 PM" },
    ],
    "2024-12-07": [
      { start: "8:00 AM", end: "9:15 AM" },
      { start: "11:00 AM", end: "12:15 PM" },
      { start: "2:00 PM", end: "3:15 PM" },
      { start: "8:00 AM", end: "9:15 AM" },
      { start: "11:00 AM", end: "12:15 PM" },
      { start: "2:00 PM", end: "3:15 PM" },
    ],
    "2024-12-08": [
      { start: "9:30 AM", end: "10:45 AM" },
      { start: "12:30 PM", end: "1:45 PM" },
      { start: "3:30 PM", end: "4:45 PM" },
      { start: "12:30 PM", end: "1:45 PM" },
      { start: "3:30 PM", end: "4:45 PM" },
    ],
  };

  const [selectedDate, setSelectedDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDate) {
      setIsSubmitted(true);
    }
  };
  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    setSlots(availableSlots[date] || []);
    setIsSubmitted(false);
  };

  return (
    <div className="">
      <div className="wrapper min-h-[400px] mt-8">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap items-end gap-5">
            <div className=" w-[300px]">
              <label htmlFor="date" className="form-label">
                Select a Date
              </label>
              <select
                onChange={handleDateChange}
                name="date"
                className="form-input"
              >
                <option value="" disabled selected>
                  Select a date
                </option>
                {availableDates.map((date) => (
                  <option key={date} value={date}>
                    {new Date(date).toLocaleDateString()}
                  </option>
                ))}
              </select>
            </div>
            {/* Submit Button */}
            <div className="">
              <button type="submit" className="btn-primary">
                <TbUserPlus className="mr-2 text-lg" />
                Book A Slot
              </button>
            </div>
          </div>
        </form>
        {isSubmitted ? (
          slots.length > 0 ? (
            <div>
              <div className="mt-8">
                <div className="w-full mb-6">
                  <h2 className=" text-gray-700 font-medium mb-2">
                    Appointment Slots
                  </h2>
                  <div className={`h-[2px] bg-gray-200`}>
                    <div className={`h-[2px] bg-primary w-[180px]`}></div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {slots.map((slot) => (
                  <Dialog key={slot?.id}>
                    <DialogTrigger asChild>
                      <div
                        key={slot}
                        className="border border-gray-200 cursor-pointer rounded-lg p-4 text-center bg-gray-100"
                      >
                        <p className="font-medium text-gray-600">
                          {slot?.start} - {slot?.end}
                        </p>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Give Patient Details</DialogTitle>
                        <DialogDescription>
                          Here Please give basic information of Patient.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogDescription>
                        <form>
                          {/* Form Grid */}
                          <div className="grid grid-cols-1 text-[16px] mt-4 gap-4">
                            {/* Name */}
                            <div>
                              <label className="form-label">Name</label>
                              <input
                                type="text"
                                placeholder="Enter your name"
                                className="form-input"
                              />
                            </div>

                            {/* Address */}
                            <div>
                              <label className="form-label">Address</label>
                              <input
                                type="text"
                                placeholder="Enter your address"
                                className="form-input"
                              />
                            </div>

                            {/* Phone Number */}
                            <div>
                              <label className="form-label">Phone Number</label>
                              <input
                                type="tel"
                                placeholder="Enter your phone number"
                                className="form-input"
                              />
                            </div>

                            {/* Email */}
                            <div>
                              <label className="form-label">Email</label>
                              <input
                                type="email"
                                placeholder="Enter your email (optional)"
                                className="form-input"
                              />
                            </div>
                          </div>
                        </form>
                      </DialogDescription>
                      <div className="grid gap-4 py-4"></div>
                      <DialogFooter>
                        <button type="submit" className="btn-primary">
                          Book Appointment
                        </button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center mt-6">
              No slots available for this date.
            </p>
          )
        ) : (
          <div>
            <PlaceHolder />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookAppointmentPage;
