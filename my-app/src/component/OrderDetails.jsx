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

  const DetailRow = ({ label, value, isBold = false }) => (
    <div
      className={`flex justify-between text-sm ${
        isBold ? "font-bold" : "font-medium"
      } text-gray-800`}
    >
      <span className="text-gray-600">{label}:</span>
      <span>{value}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-8">
      {/* Hero Section */}
      {mainImage && (
        <div className="relative mb-10 max-w-6xl mx-auto rounded-lg overflow-hidden">
          <img
            src={mainImage}
            alt="Main Event"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <h1 className="text-white text-4xl font-bold">Event Details</h1>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Order Summary Section */}
        <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-8">
          <h2 className="text-3xl font-bold mb-6 border-b pb-2 border-gray-300">
            Order Summary
          </h2>
          <div className="space-y-4">
            <DetailRow label="Title" value={orderDetails.title} />
            <DetailRow label="Date" value={orderDetails.date} />
            <DetailRow label="Time" value={orderDetails.time} />
            <DetailRow label="Price" value={`$${orderDetails.price}`} />
            <DetailRow label="Quantity" value={orderDetails.quantity} />
            <DetailRow
              label="Total Price"
              value={`$${orderDetails.totalPrice}`}
              isBold
            />
          </div>
        </div>

        {/* Payment Details Section */}
        <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-8">
          <h2 className="text-3xl font-bold mb-6 border-b pb-2 border-gray-300">
            Payment Details
          </h2>
          <div className="space-y-4">
            <DetailRow
              label="Amount"
              value={`$${purchaseUnits[0]?.amount?.value || "N/A"}`}
            />
            <DetailRow
              label="Payer Name"
              value={`${payer?.name?.given_name || ""} ${
                payer?.name?.surname || ""
              }`}
            />
            <DetailRow
              label="Payer Email"
              value={payer?.email_address || "N/A"}
            />
            <DetailRow label="Payer ID" value={payer?.payer_id || "N/A"} />
            <DetailRow
              label="Country Code"
              value={payer?.address?.country_code || "N/A"}
            />
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="max-w-6xl mx-auto mt-10">
        <h2 className="text-3xl font-bold mb-6 text-center">Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {otherImages.length > 0 &&
            otherImages.map((image, index) => (
              <>
                <img
                  key={index}
                  src={image}
                  alt={`Event Gallery ${index + 1}`}
                  className="w-full h-56 object-cover rounded-lg shadow-md"
                />
              </>
            ))}
          <img
            src="./src/assets/bill.gif"
            className="w-full h-56 object-cover rounded-lg shadow-md"
          />
        </div>
      </div>

      {/* Download PDF Button */}
      <div className="max-w-6xl mx-auto mt-10 flex justify-center">
        <button
          onClick={generatePDF}
          className="px-8 py-4 bg-green-600 text-white font-semibold rounded-full shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
