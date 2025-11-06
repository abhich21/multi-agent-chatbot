const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const os = require("os");

exports.generatePdf = async (data) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const buffers = [];

    doc.on("data", (chunk) => buffers.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(buffers)));
    doc.on("error", reject);

    // --- Document content ---
    doc.fontSize(20).text("Multi-Agent Collaboration Report", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Generated: ${new Date().toLocaleString()}`, { align: "center" });
    doc.moveDown(2);

    doc.fontSize(14).text("User Request:", { underline: true });
    doc.text(`"${data.userMessage}"`);
    doc.moveDown();

    doc.fontSize(14).text("Agent Workflow:", { underline: true });
    data.agents.forEach((a, i) => {
      doc.text(`${i + 1}. ${a.name}: ${a.output}`);
      doc.moveDown(0.5);
    });

    doc.fontSize(14).text("Final Summary:", { underline: true });
    doc.text(data.finalSummary);

    doc.end();
  });
};

/**
 * Saves PDF buffer into user's Downloads directory
 * Returns the full file path (for backend use)
 */
exports.savePdfToDownloads = (buffer) => {
  const downloadsDir = path.join(os.homedir(), "Downloads");
  if (!fs.existsSync(downloadsDir)) fs.mkdirSync(downloadsDir, { recursive: true });

  const fileName = `report-${Date.now()}.pdf`;
  const filePath = path.join(downloadsDir, fileName);

  fs.writeFileSync(filePath, buffer);
  console.log(`[PDF Generator] Saved to: ${filePath}`);
  return filePath;
};
