import { exportCanvasAsPDF } from "../api/canvas";

export default function ExportButton() {
  return (
    <button
      onClick={exportCanvasAsPDF}
      className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
    >
      Export as PDF
    </button>
  );
}
