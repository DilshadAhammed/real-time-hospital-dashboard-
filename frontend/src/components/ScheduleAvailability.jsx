import { useState, useEffect } from "react";
import axios from "axios";

const ScheduleAvailability = ({ doctorId }) => {
  const [availability, setAvailability] = useState([]);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleAddSlot = async () => {
    const newSlot = { date, startTime, endTime };
    try {
      await axios.put("/api/doctor/updateAvailabilitySlots", {
        doctorId,
        availabilitySlots: [...availability, newSlot],
      });
      setAvailability([...availability, newSlot]);
    } catch (error) {
      console.error("Error updating availability:", error);
    }
  };

  return (
    <div>
      <h2>Schedule Availability</h2>
      <input type="date" onChange={(e) => setDate(e.target.value)} />
      <input type="time" onChange={(e) => setStartTime(e.target.value)} />
      <input type="time" onChange={(e) => setEndTime(e.target.value)} />
      <button onClick={handleAddSlot}>Add Slot</button>
      <ul>
        {availability.map((slot, index) => (
          <li key={index}>{slot.date} - {slot.startTime} to {slot.endTime}</li>
        ))}
      </ul>
    </div>
  );
};

export default ScheduleAvailability;
