// Save booking (only keep last 5)
export function saveBooking(project) {
  if (typeof window !== "undefined") {
    let existing = JSON.parse(localStorage.getItem("bookings") || "[]");

    existing.unshift({
      ...project,
      bookedAt: new Date().toISOString(),
    });

    // Only keep last 5
    if (existing.length > 5) {
      existing = existing.slice(0, 5);
    }

    localStorage.setItem("bookings", JSON.stringify(existing));
  }
}

// Get all bookings
export function getBookings() {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("bookings") || "[]");
  }
  return [];
}

// Delete one booking by index
export function deleteBooking(index) {
  if (typeof window !== "undefined") {
    let existing = JSON.parse(localStorage.getItem("bookings") || "[]");
    existing.splice(index, 1);
    localStorage.setItem("bookings", JSON.stringify(existing));
  }
}

// Clear all bookings
export function clearBookings() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("bookings");
  }
}

// ✅ Export bookings as JSON
export function exportBookings() {
  if (typeof window !== "undefined") {
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const blob = new Blob([JSON.stringify(bookings, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "bookings.json"; // file name
    a.click();

    URL.revokeObjectURL(url);
  }
}

// ✅ Export bookings as PDF
export async function exportBookingsPDF() {
  if (typeof window !== "undefined") {
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    if (!bookings.length) {
      alert("No bookings to export!");
      return;
    }

    // lazy import jsPDF
    const { jsPDF } = await import("jspdf");

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("📑 Your Bookings", 20, 20);

    let y = 40;
    bookings.forEach((b, i) => {
      doc.setFontSize(12);
      doc.text(`${i + 1}. ${b.title}`, 20, y);
      doc.text(`Location: ${b.location}`, 20, y + 8);
      doc.text(`Price: ${b.price}`, 20, y + 16);
      y += 28;
    });

    doc.save("bookings.pdf");
  }
}
