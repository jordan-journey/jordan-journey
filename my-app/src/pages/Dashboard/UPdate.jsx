import Saidbar from "./Saidbar";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NavDashboard from "../../component/NavDashboard";

function UpdateTicket() {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const [name, setName] = useState("");
  const [mainDescription, setMainDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [title, setTitle] = useState("");
  const [totlaTicket, setTotal] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [otherImages, setOtherImages] = useState([]);
  const [preview, setPreview] = useState("");
  const [previews, setPreviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(
          `https://tickets-73a3c-default-rtdb.firebaseio.com/events/${id}.json`
        );
        const data = res.data;
        setEventData(data);
        setName(data.name || "");
        setMainDescription(data.mainDescription || "");
        setLocation(data.details?.location || "");
        setPrice(data.details?.price || "");
        setEventDescription(data.details?.eventDescription || "");
        setTitle(data.title || "");
        setTotal(data.details?.totlaTicket || "");
        setDate(data.details?.date || "");
        setTime(data.details?.time || "");
        setMainImage(data.mainImage || "");
        setOtherImages(data.otherImages || []);
        setPreview(data.mainImage || "");

        // إنشاء معاينات الصور الأخرى
        const initialPreviews = data.otherImages
          ? data.otherImages.map((image) => image)
          : [];
        setPreviews(initialPreviews);
      } catch (error) {
        console.error("Error fetching event data", error);
      }
    };

    fetchEvent();
  }, [id]);

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      if (index === 0) {
        setMainImage(reader.result);
        setPreview(reader.result);
      } else {
        const newOtherImages = [...otherImages];
        const newPreviews = [...previews];
        newOtherImages[index - 1] = reader.result;
        newPreviews[index - 1] = reader.result;
        setOtherImages(newOtherImages);
        setPreviews(newPreviews);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  function cancelUpdate() {
    navigate("/DisplayEvents");
  }

  const handleUpdate = async () => {
    const updatedData = {
      ...eventData,
      name: name || eventData.name,
      mainDescription: mainDescription || eventData.mainDescription,
      title: title || eventData.title,
      mainImage: mainImage || eventData.mainImage,
      otherImages: otherImages.length ? otherImages : eventData.otherImages,
      details: {
        ...eventData.details,
        location: location || eventData.details.location,
        price: price || eventData.details.price,
        eventDescription:
          eventDescription || eventData.details.eventDescription,
        totlaTicket: totlaTicket || eventData.details.totlaTicket,
        date: date || eventData.details.date,
        time: time || eventData.details.time,
      },
    };

    try {
      await axios.put(
        `https://tickets-73a3c-default-rtdb.firebaseio.com/events/${id}.json`,
        updatedData
      );
      navigate("/DisplayEvents", {
        state: { successMessage: "Event updated successfully!" },
      });
    } catch (error) {
      console.error("Error updating event", error);
      alert("Failed to update event");
    }
  };

  return (
    <div >
      <NavDashboard />
      <div className="flex flex-wrap gap-12 pt-16 mt-16">
        {" "}
        {/* إضافة مسافة علوية كافية */}
        <div className="w-1/4">
          <Saidbar />
        </div>
        <div className="w-2.5/4 py-10 ms-28">
        
          <h1 className="text-4xl font-bold mb-9">Update</h1>
          {eventData ? (
            <div>
              <form className="w-full max-w-3xl mx-auto">
                {/********button********* */}
                <div className="flex flex-wrap gap-5">
                  <button
                    type="submit"
                    className="w-32 px-4 py-2 mb-10 font-bold text-white rounded bg-slate-400 hover:bg-slate-300"
                    onClick={(e) => {
                      e.preventDefault();
                      handleUpdate();
                    }}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="w-32 px-4 py-2 mb-10 font-bold text-white rounded bg-slate-300 hover:bg-slate-200"
                    onClick={() => {
                      cancelUpdate();
                    }}
                  >
                    Cancel
                  </button>
                </div>
                {/*********end button******** */}

                <div className="flex">
                  <div className="w-full p-8 bg-white rounded shadow-xl">
                    {/**********************images********************** */}
                    <div className="flex flex-wrap mx-3 mt-10 mb-6">
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
                          htmlFor="grid-Location"
                        >
                          Main Image
                        </label>
                        <input
                          className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border rounded appearance-none focus:outline-none focus:bg-white"
                          id="grid-first-name"
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
                            htmlFor={`grid-other-image-${index + 1}`}
                          >
                            Other Images {index + 1}
                          </label>
                          <input
                            className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                            onChange={(e) => handleFileChange(e, index + 1)}
                            id={`grid-other-image-${index + 1}`}
                            type="file"
                          />
                        </div>
                      ))}
                    </div>

                    {/**********************end images********************** */}

                    <div className="flex flex-wrap mb-6 -mx-3">
                      <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                        <label
                          className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                          htmlFor="grid-Location"
                        >
                          Location
                        </label>
                        <select
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-location"
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
                          htmlFor="grid-name"
                        >
                          Name
                        </label>
                        <input
                          className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          id="grid-last-name"
                          type="text"
                          placeholder="Name"
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap mb-6 -mx-3">
                      <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                        <label
                          className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                          htmlFor="grid-Title"
                        >
                          Title
                        </label>
                        <input
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border rounded appearance-none focus:outline-none focus:bg-white"
                          id="grid-first-name"
                          type="text"
                          placeholder="Title"
                        />
                      </div>
                      <div className="w-full px-3 md:w-1/2">
                        <label
                          className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                          htmlFor="grid-Total-Tickets"
                        >
                          Total Tickets
                        </label>
                        <input
                          value={totlaTicket}
                          onChange={(e) => setTotal(e.target.value)}
                          className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-last-name"
                          type="number"
                          placeholder="Total Tickets"
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap mb-2 -mx-3">
                      <div className="w-full px-3 mb-6 md:w-1/3 md:mb-0">
                        <label
                          className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                          htmlFor="grid-Price"
                        >
                          Price
                        </label>
                        <input
                          className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-city"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          type="number"
                          placeholder="Price"
                        />
                      </div>
                      <div className="w-full px-3 mb-6 md:w-1/3 md:mb-0">
                        <label
                          className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                          htmlFor="grid-Date"
                        >
                          Date
                        </label>
                        <input
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-zip"
                          type="date"
                          placeholder="Date"
                        />
                      </div>
                      <div className="w-full px-3 mb-6 md:w-1/3 md:mb-0">
                        <label
                          className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                          htmlFor="grid-Time"
                        >
                          Time
                        </label>
                        <input
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-zip"
                          type="time"
                          placeholder="Time"
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap mb-2 -mx-3">
                    <div className="w-full">
                      <label
                        htmlFor="message"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Main Description
                      </label>
                      <textarea
                        value={mainDescription}
                        onChange={(e) => setMainDescription(e.target.value)}
                        id="message"
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write Description here..."
                      ></textarea>
                    </div>
                   </div>
                    <div className="flex flex-wrap mb-2 -mx-3">
                    <div className="w-full">
                      <label
                        htmlFor="message"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Event Description
                      </label>
                      <textarea
                        value={eventDescription}
                        onChange={(e) => setEventDescription(e.target.value)}
                        id="message"
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write Description here..."
                      ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UpdateTicket;
