/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  
} from "@/components/ui/dialog";
import SectionHeader from "@/components/ui/section-header";

const localizer = momentLocalizer(moment);

const AppointmentSchedulingPage = () => {
    const [events, setEvents] = useState([
      {
        start: moment().toDate(),
        end: moment().add(1, "days").toDate(),
        title: "Dr. John Doe'",
        patient: "Patient Name",
      },
    ]);
  
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [eventTitle, setEventTitle] = useState("");
    const [patientName, setPatientName] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    
    // Add these to store the selected slot
    const [selectedSlot, setSelectedSlot] = useState({ start: null, end: null });
  
    const handleSelectSlot = ({ start, end }) => {
      setEventTitle("");
      setPatientName("");
      setIsEditing(false);
      setSelectedEvent(null);
      setSelectedSlot({ start, end }); 
      setOpenDialog(true);
    };
  
    // Handle selecting an appointment to edit
    const handleSelectEvent = (event) => {
      setEventTitle(event.title);
      setPatientName(event.patient);
      setSelectedEvent(event);
      setIsEditing(true);
      setOpenDialog(true);
    };
  
    // Save the appointment
    const handleSaveAppointment = () => {
      if (!eventTitle || !patientName) {
        alert("Please enter both patient name and appointment title.");
        return;
      }
  
   
      const newEvent = {
        start: selectedSlot.start || moment().toDate(),
        end: selectedSlot.end || moment().add(1, "hours").toDate(),
        title: eventTitle,
        patient: patientName,
      };
  
      if (isEditing && selectedEvent) {
        setEvents((prevEvents) =>
          prevEvents.map((e) => (e === selectedEvent ? newEvent : e))
        );
      } else {
        setEvents((prevEvents) => [...prevEvents, newEvent]);
      }
  
      setOpenDialog(false);
    };
  
    // Handle deleting an appointment
    const handleDeleteEvent = () => {
      if (window.confirm("Are you sure you want to delete this appointment?")) {
        setEvents((prevEvents) => prevEvents.filter((e) => e !== selectedEvent));
        setOpenDialog(false);
      }
    };
  
    return (
      <div>
        <div>
          <SectionHeader title={"Appointment Scheduling"} />
        </div>
        <div className="wrapper">
          <Calendar
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={events}
            style={{ height: "100vh" }}
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            selectable
          />
  
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  {isEditing ? "Edit Appointment" : "Schedule Appointment"}
                </DialogTitle>
                <DialogDescription>
                  {isEditing
                    ? "Make changes to the appointment details and save when you're done."
                    : "Enter the details for the new appointment and save."}
                </DialogDescription>
              </DialogHeader>
  
              <div className="grid gap-4 py-4">
                <div>
                  <label className="form-label">
                    Appointment Title (Doctor's Name)
                  </label>
                  <input
                    type="text"
                    name="eventTitle"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    className="form-input  border-gray-300 p-2 w-full rounded-md"
                    placeholder="e.g., Dr. John Doe"
                  />
                </div>
                <div>
                  <label className="form-label">Patient Name</label>
                  <input
                    type="text"
                    name="patientName"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="form-input  border-gray-300 p-2 w-full rounded-md"
                    placeholder="e.g., Jane Doe"
                  />
                </div>
              </div>
  
              <DialogFooter>
                {isEditing && (
                  <button
                    onClick={handleDeleteEvent}
                    className="mr-2 btn-primary bg-red-600"
                  >
                    Delete
                  </button>
                )}
                <div className="flex space-x-2">
                  <button
                    onClick={() => setOpenDialog(false)}
                    className="mr-2 btn-primary bg-gray-200 text-black"
                  >
                    Cancel
                  </button>
                  <button onClick={handleSaveAppointment} className="btn-primary">
                    Save
                  </button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  };
  

export default AppointmentSchedulingPage;
