import Saidbar from "./Saidbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavDashboard from "../../component/NavDashboard";

function AddTicket() {
  const [name, setName] = useState("");
  const [mainDescription, setMainDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [title, setTitle] = useState("");
  const [totlaTicket, setTotlaTicket] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [otherImages, setOtherImages] = useState(["", ""]);
  const [preview, setPreview] = useState("");
  const [previews, setPreviews] = useState(["", ""]);
  const navigate = useNavigate();

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      if (index === 0) {
        setMainImage(reader.result);
        setPreview(reader.result);
      } else {
        const newImages = [...otherImages];
        newImages[index - 1] = reader.result;
        setOtherImages(newImages);
        const newPreviews = [...previews];
        newPreviews[index - 1] = reader.result;
        setPreviews(newPreviews);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  function cancelAdd() {
    navigate("/DisplayEvents");
  }

  const handleAddEvent = async () => {
    const newEvent = {
      name,
      mainDescription,
      title,
      mainImage,
      otherImages,
      details: {
        location,
        price,
        eventDescription,
        isSold: true,
        totlaTicket,
        date,
        time,
        soldTickets: 0,
      },
    };

    try {
      await axios.post(
        `https://tickets-73a3c-default-rtdb.firebaseio.com/events.json`,
        newEvent
      );
      navigate("/DisplayEvents", {
        state: { successMessage: "Event added successfully!" },
      });
    } catch (error) {
      console.error("Error adding event", error);
      alert("Failed to add event");
    }
  };

  return (
    <div>
      <NavDashboard />
      <div className="flex flex-wrap gap-12 pt-16 mt-16">
        {" "}
        {/* Add padding-top to avoid overlap */}
        <div className="w-1/4">
          <Saidbar />
        </div>
        <div className="w-2.5/4 py-7 ms-28">
        
        <h1 className="text-4xl font-bold mb-9">Add Event</h1>
            <form className="w-full max-w-3xl mx-auto">
              {/* Form fields */}
              <div className="flex flex-wrap gap-5">
                <button
                  type="submit"
                  className="w-32 px-4 py-2 mb-10 font-bold text-white rounded bg-slate-400 hover:bg-slate-300"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddEvent();
                  }}
                >
                  Add
                </button>
                <button
                  type="button"
                  className="w-32 px-4 py-2 mb-10 font-bold text-white rounded bg-slate-300 hover:bg-slate-200"
                  onClick={() => {
                    cancelAdd();
                  }}
                >
                  Cancel
                </button>
              </div>
              <div className="flex ">
              <div className="w-full p-8 bg-white rounded shadow-xl">
                    {/**********************images********************** */}
                    <div className="flex flex-wrap mx-3 mt-10 mb-6 ">
                <div className="w-full px-3 mb-6 md:w-1/3 md:mb-0">
                  {preview && (
                    <img
                      className="w-full max-w-[200px] mx-auto my-4 border border-gray-300 max-h-28"
                      src={preview}
                      alt="Preview"
                    />
                  )}
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="main-image"
                  >
                    Main Image
                  </label>
                  <input
                    className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border rounded appearance-none focus:outline-none focus:bg-white"
                    id="main-image"
                    type="file"
                    onChange={(e) => handleFileChange(e, 0)}
                  />
                </div>
                {previews.map((preview, index) => (
                  <div className="w-full px-3 mb-6 md:w-1/3" key={index}>
                    {preview && (
                      <img
                        className="w-full max-w-[200px] mx-auto my-4 border border-gray-300 max-h-28"
                        src={preview}
                        alt={`Preview ${index + 1}`}
                      />
                    )}
                    <label
                      className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                      htmlFor={`other-image-${index + 1}`}
                    >
                      Other Image {index + 1}
                    </label>
                    <input
                      className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                      onChange={(e) => handleFileChange(e, index + 1)}
                      id={`other-image-${index + 1}`}
                      type="file"
                    />
                  </div>
                ))}
              </div>

              
              <div className="flex flex-wrap mb-6 -mx-3">
                <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="location"
                  >
                    Location
                  </label>
                  <select
                    id="location"
                    className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                       <option value="" disabled>
                            Select Location
                          </option>
                          <option value="Amman">Amman</option>
                          <option value="Irbid">Irbid</option>
                          <option value="Zarqa">Zarqa</option>
                          <option value="Madaba">Madaba</option>
                          <option value="Tafilah">Tafilah</option>
                          <option value="Aqaba">Aqaba</option>
                          <option value="Maan">Maan</option>
                  </select>
                </div>
                <div className="w-full px-3 md:w-1/2">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                    id="name"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-wrap mb-6 -mx-3">
                <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="title"
                  >
                    Title
                  </label>
                  <input
                    className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border rounded appearance-none focus:outline-none focus:bg-white"
                    id="title"
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="w-full px-3 md:w-1/2">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="total-ticket"
                  >
                    Total Tickets
                  </label>
                  <input
                    className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                    id="total-ticket"
                    type="number"
                    placeholder="Total Tickets"
                    value={totlaTicket}
                    onChange={(e) => setTotlaTicket(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-wrap mb-2 -mx-3">
                <div className="w-full px-3 mb-6 md:w-1/3 md:mb-0">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="price"
                  >
                    Price
                  </label>
                  <input
                    className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                    id="price"
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="w-full px-3 mb-6 md:w-1/3 md:mb-0">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="date"
                  >
                    Date
                  </label>
                  <input
                    className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                    id="date"
                    type="date"
                    placeholder="Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="w-full px-3 mb-6 md:w-1/3 md:mb-0">
                  <label
                    className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                    htmlFor="time"
                  >
                    Time
                  </label>
                  <input
                    className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                    id="time"
                    type="time"
                    placeholder="Time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-wrap mb-2">
                <div className="w-full">
                  <label
                    htmlFor="main-description"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Main Description
                  </label>
                  <textarea
                    id="main-description"
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Write Description here..."
                    value={mainDescription}
                    onChange={(e) => setMainDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="flex flex-wrap mb-6">
                <div className="w-full">
                  <label
                    htmlFor="event-description"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Event Description
                  </label>
                  <textarea
                    id="event-description"
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Write Description here..."
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
              </div>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
}

export default AddTicket;
