import React from "react";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Footer from "./Footer";
import Header from "./header";
import QRCode from "qrcode";
import axios from "axios";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";

const OrderDetails = () => {
  const location = useLocation();
  const { orderDetails, paymentDetails } = location.state || {};

  if (!orderDetails || !paymentDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-600">
        No order or payment details available.
      </div>
    );
  }

  const details = paymentDetails.details || {};
  const purchaseUnits = details.purchase_units || [];
  const payer = details.payer || {};

  const mainImage = orderDetails.mainImage;
  const otherImages = orderDetails.otherImages || [];

  const generatePDF = async () => {
    const doc = new jsPDF();

    // Set up fonts and colors
    const primaryColor = "#519341";
    const secondaryColor = "#ffffff";
    doc.setFont("Helvetica", "normal");
    doc.setTextColor(secondaryColor);

    // Add Header
    doc.setFillColor(...hexToRgb(primaryColor)); // Header background color
    doc.rect(0, 0, 210, 40, "F"); // Header rectangle
    doc.setTextColor(secondaryColor); // White text
    doc.setFontSize(24);
    doc.text("Event Ticket", 15, 25);

    // Add Main Image
    if (mainImage) {
      doc.addImage(mainImage, "JPEG", 10, 45, 190, 60);
    }

    // Add Event Details
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text("Event Details", 10, 120);

    doc.autoTable({
      startY: 130,
      body: [
        ["Title", orderDetails.title],
        ["Date", orderDetails.date],
        ["Time", orderDetails.time],
        ["Price", `$${orderDetails.price}`],
        ["Quantity", orderDetails.quantity],
      ],
      theme: "striped",
      headStyles: { fillColor: [...hexToRgb(primaryColor)] },
      styles: { fontSize: 14, cellPadding: 5, cellWidth: "wrap" },
      margin: { top: 5 },
      pageBreak: "auto",
    });

    // Add Payment Details
    const paymentData = purchaseUnits[0] || {};
    let yOffset = doc.lastAutoTable.finalY + 15;

    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text("Payment Details", 10, yOffset);

    doc.autoTable({
      startY: yOffset + 10,
      body: [
        ["Amount", `$${paymentData.amount?.value || "N/A"}`],
        [
          "Payer Name",
          `${payer.name?.given_name || ""} ${payer.name?.surname || ""}`,
        ],
      ],
      theme: "striped",
      headStyles: { fillColor: [...hexToRgb(primaryColor)] },
      styles: { fontSize: 14, cellPadding: 5, cellWidth: "wrap" },
      margin: { top: 5 },
      pageBreak: "auto",
    });

    // Save the PDF to a Blob
    const pdfBlob = doc.output("blob");

    // Upload the PDF to Firebase Storage
    const storageRef = ref(storage, `tickets/${orderDetails.id}.pdf`);
    const uploadTask = uploadBytesResumable(storageRef, pdfBlob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error("Upload failed:", error);
      },
      () => {
        // Handle successful uploads
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          // Generate QR Code with the URL to the uploaded PDF
          const qrCodeDataUrl = await QRCode.toDataURL(downloadURL, {
            width: 200,
          });

          // Add QR Code to the PDF
          doc.addImage(qrCodeDataUrl, "PNG", 160, yOffset + 10, 40, 40);

          // Add Footer
          doc.setFillColor(...hexToRgb(primaryColor)); // Footer background color
          doc.rect(0, 280, 210, 30, "F"); // Footer rectangle
          doc.setTextColor(secondaryColor); // White text
          doc.setFontSize(12);
          doc.text("Thank you for your purchase!", 105, 295, {
            align: "center",
          });

          // Save the final PDF locally (optional)
          doc.save("event-ticket.pdf");
        });
      }
    );
  };

  // Helper function to convert hex color to RGB array
  const hexToRgb = (hex) => {
    let r = 0,
      g = 0,
      b = 0;
    // 3 digits
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    }
    // 6 digits
    else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }
    return [r, g, b];
  };

  const DetailRow = ({ label, value, isBold = false }) => (
    <div
      className={`flex justify-between text-sm ${
        isBold ? "font-semibold text-gray-900" : "font-medium text-gray-700"
      }`}
    >
      <span className="text-gray-600">{label}:</span>
      <span>{value}</span>
    </div>
  );

  return (
    <>
      <Header />
      <div className="min-h-screen px-4 py-10 bg-gray-50">
        {/* Hero Section */}
        {mainImage && (
          <div className="relative max-w-7xl mx-auto mb-12 overflow-hidden rounded-xl shadow-lg">
            <img
              src={mainImage}
              alt="Main Event"
              className="object-cover w-full h-96 rounded-xl"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
              <h1 className="text-4xl font-bold text-white">Event Details</h1>
            </div>
          </div>
        )}

        <div className="grid max-w-7xl mx-auto gap-8 md:grid-cols-2">
          {/* Order Summary Section */}
          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-300 pb-4 mb-4">
              Order Summary
            </h2>
            <div className="space-y-3">
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
          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-300 pb-4 mb-4">
              Payment Details
            </h2>
            <div className="space-y-3">
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
        <div className="max-w-7xl mx-auto mt-12">
          <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">
            Gallery
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {otherImages.length > 0 &&
              otherImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Event Gallery ${index + 1}`}
                  className="object-cover w-full h-64 rounded-xl shadow-md"
                />
              ))}
            <img
              src="./src/assets/bill.gif"
              className="object-cover w-full h-64 rounded-xl shadow-md"
              alt="Additional Gallery"
            />
          </div>
        </div>

        {/* Download PDF Button */}
        <div className="flex justify-center mt-10">
          <button
            onClick={generatePDF}
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Download PDF
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderDetails;
