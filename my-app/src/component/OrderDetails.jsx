import React from "react";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

const OrderDetails = () => {
  const location = useLocation();
  const { orderDetails, paymentDetails } = location.state || {};

  console.log("Order Details:", orderDetails);
  console.log("Payment Details:", paymentDetails);

  const details = paymentDetails?.details || {};
  const purchaseUnits = details?.purchase_units || [];
  const payer = details?.payer || {};

  console.log("Details:", details);
  console.log("Purchase Units:", purchaseUnits);
  console.log("Payer:", payer);

  if (!orderDetails || !paymentDetails) {
    return (
      <div className="text-center py-20 text-gray-500">
        No order or payment details available.
      </div>
    );
  }

  // Extract main image and other images from orderDetails
  const mainImage = orderDetails.mainImage; // Assuming `mainImage` is a URL or path
  const otherImages = orderDetails.otherImages || []; // Assuming `otherImages` is an array of URLs

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add Main Image
    if (mainImage) {
      doc.addImage(mainImage, "JPEG", 10, 10, 190, 60); // Adjust x, y, width, height as needed
    }

    // Add Event Title
    doc.setFontSize(24);
    doc.setTextColor(0, 0, 0); // Black color
    doc.text("Event Ticket", 20, 80);

    // Add Event Details
    doc.setFontSize(16);
    doc.text("Event Details", 20, 100);

    // Add Event Details Table
    doc.autoTable({
      startY: 110,
      body: [
        ["Title", orderDetails.title],
        ["Date", orderDetails.date],
        ["Time", orderDetails.time],
        ["Price", `$${orderDetails.price}`],
        ["Quantity", orderDetails.quantity],
        ["Total Price", `$${orderDetails.totalPrice}`],
      ],
      theme: "grid",
      headStyles: { fillColor: [0, 0, 0] }, // Black background for header row
      styles: { fontSize: 12, cellPadding: 2 },
      margin: { top: 5 },
      pageBreak: "auto",
    });

    // Define paymentData from purchaseUnits
    const paymentData = purchaseUnits[0] || {};

    // Add Payment Details
    let yOffset = doc.lastAutoTable.finalY + 10; // Position Payment Details below Event Details table

    doc.setFontSize(16);
    doc.text("Payment Details", 20, yOffset);

    // Add Payment Details Table
    doc.autoTable({
      startY: yOffset + 10,
      body: [
        // ["Currency Code", paymentData?.amount?.currency_code || "N/A"],
        ["Amount", `$${paymentData?.amount?.value || "N/A"}`],
        ["Name", paymentData?.shipping?.name?.full_name || "N/A"],
        [
          "Address",
          `${paymentData?.shipping?.address?.address_line_1 || ""}, ${
            paymentData?.shipping?.address?.address_line_2 || ""
          }, ${paymentData?.shipping?.address?.admin_area_2 || ""}, ${
            paymentData?.shipping?.address?.admin_area_1 || ""
          }, ${paymentData?.shipping?.address?.country_code || ""}`,
        ],
        [
          "Payer Name",
          `${payer?.name?.given_name || ""} ${payer?.name?.surname || ""}`,
        ],
        ["Payer Email", payer?.email_address || "N/A"],
        ["Payer ID", payer?.payer_id || "N/A"],
        ["Country Code", payer?.address?.country_code || "N/A"],
      ],
      theme: "grid",
      headStyles: { fillColor: [0, 0, 0] }, // Black background for header row
      styles: { fontSize: 12, cellPadding: 2 },
      margin: { top: 5 },
      pageBreak: "auto",
    });

    // Save PDF
    doc.save("event-ticket.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      {mainImage && (
        <div className="max-w-4xl mx-auto mb-6">
          <img
            src={mainImage}
            alt="Main Event"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>
      )}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="p-6 bg-white shadow-md rounded-lg border border-gray-300">
            <h1 className="text-4xl font-bold mb-6 text-center border-b border-gray-200 pb-2">
              Order Bill
            </h1>

            <div className="mb-8">
              <h2 className="text-3xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-semibold">Title:</span>
                  <span>{orderDetails.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Date:</span>
                  <span>{orderDetails.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Time:</span>
                  <span>{orderDetails.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Price:</span>
                  <span>${orderDetails.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Quantity:</span>
                  <span>{orderDetails.quantity}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total Price:</span>
                  <span>${orderDetails.totalPrice}</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-semibold mb-4">Payment Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-semibold">Amount:</span>
                  <span>${purchaseUnits[0]?.amount?.value || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Payer Name:</span>
                  <span>
                    {payer?.name?.given_name || ""} {payer?.name?.surname || ""}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Payer Email:</span>
                  <span>{payer?.email_address || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Payer ID:</span>
                  <span>{payer?.payer_id || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Country Code:</span>
                  <span>{payer?.address?.country_code || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white p-6 shadow-md rounded-lg border border-gray-300">
            <h2 className="text-3xl font-semibold mb-4 text-center border-b border-gray-200 pb-2">
              Gallery
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {otherImages.length > 0 &&
                otherImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Event Gallery ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg shadow"
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto mt-6 flex justify-center">
        <button
          onClick={generatePDF}
          className="px-6 py-3 bg-[#519341] text-white font-semibold rounded-lg shadow hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
