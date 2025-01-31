import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "../../assets/logo.png"; // Ensure PNG format is used
import React, { useEffect } from 'react';

const ReportGenerator = ({ reportTitle, docNo, OriginDate, revNo, revDate, trainerName, trainingTitle, location, sessionDate = '', startTrainingDate, endTrainingDate, tableHeaders, tableData }) => {
  useEffect(() => {
    console.log("Received Props in ReportGenerator:", {
      reportTitle, docNo, OriginDate, revNo, revDate, trainerName, trainingTitle, location, sessionDate, startTrainingDate, endTrainingDate, tableHeaders, tableData
    });
  }, [reportTitle, docNo, OriginDate, revNo, revDate, trainerName, trainingTitle, location, sessionDate, startTrainingDate, endTrainingDate, tableHeaders, tableData]);

  const generatePDF = () => {
    const doc = new jsPDF({ format: "a4" });

    let marginX = 10;
    let marginY = 10;
    let contentWidth = 190; // Full width with margins

    // **Draw Outer Page Border**
    doc.rect(marginX, marginY, contentWidth, 277); // A4 page height is 297mm

    // **Section 1: Logo & Company Name (Box Outline for Section & Elements)**
   // doc.rect(marginX , marginY , contentWidth - 10, 35); // Section Outline
    doc.addImage(logo, "PNG", marginX + 20, marginY + 3, 20, 20);
    doc.line(marginX , marginY + 25 , marginX + 57, marginY + 25); // Company logo Box
    doc.setFontSize(13).setFont("helvetica", "bold");
    doc.text("Aakar Foundry Pvt. Ltd.", marginX + 2, marginY + 30);

    doc.line(marginX , marginY + 33 ,marginX + 135 , marginY + 33); // Verticle line after logo

    doc.line(marginX + 57, marginY, marginX + 57, marginY + 33)
    // **Section 2: Report Title (Centered, Box Outline)**
    let titleY = marginY + 3;
    doc.setFontSize(16).setFont("helvetica", "bold");
    doc.text(reportTitle, 105, titleY + 12, { align: "center" });

    // **Section 3: Right-Side Document Info (Box Outline)**
   // doc.rect(marginX + 5, docInfoY, contentWidth - 10, 30); // Section Outline
    let rightX = marginX + 138;
    doc.setFontSize(12).setFont("helvetica", "bold");
    doc.text(`Doc. No: ${docNo}` , rightX, marginY + 5);
    doc.line(marginX + 135 , marginY + 8 , contentWidth + 10 , marginY + 8); // Line after Doc No.
    doc.text(`Origin Date: ${OriginDate}`, rightX, marginY + 13);
    doc.line(marginX + 135 , marginY + 16 , contentWidth + 10 ,  marginY + 16); // Line after Origin Date
    doc.text(`Rev No.: ${revNo}`, rightX, marginY + 21);
    doc.line(marginX + 135 , marginY + 24 , contentWidth + 10 , marginY + 24); // Line after Rev No.
    doc.text(`Rev Date: ${revDate}`, rightX, marginY + 30);
    doc.line(marginX + 135 , marginY + 33 ,contentWidth + 10 ,  marginY + 33); // Line after Rev Date
    doc.text(`Name of Trainer: ${trainerName}`, rightX, marginY + 2 + 37);
    doc.line(marginX + 135 ,  marginY + 43 ,contentWidth + 10 ,  marginY + 43); // Line after Name of Trainer

    doc.line(marginX + 135 , marginY, marginX + 135, marginY + 68); // Verticle line before above stuff


  //   **Section 4: Training Details (Box Outline)**
    doc.setFontSize(11).setFont("helvetica", "bold");
    doc.text(`Name of Training: ${trainingTitle} `, marginX + 2, marginY + 39);
    doc.line(marginX, marginY + 43 , marginX + 135  , marginY + 43); // Line after each entry
    doc.text(`Training Location: ${location}`, marginX + 2, marginY + 48);
    doc.line(marginX, marginY + 51 , marginX + 135  , marginY + 51); // Line after each entry
    doc.text(`Session Date: ${sessionDate}`, marginX + 2, marginY + 57);
    doc.line(marginX,  marginY + 60 , marginX + 135  , marginY + 60); // Line after each entry
    doc.text(`Training From: ${startTrainingDate} To: ${endTrainingDate}`, marginX + 2, marginY + 65);
    doc.line(marginX,  marginY + 68 , contentWidth + 10  , marginY + 68); // Line after each entry


    if (tableData && tableData.length > 0) {
      const tableDataWithSerialNo = tableData.map((item, index) => ({
        ...item,
        srNo: index + 1,  // Add serial number starting from 1
      }));
    
      doc.autoTable({
        startY: 80,
        head: [["Sr No.", ...tableHeaders.map(header => header.label)]],  // Add 'Sr No.' to headers
        body: tableDataWithSerialNo.map(item => [item.srNo, ...Object.values(item)]),  // Add serial number to each row
        styles: { 
          lineWidth: 0.1, // Thin borders
          lineColor: [0, 0, 0], // Black border
          fontSize: 10, // Normal font size
          textColor: [0, 0, 0], // Black text
          fontStyle: "bold",
        },
        headStyles: { 
          fillColor: [255, 255, 255], // White background
          textColor: [0, 0, 0], // Black text
          fontStyle: "bold", // Normal font style
        },
        alternateRowStyles: { fillColor: false }, // No alternate row colors
        theme: "grid", // Simple grid theme (with lines inside the table)
        margin: { top: 20, left: 10, right: 10, bottom: 20 }, // Only margin at the start and end of the table
        tableLineWidth: 0, // Remove any line around the whole table
      });

      // Adjust Y position for the "Sign of Trainer", "Sign of HR", and "Sign of HOD" fields
      let signStartY = doc.autoTable.previous.finalY + 10; // Positioning below the table

      // Sign fields with some space between them
      doc.text("Sign of Trainer:                  ", marginX + 2, signStartY);
      signStartY += 10; // Increase Y position for next sign
      doc.text("Sign of HR:                       ",  marginX + 2, signStartY);
      signStartY += 10; // Increase Y position for next sign
      doc.text("Sign of HOD:                      ",  marginX + 2, signStartY);
    } else {
      doc.text("No records found", 10, 90);
    }
    
    
    
  //   let trainingY = docInfoY + 35;
  //  doc.rect(marginX + 5, trainingY, contentWidth - 10, 35); // Section Outline
  //   let detailsY = trainingY + 5;
  //   doc.setFontSize(11).setFont("helvetica", "bold");
  //   Object.entries(trainingDetails).forEach(([key, value]) => {
  //     doc.text(`${key}:`, marginX + 10, detailsY);
  //     doc.text(value, marginX + 60, detailsY);
  //     doc.rect(marginX + 60, detailsY - 4, 100, 5); // Box for Each Training Info
  //     detailsY += 7;
  //   });

  //   **Section 5: Table (Structured with Borders)**
  //   let tableStartY = trainingY + 40;
  //   doc.rect(marginX + 5, tableStartY - 5, contentWidth - 10, 10); // Table Section Outline
  //   doc.autoTable({
  //     startY: tableStartY,
  //     head: [tableHeaders],
  //     body: tableData.map((row, index) => [index + 1, ...row]),
  //     theme: "grid",
  //     styles: { fontSize: 10, halign: "center", cellPadding: 3 },
  //     headStyles: { fillColor: [200, 200, 200] },
  //     tableLineColor: [0, 0, 0], // Black table borders
  //     tableLineWidth: 0.5,
  //   });

  //   **Footer: Signatures (Box Outline)**
  //   let finalY = doc.autoTable.previous.finalY + 10;
  //   doc.rect(marginX + 5, finalY, contentWidth - 10, 15); // Section Outline
  //   doc.setFontSize(10).setFont("helvetica", "bold");
  //   doc.text("Signature of the Trainer:", marginX + 10, finalY + 10);
  //   doc.rect(marginX + 70, finalY + 5, 40, 5); // Trainer Signature Box
  //   doc.text("Sign HR:", marginX + 120, finalY + 10);
  //   doc.rect(marginX + 140, finalY + 5, 40, 5); // HR Signature Box
  //   doc.text("Sign HOD:", marginX + 170, finalY + 10);
  //   doc.rect(marginX + 190, finalY + 5, 40, 5); // HOD Signature Box

    doc.save("Training_Report.pdf");
  };

  return (
    <button
      onClick={generatePDF}
      style={{
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Download Report
    </button>
  );
};

export default ReportGenerator;
