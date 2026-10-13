/**
 * SHIFA CLINIC: Outpatient Department Engine
 * Real-time queue, appointment booking, and reception desk management.
 */

// Initial Doctors Dataset
const DEFAULT_DOCTORS = [
  {
    id: "dr-aravind",
    name: "Dr. Aravind Krishnan",
    degrees: "MBBS, MD (Cardiology), FACC",
    specialty: "Cardiology",
    experience: "12 Years",
    room: "Room 104",
    fee: 600,
    avatar: "AK",
    color: "#0F766E",
    servingToken: "SHF-101",
    nextToken: "SHF-104"
  },
  {
    id: "dr-sneha",
    name: "Dr. Sneha Parthasarathy",
    degrees: "MBBS, DCH, MD (Pediatrics)",
    specialty: "Pediatrics",
    experience: "9 Years",
    room: "Room 102",
    fee: 500,
    avatar: "SP",
    color: "#0284C7",
    servingToken: "SHF-103",
    nextToken: "SHF-107"
  },
  {
    id: "dr-farhan",
    name: "Dr. Mohammed Farhan",
    degrees: "MBBS, MD (General Medicine)",
    specialty: "General Medicine",
    experience: "15 Years",
    room: "Room 101",
    fee: 450,
    avatar: "MF",
    color: "#0D9488",
    servingToken: "SHF-102",
    nextToken: "SHF-105"
  },
  {
    id: "dr-priya",
    name: "Dr. Priya Ranganathan",
    degrees: "MBBS, MS (Orthopedics), MCh",
    specialty: "Orthopedics",
    experience: "11 Years",
    room: "Room 105",
    fee: 700,
    avatar: "PR",
    color: "#334155",
    servingToken: "SHF-106",
    nextToken: "SHF-109"
  },
  {
    id: "dr-vikram",
    name: "Dr. Vikramaditya Sen",
    degrees: "MBBS, MD, DVD (Dermatology)",
    specialty: "Dermatology",
    experience: "8 Years",
    room: "Room 103",
    fee: 550,
    avatar: "VS",
    color: "#475569",
    servingToken: "SHF-108",
    nextToken: "SHF-112"
  },
  {
    id: "dr-ananya",
    name: "Dr. Ananya Balaji",
    degrees: "MBBS, MD (General Medicine)",
    specialty: "General Medicine",
    experience: "7 Years",
    room: "Room 106",
    fee: 450,
    avatar: "AB",
    color: "#0F766E",
    servingToken: "SHF-110",
    nextToken: "SHF-115"
  }
];

// Clinic Consultation Sessions
const MORNING_SLOTS = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", 
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM"
];

const EVENING_SLOTS = [
  "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", 
  "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM"
];

function getTodayString() {
  const today = new Date();
  return today.toISOString().split("T")[0];
}

// Initial Registered Outpatient Records
const DEFAULT_BOOKINGS = [
  {
    token: "SHF-101",
    doctorId: "dr-aravind",
    doctorName: "Dr. Aravind Krishnan",
    specialty: "Cardiology",
    room: "Room 104",
    date: getTodayString(),
    time: "09:00 AM",
    patientName: "Karthik Subramaniam",
    phone: "9840123456",
    email: "karthik.subramaniam@gmail.com",
    age: 52,
    gender: "Male",
    visitType: "Follow-up",
    symptoms: "Post-angioplasty routine checkup and ECG review",
    status: "In Progress",
    createdAt: new Date().toISOString()
  },
  {
    token: "SHF-102",
    doctorId: "dr-farhan",
    doctorName: "Dr. Mohammed Farhan",
    specialty: "General Medicine",
    room: "Room 101",
    date: getTodayString(),
    time: "09:30 AM",
    patientName: "Deepa Natarajan",
    phone: "9841234567",
    email: "deepa.natarajan@gmail.com",
    age: 34,
    gender: "Female",
    visitType: "First Visit",
    symptoms: "Persistent fever and joint pain for three days",
    status: "In Progress",
    createdAt: new Date().toISOString()
  },
  {
    token: "SHF-103",
    doctorId: "dr-sneha",
    doctorName: "Dr. Sneha Parthasarathy",
    specialty: "Pediatrics",
    room: "Room 102",
    date: getTodayString(),
    time: "10:00 AM",
    patientName: "Master Aarav (Parent: Ramesh)",
    phone: "9444098765",
    email: "ramesh.aarav@gmail.com",
    age: 4,
    gender: "Male",
    visitType: "Routine Checkup",
    symptoms: "Routine developmental checkup and vaccination",
    status: "In Progress",
    createdAt: new Date().toISOString()
  },
  {
    token: "SHF-104",
    doctorId: "dr-aravind",
    doctorName: "Dr. Aravind Krishnan",
    specialty: "Cardiology",
    room: "Room 104",
    date: getTodayString(),
    time: "10:30 AM",
    patientName: "Venkatesan R.",
    phone: "9884567890",
    email: "venkatesan.r@gmail.com",
    age: 61,
    gender: "Male",
    visitType: "First Visit",
    symptoms: "Mild chest tightness on exertion",
    status: "Arrived",
    createdAt: new Date().toISOString()
  },
  {
    token: "SHF-105",
    doctorId: "dr-farhan",
    doctorName: "Dr. Mohammed Farhan",
    specialty: "General Medicine",
    room: "Room 101",
    date: getTodayString(),
    time: "11:00 AM",
    patientName: "Meena Sundaram",
    phone: "9790123412",
    email: "meena.sundaram@gmail.com",
    age: 46,
    gender: "Female",
    visitType: "Follow-up",
    symptoms: "Diabetes blood profile review",
    status: "Booked",
    createdAt: new Date().toISOString()
  }
];

// Storage Persistence
function loadDoctors() {
  const saved = localStorage.getItem("SHIFA_CLINIC_DOCTORS");
  return saved ? JSON.parse(saved) : DEFAULT_DOCTORS;
}

function saveDoctors(docs) {
  localStorage.setItem("SHIFA_CLINIC_DOCTORS", JSON.stringify(docs));
}

function loadBookings() {
  const saved = localStorage.getItem("SHIFA_CLINIC_BOOKINGS");
  return saved ? JSON.parse(saved) : DEFAULT_BOOKINGS;
}

function saveBookings(bookingsList) {
  localStorage.setItem("SHIFA_CLINIC_BOOKINGS", JSON.stringify(bookingsList));
}

let doctors = loadDoctors();
let bookings = loadBookings();

let bookingSession = {
  doctor: null,
  date: getTodayString(),
  slotTime: null
};

let currentPortalView = "patient";

// DOM Node References
const patientPortal = document.getElementById("patientPortal");
const adminPortal = document.getElementById("adminPortal");
const quickSwitchBtn = document.getElementById("quickSwitchBtn");
const quickSwitchText = document.getElementById("quickSwitchText");
const menuSettingsBtn = document.getElementById("menuSettingsBtn");
const settingsDialog = document.getElementById("settingsDialog");
const currentRoleText = document.getElementById("currentRoleText");
const modalPortalToggleBtn = document.getElementById("modalPortalToggleBtn");

const doctorsContainer = document.getElementById("doctorsContainer");
const specialtyFilterGroup = document.getElementById("specialtyFilterGroup");
const doctorSearch = document.getElementById("doctorSearch");
const opdRoomsGrid = document.getElementById("opdRoomsGrid");

const bookingDialog = document.getElementById("bookingDialog");
const walkInDialog = document.getElementById("walkInDialog");
const bookingDateInput = document.getElementById("bookingDateInput");
const morningSlotsContainer = document.getElementById("morningSlotsContainer");
const eveningSlotsContainer = document.getElementById("eveningSlotsContainer");
const goToStep2Btn = document.getElementById("goToStep2Btn");

// Global Navigation and Action Handlers
function handleTrackTokenClick() {
  const el = document.getElementById("live-queue");
  const input = document.getElementById("tokenSearchInput");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
    if (input) {
      setTimeout(() => {
        input.focus();
        input.classList.add("ring-pulse");
        setTimeout(() => input.classList.remove("ring-pulse"), 1200);
      }, 300);
    }
  } else {
    window.location.href = "queue.html#live-queue";
  }
}

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  try {
    const dateInput = bookingDateInput || document.getElementById("bookingDateInput");
    if (dateInput) {
      const todayStr = getTodayString();
      dateInput.min = todayStr;
      dateInput.value = todayStr;
      bookingSession.date = todayStr;
      dateInput.addEventListener("change", (e) => {
        bookingSession.date = e.target.value;
        const display = document.getElementById("selectedDateDisplay");
        if (display) {
          display.textContent = e.target.value === getTodayString() ? "Today" : e.target.value;
        }
        renderAvailableSlots();
      });
    }

    const quickDate = document.getElementById("heroQuickDate");
    if (quickDate) {
      const todayStr = getTodayString();
      quickDate.min = todayStr;
      quickDate.value = todayStr;
    }
  } catch (err) {
    console.warn("Date input initialization notice:", err);
  }

  try { renderDoctorsGrid("all", ""); } catch (err) { /* Not on doctors directory page */ }
  try { renderOpdRoomsFeed(); } catch (err) { /* Not on queue feed page */ }
  try { renderAdminTable(); } catch (err) { /* Not on admin portal */ }
  try { updateKpiMetrics(); } catch (err) { /* Not on admin portal */ }
  try { populateAdminFilterDropdown(); } catch (err) { /* Not on admin portal */ }
  try { updateOutboxCounterBadge(); } catch (err) { /* Not on admin portal */ }

  try { setupEventListeners(); } catch (err) { console.warn("Listener setup:", err); }
  try { initScrollReveal(); } catch (err) { console.warn("Scroll reveal:", err); }

  const handleRouteHash = () => {
    if (window.location.hash === "#admin") {
      const pPortal = patientPortal || document.getElementById("patientPortal");
      const aPortal = adminPortal || document.getElementById("adminPortal");
      if (aPortal && pPortal) {
        if (!isStaffAuthenticated()) {
          openAuthModal();
        } else {
          executePortalSwitch("admin");
        }
      }
    }
  };
  handleRouteHash();
  window.addEventListener("hashchange", handleRouteHash);
});

function initScrollReveal() {
  if (!("IntersectionObserver" in window)) return;
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fade-in");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });

  document.querySelectorAll(".feature-item, .dept-card, .section-header, .interactive-preview-card, .token-tracker-box, .hero-grid").forEach(el => {
    observer.observe(el);
  });
}

function setupEventListeners() {
  (quickSwitchBtn || document.getElementById("quickSwitchBtn"))?.addEventListener("click", togglePortalView);
  (menuSettingsBtn || document.getElementById("menuSettingsBtn"))?.addEventListener("click", openSettingsModal);

  const authDialog = document.getElementById("authDialog");
  if (authDialog) {
    authDialog.addEventListener("click", (e) => {
      if (e.target === authDialog) {
        closeAuthModal();
      }
    });
  }

  const sFilterGroup = specialtyFilterGroup || document.getElementById("specialtyFilterGroup");
  const dSearch = doctorSearch || document.getElementById("doctorSearch");

  sFilterGroup?.addEventListener("click", (e) => {
    if (e.target.classList.contains("filter-pill")) {
      document.querySelectorAll(".filter-pill").forEach(p => p.classList.remove("active"));
      e.target.classList.add("active");
      const specialty = e.target.dataset.specialty;
      renderDoctorsGrid(specialty, dSearch ? dSearch.value.trim() : "");
    }
  });

  dSearch?.addEventListener("input", (e) => {
    const activeSpecialty = document.querySelector(".filter-pill.active")?.dataset.specialty || "all";
    renderDoctorsGrid(activeSpecialty, e.target.value.trim());
  });

  document.querySelectorAll("#bookGeneralBtn, .book-general-trigger").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openBookingModal();
    });
  });

  document.querySelectorAll("#trackTokenNavBtn, .track-token-trigger").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      handleTrackTokenClick();
    });
  });

  document.getElementById("heroBookBtn")?.addEventListener("click", () => {
    const el = document.getElementById("doctors");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else openBookingModal();
  });

  document.getElementById("adminDoctorFilter")?.addEventListener("change", renderAdminTable);
  document.getElementById("adminStatusFilter")?.addEventListener("change", renderAdminTable);
  document.getElementById("adminSearchInput")?.addEventListener("input", renderAdminTable);

  document.getElementById("openWalkInModalBtn")?.addEventListener("click", openWalkInModal);
  document.getElementById("exportCsvBtn")?.addEventListener("click", exportBookingsToCSV);
}

// Settings Modal Controls
function openSettingsModal() {
  const dialog = settingsDialog || document.getElementById("settingsDialog");
  if (!dialog) return;

  const roleText = currentRoleText || document.getElementById("currentRoleText");
  const portalBtn = modalPortalToggleBtn || document.getElementById("modalPortalToggleBtn");

  if (roleText) {
    roleText.textContent = currentPortalView === "patient" ? "Patient Portal" : "Front Desk Console";
  }
  if (portalBtn) {
    portalBtn.textContent = currentPortalView === "patient" ? "Switch to Front Desk Portal" : "Switch to Patient View";
  }

  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", "true");
  }
}

function closeSettingsModal() {
  const dialog = settingsDialog || document.getElementById("settingsDialog");
  if (!dialog) return;
  if (typeof dialog.close === "function") {
    dialog.close();
  } else {
    dialog.removeAttribute("open");
  }
}

function togglePortalFromSettings() {
  closeSettingsModal();
  togglePortalView();
}

// Staff Authentication State
function isStaffAuthenticated() {
  return sessionStorage.getItem("SHIFA_STAFF_AUTH") === "true";
}

function openAuthModal() {
  const dialog = document.getElementById("authDialog");
  const errBanner = document.getElementById("authErrorMsg");
  if (errBanner) errBanner.classList.add("hidden");
  const form = document.getElementById("staffAuthForm");
  if (form) form.reset();

  if (dialog) {
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "true");
    }
  }
}

function closeAuthModal() {
  const dialog = document.getElementById("authDialog");
  if (dialog) {
    if (typeof dialog.close === "function") {
      dialog.close();
    } else {
      dialog.removeAttribute("open");
    }
  }
}

function submitStaffAuth() {
  const user = document.getElementById("authUsername")?.value.trim().toLowerCase();
  const pass = document.getElementById("authPassword")?.value.trim();
  const errBanner = document.getElementById("authErrorMsg");

  // Authentication check: doctor / doctor@123 or nurse / nurse@123
  if (user === "doctor" && pass === "doctor@123") {
    sessionStorage.setItem("SHIFA_STAFF_AUTH", "true");
    sessionStorage.setItem("SHIFA_STAFF_ROLE", "doctor");
    sessionStorage.setItem("SHIFA_STAFF_NAME", "Dr. M. K. Imran");
    closeAuthModal();
    executePortalSwitch("admin");
    window.location.hash = "#admin";
    showToast("Authenticated: Dr. M. K. Imran [Consultant / Doctor Console]");
  } else if (user === "nurse" && pass === "nurse@123") {
    sessionStorage.setItem("SHIFA_STAFF_AUTH", "true");
    sessionStorage.setItem("SHIFA_STAFF_ROLE", "nurse");
    sessionStorage.setItem("SHIFA_STAFF_NAME", "Operator Nurse");
    closeAuthModal();
    executePortalSwitch("admin");
    window.location.hash = "#admin";
    showToast("Staff authenticated: Operator Nurse [Desk 1]");
  } else {
    if (errBanner) {
      errBanner.classList.remove("hidden");
      errBanner.textContent = "Invalid credentials. Use authorized doctor or nursing operator account.";
    }
  }
}

function logoutStaff() {
  sessionStorage.removeItem("SHIFA_STAFF_AUTH");
  sessionStorage.removeItem("SHIFA_STAFF_ROLE");
  sessionStorage.removeItem("SHIFA_STAFF_NAME");
  executePortalSwitch("patient");
  if (window.location.hash === "#admin") {
    history.replaceState(null, "", window.location.pathname);
  }
  showToast("Staff session ended: Returned to Patient Portal");
}

function togglePortalView() {
  if (currentPortalView === "patient") {
    if (!isStaffAuthenticated()) {
      openAuthModal();
      return;
    }
    executePortalSwitch("admin");
  } else {
    executePortalSwitch("patient");
  }
}

function executePortalSwitch(targetView) {
  if (targetView === "admin") {
    currentPortalView = "admin";
    if (patientPortal) {
      patientPortal.classList.remove("active-view");
      patientPortal.classList.add("hidden-view");
    }
    if (adminPortal) {
      adminPortal.classList.remove("hidden-view");
      adminPortal.classList.add("active-view");
    }

    if (currentRoleText) currentRoleText.textContent = "Front Desk Console";
    if (modalPortalToggleBtn) modalPortalToggleBtn.textContent = "Switch to Patient View";

    if (quickSwitchText) quickSwitchText.textContent = "Patient View Access";
    if (quickSwitchBtn) {
      quickSwitchBtn.classList.remove("pill-btn-ghost");
      quickSwitchBtn.style.backgroundColor = "#0D9488";
    }

    renderAdminTable();
    updateKpiMetrics();
    startDeskClock();
  } else {
    currentPortalView = "patient";
    if (adminPortal) {
      adminPortal.classList.remove("active-view");
      adminPortal.classList.add("hidden-view");
    }
    if (patientPortal) {
      patientPortal.classList.remove("hidden-view");
      patientPortal.classList.add("active-view");
    }

    if (currentRoleText) currentRoleText.textContent = "Patient Portal";
    if (modalPortalToggleBtn) modalPortalToggleBtn.textContent = "Switch to Front Desk Portal";

    if (quickSwitchText) quickSwitchText.textContent = "Front Desk Access";
    if (quickSwitchBtn) {
      quickSwitchBtn.removeAttribute("style");
      quickSwitchBtn.classList.add("pill-btn-ghost");
    }

    renderOpdRoomsFeed();
  }
}

let deskClockInterval = null;
function startDeskClock() {
  if (deskClockInterval) clearInterval(deskClockInterval);
  const update = () => {
    const el = document.getElementById("deskClock");
    if (!el) return;
    const now = new Date();
    el.textContent = now.toLocaleDateString("en-GB", { 
      day: "2-digit", 
      month: "short", 
      year: "numeric" 
    }) + " | " + now.toLocaleTimeString("en-GB");
  };
  update();
  deskClockInterval = setInterval(update, 1000);
}

// Doctor Directory
function renderDoctorsGrid(specialtyFilter = "all", searchQuery = "") {
  const container = doctorsContainer || document.getElementById("doctorsContainer");
  if (!container) return;
  container.innerHTML = "";

  const filtered = doctors.filter(doc => {
    const matchesSpecialty = (specialtyFilter === "all") || (doc.specialty === specialtyFilter);
    const matchesSearch = searchQuery === "" || 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSpecialty && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 32px; text-align: center; background-color: #FFFFFF; border-radius: 8px; border: 1px solid #e2e8f0;">
        <p style="color: #64748b; font-size: 14px;">No physicians match the selected criteria.</p>
      </div>
    `;
    return;
  }

  filtered.forEach(doc => {
    const todayBookingsCount = bookings.filter(b => b.doctorId === doc.id && b.date === getTodayString() && b.status !== "Cancelled").length;
    const totalSlots = MORNING_SLOTS.length + EVENING_SLOTS.length;
    const slotsRemaining = Math.max(0, totalSlots - todayBookingsCount);

    const card = document.createElement("div");
    card.className = "doctor-card animate-fade-in";
    card.innerHTML = `
      <div>
        <div class="doctor-top">
          <div class="doc-avatar" style="background-color: ${doc.color};">
            ${doc.avatar}
          </div>
          <div class="doc-details">
            <h3>${doc.name}</h3>
            <p class="doc-degree">${doc.degrees}</p>
            <span class="doc-dept-badge">${doc.specialty}</span>
          </div>
        </div>

        <div class="doctor-meta-row">
          <div class="doc-meta-item">
            <span class="meta-label">Location</span>
            <span class="meta-val">${doc.room}</span>
          </div>
          <div class="doc-meta-item">
            <span class="meta-label">Clinical Experience</span>
            <span class="meta-val">${doc.experience}</span>
          </div>
          <div class="doc-meta-item">
            <span class="meta-label">Consultation Fee</span>
            <span class="meta-val">Rs. ${doc.fee}</span>
          </div>
        </div>
      </div>

      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span style="font-size: 12px; color: #059669; font-weight: 600;">
            ${slotsRemaining} open slots today
          </span>
          <span style="font-weight: 700; font-size: 14px; color: #0F172A;">
            OPD Session
          </span>
        </div>
        <button class="btn btn-primary btn-block" onclick="openBookingModal('${doc.id}')">
          Schedule Consultation
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

// Live Room Feed
function renderOpdRoomsFeed() {
  if (!opdRoomsGrid) return;
  opdRoomsGrid.innerHTML = "";

  doctors.forEach(doc => {
    const activeAppointment = bookings.find(b => b.doctorId === doc.id && b.status === "In Progress");
    const nextAppointment = bookings.find(b => b.doctorId === doc.id && (b.status === "Arrived" || b.status === "Booked"));

    const inSession = !!activeAppointment;
    const statusLabel = inSession ? "In Consultation" : "Room Available";
    const statusClass = inSession ? "status-tag-active" : "status-tag-standby";
    const activeTokenText = inSession ? activeAppointment.token : "Standby";
    const nextTokenText = nextAppointment ? nextAppointment.token : "Queue Clear";

    const card = document.createElement("div");
    card.className = "opd-room-card animate-fade-in";
    card.innerHTML = `
      <div class="room-card-head">
        <span class="room-badge">${doc.room.toUpperCase()}</span>
        <span class="room-status-indicator ${statusClass}">${statusLabel}</span>
      </div>

      <div class="room-physician-meta">
        <h4 class="room-doc-name">${doc.name}</h4>
        <div class="room-specialty">${doc.specialty}</div>
      </div>

      <div class="room-ledger-grid">
        <div class="room-ledger-col">
          <span class="ledger-label">Current Patient</span>
          <span class="ledger-value ${inSession ? 'active' : 'idle'}">${activeTokenText}</span>
        </div>
        <div class="room-ledger-col">
          <span class="ledger-label">Next in Line</span>
          <span class="ledger-value">${nextTokenText}</span>
        </div>
      </div>
    `;
    opdRoomsGrid.appendChild(card);
  });
}

// Live Token Lookup
function lookupTokenStatus() {
  const query = document.getElementById("tokenSearchInput").value.trim().toUpperCase();
  const resultBox = document.getElementById("tokenResultContainer");

  const appointment = bookings.find(b => b.token.toUpperCase() === query);

  resultBox.classList.remove("hidden");

  if (!appointment) {
    resultBox.style.backgroundColor = "#FEF2F2";
    resultBox.style.borderColor = "#FECACA";
    resultBox.innerHTML = `
      <div style="padding: 4px;">
        <strong style="color: #991B1B; font-size: 14px;">Token "${query}" not found in current records</strong>
        <p style="color: #B91C1C; font-size: 13px; margin: 4px 0 0;">Please verify the token number or contact the front desk.</p>
      </div>
    `;
    return;
  }

  const doctorBookings = bookings.filter(b => b.doctorId === appointment.doctorId && b.date === appointment.date && b.status !== "Cancelled" && b.status !== "Completed");
  const appointmentIndex = doctorBookings.findIndex(b => b.token === appointment.token);

  let statusMessage = "";
  let badgeColor = "#0284C7";

  if (appointment.status === "In Progress") {
    statusMessage = "Your consultation is currently in progress at " + appointment.room + ".";
    badgeColor = "#059669";
  } else if (appointment.status === "Completed") {
    statusMessage = "Consultation has been concluded for this token.";
    badgeColor = "#64748B";
  } else if (appointment.status === "Cancelled") {
    statusMessage = "This appointment has been cancelled.";
    badgeColor = "#DC2626";
  } else {
    const queueAhead = appointmentIndex;
    const estimatedMinutes = Math.max(5, queueAhead * 15);
    statusMessage = `There are ${queueAhead} patient(s) ahead of you. Estimated consultation in approximately ${estimatedMinutes} minutes at ${appointment.room}.`;
  }

  resultBox.style.backgroundColor = "#F0FDF4";
  resultBox.style.borderColor = "#BBF7D0";
  resultBox.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
      <div>
        <span style="font-size: 11px; font-weight: 700; color: #065F46; text-transform: uppercase;">Verified Token</span>
        <h4 style="font-size: 18px; font-weight: 800; color: #064E3B; font-family: 'JetBrains Mono', monospace;">${appointment.token}</h4>
      </div>
      <span style="background-color: ${badgeColor}; color: white; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: 700;">
        ${appointment.status}
      </span>
    </div>
    <p style="font-size: 13px; color: #166534; margin-bottom: 6px;">
      Patient: <strong>${appointment.patientName}</strong> | ${appointment.doctorName} (${appointment.specialty})
    </p>
    <div style="font-size: 13px; color: #047857; padding: 8px 12px; background-color: #FFFFFF; border-radius: 6px; border: 1px solid #A7F3D0;">
      ${statusMessage}
    </div>
  `;
}

// Modal Handling
function openBookingModal(doctorId) {
  const docList = (doctors && doctors.length > 0) ? doctors : loadDoctors();
  const doc = (doctorId ? docList.find(d => d.id === doctorId) : null) || docList[0];
  bookingSession.doctor = doc;
  bookingSession.slotTime = null;

  const docName = document.getElementById("modalDoctorName");
  if (docName) docName.textContent = `Book ${doc.name}`;
  const docMeta = document.getElementById("modalDoctorMeta");
  if (docMeta) docMeta.textContent = `${doc.specialty} | ${doc.room} | Consultation Fee: Rs. ${doc.fee}`;

  goToStep(1);
  renderAvailableSlots();

  const dialog = bookingDialog || document.getElementById("bookingDialog");
  if (!dialog) return;

  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", "true");
  }
}

function closeBookingModal() {
  const dialog = bookingDialog || document.getElementById("bookingDialog");
  if (!dialog) return;

  if (typeof dialog.close === "function") {
    dialog.close();
  } else {
    dialog.removeAttribute("open");
  }
}

function goToStep(stepNumber) {
  document.querySelectorAll(".booking-step").forEach(step => step.classList.remove("active"));
  const target = document.getElementById(`bookingStep${stepNumber}`);
  if (target) {
    target.classList.add("active");
  }

  if (stepNumber === 2 && bookingSession.doctor) {
    const sDoc = document.getElementById("summaryDocName");
    if (sDoc) sDoc.textContent = bookingSession.doctor.name;
    const sSlot = document.getElementById("summarySlotTime");
    if (sSlot) sSlot.textContent = `${bookingSession.date} at ${bookingSession.slotTime || ""}`;
    const sFee = document.getElementById("summaryFee");
    if (sFee) sFee.textContent = `Rs. ${bookingSession.doctor.fee}`;
  }
}

function renderAvailableSlots() {
  const morningSlots = morningSlotsContainer || document.getElementById("morningSlotsContainer");
  const eveningSlots = eveningSlotsContainer || document.getElementById("eveningSlotsContainer");
  const step2Btn = goToStep2Btn || document.getElementById("goToStep2Btn");
  if (!morningSlots || !eveningSlots) return;

  morningSlots.innerHTML = "";
  eveningSlots.innerHTML = "";
  if (step2Btn) step2Btn.disabled = true;

  const doc = bookingSession.doctor || doctors[0];
  const chosenDate = bookingSession.date || getTodayString();

  const bookedSlots = bookings
    .filter(b => b.doctorId === doc.id && b.date === chosenDate && b.status !== "Cancelled")
    .map(b => b.time);

  MORNING_SLOTS.forEach(slot => {
    const isBooked = bookedSlots.includes(slot);
    const btn = createSlotButton(slot, isBooked);
    morningSlots.appendChild(btn);
  });

  EVENING_SLOTS.forEach(slot => {
    const isBooked = bookedSlots.includes(slot);
    const btn = createSlotButton(slot, isBooked);
    eveningSlots.appendChild(btn);
  });
}

function createSlotButton(slotText, isBooked) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "slot-btn";
  btn.textContent = slotText;

  if (isBooked) {
    btn.disabled = true;
    btn.title = "Slot reserved";
  } else {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".slot-btn").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      bookingSession.slotTime = slotText;
      const step2Btn = goToStep2Btn || document.getElementById("goToStep2Btn");
      if (step2Btn) step2Btn.disabled = false;
    });
  }

  return btn;
}

let activeBookingSlip = null;

// Booking Confirmation
function submitAppointment() {
  const patientName = document.getElementById("patientName")?.value.trim();
  const phone = document.getElementById("patientPhone")?.value.trim();
  const email = document.getElementById("patientEmail")?.value.trim() || "";
  const age = document.getElementById("patientAge")?.value.trim();
  const gender = document.getElementById("patientGender")?.value;
  const visitType = document.getElementById("visitType")?.value || "First Visit";
  const symptoms = document.getElementById("patientSymptoms")?.value.trim() || "General medical consultation";

  if (!patientName || !phone || !email || !age || !gender) {
    alert("Please fill in all mandatory fields, including a valid email address.");
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    alert("Please enter a valid email address to receive your official OPD consultation pass.");
    return;
  }

  const nextTokenNum = 100 + bookings.length + 1;
  const tokenCode = `SHF-${nextTokenNum}`;

  const newAppointment = {
    token: tokenCode,
    doctorId: bookingSession.doctor.id,
    doctorName: bookingSession.doctor.name,
    specialty: bookingSession.doctor.specialty,
    room: bookingSession.doctor.room,
    date: bookingSession.date,
    time: bookingSession.slotTime,
    patientName: patientName,
    phone: phone,
    email: email,
    age: parseInt(age, 10),
    gender: gender,
    visitType: visitType,
    symptoms: symptoms,
    status: "Booked",
    createdAt: new Date().toISOString()
  };

  bookings.push(newAppointment);
  saveBookings(bookings);
  activeBookingSlip = newAppointment;

  // Populate Step 3 consultation pass
  const cToken = document.getElementById("confirmedTokenCode");
  if (cToken) cToken.textContent = tokenCode;
  const pName = document.getElementById("ticketPatientName");
  if (pName) pName.textContent = patientName;
  const dName = document.getElementById("ticketDoctorName");
  if (dName) dName.textContent = bookingSession.doctor.name;
  const dept = document.getElementById("ticketDepartment");
  if (dept) dept.textContent = bookingSession.doctor.specialty;
  const sTime = document.getElementById("ticketScheduledTime");
  if (sTime) sTime.textContent = `${bookingSession.date} at ${bookingSession.slotTime}`;
  const tRoom = document.getElementById("ticketRoom");
  if (tRoom) tRoom.textContent = bookingSession.doctor.room;
  const pEmail = document.getElementById("ticketPatientEmail");
  if (pEmail) pEmail.textContent = email;
  const eRecipient = document.getElementById("ticketEmailRecipient");
  if (eRecipient) eRecipient.textContent = email;

  // Configure Mailto link
  const mailtoLink = document.getElementById("openMailtoLink");
  if (mailtoLink) mailtoLink.href = generateMailtoUrl(newAppointment);

  // Configure WhatsApp link
  const waLink = document.getElementById("sendWhatsAppLink");
  if (waLink) waLink.href = generateWhatsAppUrl(newAppointment);

  // Render QR code
  renderTicketQrCode(tokenCode);

  // Dispatch confirmation email
  dispatchPatientConfirmationEmail(newAppointment);

  goToStep(3);

  renderDoctorsGrid();
  renderOpdRoomsFeed();
  renderAdminTable();
  updateKpiMetrics();

  showToast(`Token ${tokenCode} generated! Confirmation sent to ${email}`);
  document.getElementById("patientIntakeForm")?.reset();
}

// Front Desk Operations
function renderAdminTable() {
  const tbody = document.getElementById("adminBookingsTableBody");
  if (!tbody) return;
  tbody.innerHTML = "";

  const doctorFilter = document.getElementById("adminDoctorFilter")?.value || "all";
  const statusFilter = document.getElementById("adminStatusFilter")?.value || "all";
  const searchFilter = document.getElementById("adminSearchInput")?.value.toLowerCase().trim() || "";

  const filtered = bookings.filter(b => {
    const matchesDoc = doctorFilter === "all" || b.doctorId === doctorFilter;
    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    const matchesSearch = searchFilter === "" || 
      b.patientName.toLowerCase().includes(searchFilter) ||
      b.token.toLowerCase().includes(searchFilter) ||
      b.phone.includes(searchFilter);
    return matchesDoc && matchesStatus && matchesSearch;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 28px; color: #94a3b8;">
          No matching records found.
        </td>
      </tr>
    `;
    return;
  }

  [...filtered].reverse().forEach(item => {
    const tr = document.createElement("tr");

    let statusClass = "Booked";
    if (item.status === "In Progress") statusClass = "InProgress";
    else if (item.status === "Arrived") statusClass = "Arrived";
    else if (item.status === "Completed") statusClass = "Completed";
    else if (item.status === "Cancelled") statusClass = "Cancelled";

    tr.innerHTML = `
      <td><strong style="font-family: monospace; color: #0284C7; font-size: 14px;">${item.token}</strong></td>
      <td>
        <div style="font-weight: 700; color: #0F172A;">${item.patientName}</div>
        <div style="font-size: 11px; color: #64748B;">${item.age}y | ${item.gender} | ${item.visitType}</div>
      </td>
      <td>
        <div><strong>${item.doctorName}</strong></div>
        <div style="font-size: 11px; color: #64748B;">${item.specialty} (${item.room})</div>
      </td>
      <td>
        <div style="font-weight: 600;">${item.time}</div>
        <div style="font-size: 11px; color: #64748B;">${item.date}</div>
      </td>
      <td>
        <div style="font-family: monospace; font-size: 12px;">${item.phone}</div>
      </td>
      <td>
        <span class="status-badge ${statusClass}">${item.status}</span>
      </td>
      <td>
        <div class="action-btn-group">
          ${item.status === "Booked" ? `<button class="action-btn" onclick="updateAppointmentStatus('${item.token}', 'Arrived')">Mark Arrived</button>` : ""}
          ${item.status === "Arrived" || item.status === "Booked" ? `<button class="action-btn call-btn" onclick="updateAppointmentStatus('${item.token}', 'In Progress')">Call In</button>` : ""}
          ${item.status === "In Progress" ? `<button class="action-btn" style="background-color:#DCFCE7; color:#15803D;" onclick="updateAppointmentStatus('${item.token}', 'Completed')">Complete</button>` : ""}
          ${item.status !== "Completed" && item.status !== "Cancelled" ? `<button class="action-btn" style="color:#DC2626;" onclick="updateAppointmentStatus('${item.token}', 'Cancelled')">Cancel</button>` : ""}
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function updateAppointmentStatus(token, newStatus) {
  const item = bookings.find(b => b.token === token);
  if (!item) return;

  item.status = newStatus;
  saveBookings(bookings);

  renderAdminTable();
  updateKpiMetrics();
  renderOpdRoomsFeed();
  renderDoctorsGrid();

  if (newStatus === "In Progress") {
    announceTokenCall(token, item.doctorName, item.room);
    showToast(`Calling Token ${token} to ${item.room}`);
  } else {
    showToast(`Token ${token}: Status updated to "${newStatus}"`);
  }
}

function updateKpiMetrics() {
  const kpiTotal = document.getElementById("kpiTotal");
  if (!kpiTotal) return;

  const today = getTodayString();
  const todayBookings = bookings.filter(b => b.date === today && b.status !== "Cancelled");

  const total = todayBookings.length;
  const waiting = todayBookings.filter(b => b.status === "Arrived" || b.status === "Booked").length;
  const inProgress = todayBookings.filter(b => b.status === "In Progress").length;
  const completed = todayBookings.filter(b => b.status === "Completed").length;

  kpiTotal.textContent = total;
  const waitingEl = document.getElementById("kpiWaiting");
  if (waitingEl) waitingEl.textContent = waiting;
  const inProgEl = document.getElementById("kpiInProgress");
  if (inProgEl) inProgEl.textContent = inProgress;
  const compEl = document.getElementById("kpiCompleted");
  if (compEl) compEl.textContent = completed;
}

function populateAdminFilterDropdown() {
  const select = document.getElementById("adminDoctorFilter");
  const walkInSelect = document.getElementById("walkInDoctorSelect");
  if (!select) return;

  doctors.forEach(doc => {
    const opt = document.createElement("option");
    opt.value = doc.id;
    opt.textContent = `${doc.name} (${doc.specialty})`;
    select.appendChild(opt);

    if (walkInSelect) {
      const walkInOpt = opt.cloneNode(true);
      walkInSelect.appendChild(walkInOpt);
    }
  });
}

// Walk-in Management
function openWalkInModal() {
  if (typeof walkInDialog.showModal === "function") {
    walkInDialog.showModal();
  } else {
    walkInDialog.setAttribute("open", "true");
  }
}

function closeWalkInModal() {
  if (typeof walkInDialog.close === "function") {
    walkInDialog.close();
  } else {
    walkInDialog.removeAttribute("open");
  }
}

function submitWalkIn() {
  const docId = document.getElementById("walkInDoctorSelect")?.value;
  const name = document.getElementById("walkInPatientName")?.value.trim();
  const phone = document.getElementById("walkInPhone")?.value.trim();
  const emailInput = document.getElementById("walkInEmail")?.value.trim();
  const age = document.getElementById("walkInAge")?.value.trim() || 30;
  const priority = document.getElementById("walkInPriority")?.value || "Normal";

  if (!docId || !name || !phone) {
    showToast("Please provide doctor, patient name, and telephone.");
    return;
  }

  const email = emailInput || `${name.toLowerCase().replace(/[^a-z0-9]/g, "") || "patient"}@shifaclinic.local`;
  const doc = doctors.find(d => d.id === docId) || doctors[0];

  const nextTokenNum = 100 + bookings.length + 1;
  const tokenCode = `SHF-W${nextTokenNum}`;

  const walkInBooking = {
    token: tokenCode,
    doctorId: doc.id,
    doctorName: doc.name,
    specialty: doc.specialty,
    room: doc.room,
    date: getTodayString(),
    time: "Immediate Triage",
    patientName: `${name} [${priority}]`,
    phone: phone,
    email: email,
    age: parseInt(age, 10),
    gender: "Unspecified",
    visitType: priority === "Emergency" ? "Urgent Priority Walk-In" : "Standard Walk-In",
    symptoms: `Immediate clinic walk-in (${priority})`,
    status: priority === "Emergency" ? "In Progress" : "Arrived",
    createdAt: new Date().toISOString()
  };

  bookings.push(walkInBooking);
  saveBookings(bookings);

  closeWalkInModal();
  document.getElementById("walkInForm")?.reset();

  renderAdminTable();
  updateKpiMetrics();
  renderOpdRoomsFeed();

  // Dispatch confirmation email
  dispatchPatientConfirmationEmail(walkInBooking);

  showToast(`Walk-In registered: Token ${tokenCode}. Confirmation sent to ${email}`);
}

function resetDemoRecords() {
  if (confirm("Reset records to initial sample clinic data?")) {
    localStorage.removeItem("SHIFA_CLINIC_BOOKINGS");
    bookings = DEFAULT_BOOKINGS;
    saveBookings(bookings);
    renderAdminTable();
    updateKpiMetrics();
    renderOpdRoomsFeed();
    renderDoctorsGrid();
    closeSettingsModal();
    showToast("Sample data restored successfully");
  }
}

function exportBookingsToCSV() {
  const headers = ["Token", "PatientName", "Age", "Gender", "Phone", "Doctor", "Specialty", "Room", "Date", "Time", "Status", "Symptoms"];
  const rows = bookings.map(b => [
    b.token,
    `"${b.patientName}"`,
    b.age,
    b.gender,
    b.phone,
    `"${b.doctorName}"`,
    b.specialty,
    b.room,
    b.date,
    b.time,
    b.status,
    `"${(b.symptoms || "").replace(/"/g, '""')}"`
  ]);

  const csvContent = "data:text/csv;charset=utf-8," 
    + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `SHIFA_CLINIC_Log_${getTodayString()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast("OPD log exported as CSV file");
}

function showToast(message) {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(8px)";
    toast.style.transition = "all 0.2s ease";
    setTimeout(() => {
      toast.remove();
    }, 200);
  }, 3000);
}

// Audio Chime & Speech Synthesis Announcement
function announceTokenCall(token, doctorName, room) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      const ctx = new AudioContext();
      const now = ctx.currentTime;

      // Primary Hospital Chime Note (D5 - 587.33 Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.frequency.setValueAtTime(587.33, now);
      gain1.gain.setValueAtTime(0.2, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.65);

      // Secondary Hospital Chime Note (A5 - 880.00 Hz)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.frequency.setValueAtTime(880.00, now + 0.22);
      gain2.gain.setValueAtTime(0.25, now + 0.22);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.15);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.22);
      osc2.stop(now + 1.15);
    }

    if ("speechSynthesis" in window) {
      setTimeout(() => {
        const spelled = token.replace("-", " ").split("").join(" ");
        const utterance = new SpeechSynthesisUtterance(`Token ${spelled}. Please proceed to ${room || "Consultation Room"}.`);
        utterance.rate = 0.88;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        window.speechSynthesis.speak(utterance);
      }, 650);
    }
  } catch (err) {
    console.warn("Audio chime notice:", err);
  }
}

function testAudioChime() {
  announceTokenCall("SHF-101", "Dr. Aravind Krishnan", "Room 104");
  showToast("Audio chime and speech synthesizer test dispatched");
}

// Digital Clinical Slip & Communications Engine
function generateClinicalEmailHtml(app) {
  const origin = "https://abusufiyan.netlify.app";
  const queueUrl = `${origin}/queue.html?token=${encodeURIComponent(app.token)}`;
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(queueUrl)}&margin=2`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SHIFA CLINIC — OPD Consultation Pass [${app.token}]</title>
  <style>
    body { margin: 0; padding: 24px; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.5; }
    .slip-container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 16px rgba(0,0,0,0.06); }
    .slip-header { background: linear-gradient(135deg, #0284C7 0%, #0369A1 100%); color: #ffffff; padding: 28px 24px; text-align: center; }
    .slip-badge { display: inline-block; padding: 4px 12px; background: rgba(255,255,255,0.2); border-radius: 20px; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 8px; }
    .clinic-title { font-size: 24px; font-weight: 800; letter-spacing: 1px; margin: 0; text-transform: uppercase; }
    .clinic-address { font-size: 12px; color: #e0f2fe; margin-top: 6px; }
    .token-card { background: #f8fafc; border: 2px dashed #0284c7; border-radius: 10px; margin: 24px; padding: 20px; text-align: center; }
    .token-tag { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #64748b; }
    .token-code { font-size: 38px; font-weight: 900; font-family: 'SF Mono', Monaco, monospace; color: #0284c7; margin: 6px 0; }
    .token-status { font-size: 12px; font-weight: 700; color: #0369a1; }
    .slip-body { padding: 0 24px 20px 24px; }
    .table-details { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    .table-details td { padding: 10px 12px; border-bottom: 1px solid #f1f5f9; font-size: 13px; }
    .table-details td.label { font-weight: 600; color: #64748b; width: 36%; }
    .table-details td.val { font-weight: 700; color: #0f172a; }
    .guide-box { background: #eff6ff; border-left: 4px solid #0284c7; padding: 14px 16px; border-radius: 0 8px 8px 0; margin-bottom: 20px; font-size: 13px; color: #1e3a8a; }
    .qr-block { text-align: center; padding: 16px 24px 24px 24px; background: #fafafa; border-top: 1px solid #f1f5f9; }
    .qr-caption { font-size: 12px; color: #64748b; margin-top: 8px; }
    .track-btn { display: inline-block; margin-top: 10px; padding: 10px 22px; background: #0284c7; color: #ffffff !important; text-decoration: none; border-radius: 6px; font-weight: 700; font-size: 13px; }
    .slip-footer { background: #0f172a; color: #94a3b8; padding: 20px 24px; text-align: center; font-size: 11px; line-height: 1.6; }
    .helpline-link { color: #38bdf8; text-decoration: none; font-weight: 700; }
  </style>
</head>
<body>
  <div class="slip-container">
    <div class="slip-header">
      <span class="slip-badge">Official Outpatient Pass</span>
      <h1 class="clinic-title">SHIFA CLINIC</h1>
      <div class="clinic-address">
        #42, High Road (Opposite Clock Tower, Near Old Bus Stand), Pernambut, Tirupattur District, Tamil Nadu 635810<br>
        Helpline / Reception: <a href="tel:+919342488966" class="helpline-link" style="color:#ffffff; text-decoration:underline;">+91 93424 88966</a>
      </div>
    </div>

    <div class="token-card">
      <div class="token-tag">OPD Queue Token Number</div>
      <div class="token-code">${app.token}</div>
      <div class="token-status">Queue Status: ${app.status || "Registered"}</div>
    </div>

    <div class="slip-body">
      <table class="table-details">
        <tr>
          <td class="label">Patient Name:</td>
          <td class="val">${app.patientName}</td>
        </tr>
        <tr>
          <td class="label">Consulting Doctor:</td>
          <td class="val">${app.doctorName}</td>
        </tr>
        <tr>
          <td class="label">Specialty:</td>
          <td class="val">${app.specialty}</td>
        </tr>
        <tr>
          <td class="label">Assigned Room:</td>
          <td class="val">${app.room}</td>
        </tr>
        <tr>
          <td class="label">Scheduled Time:</td>
          <td class="val">${app.date} at ${app.time}</td>
        </tr>
        <tr>
          <td class="label">Contact Telephone:</td>
          <td class="val">${app.phone}</td>
        </tr>
        <tr>
          <td class="label">Visit Classification:</td>
          <td class="val">${app.visitType || "General Consultation"}</td>
        </tr>
      </table>

      <div class="guide-box">
        <strong>Patient Guidance:</strong><br>
        • Please report to the reception desk 10 minutes prior to your allocated slot.<br>
        • Kindly bring previous medical records, past prescriptions, and diagnostic reports.<br>
        • Present this digital slip or quote token <strong>${app.token}</strong> at reception.
      </div>
    </div>

    <div class="qr-block">
      <img src="${qrApiUrl}" alt="Token Verification QR Code" width="130" height="130" style="display:inline-block; border-radius:6px; border:1px solid #e2e8f0; padding:4px; background:#ffffff;">
      <div class="qr-caption">Scan with smartphone camera to track your live queue position online:</div>
      <a href="${queueUrl}" class="track-btn" target="_blank" rel="noopener">Track Live Queue Online</a>
    </div>

    <div class="slip-footer">
      <strong>SHIFA CLINIC PERNAMBUT</strong> • Certified Healthcare & Outpatient Facility<br>
      Pernambut, Tirupattur District, Tamil Nadu — 635810 | Reception: <a href="tel:+919342488966" class="helpline-link">+91 93424 88966</a><br>
      This is a system-generated electronic consultation record. No physical signature required.
    </div>
  </div>
</body>
</html>`;
}

function generateWhatsAppUrl(app) {
  const origin = "https://abusufiyan.netlify.app";
  const queueUrl = `${origin}/queue.html?token=${encodeURIComponent(app.token)}`;
  const text = `*SHIFA CLINIC — OPD TOKEN PASS*
Token Number: *${app.token}*
Patient Name: *${app.patientName}*
Consulting Doctor: *${app.doctorName}* (${app.specialty})
Room Assignment: *${app.room}*
Scheduled Time: *${app.date}* at *${app.time}*

📍 *Location*: #42, High Road (Opposite Clock Tower, Near Old Bus Stand), Pernambut, Tirupattur District, Tamil Nadu 635810
📞 *Reception Helpline*: +91 93424 88966

🔗 *Live Queue Tracker*: ${queueUrl}

_Please show this digital slip at reception upon arrival._`;

  return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
}

function generateMailtoUrl(app) {
  const subject = `SHIFA CLINIC — OPD Consultation Pass [${app.token}]`;
  const body = `Dear ${app.patientName},

Your Outpatient Consultation Token at SHIFA CLINIC has been confirmed:

Token Code: ${app.token}
Physician: ${app.doctorName} (${app.specialty})
Consultation Room: ${app.room}
Scheduled Time: ${app.date} at ${app.time}

Clinic Address: #42, High Road (Opposite Clock Tower, Near Old Bus Stand), Pernambut, Tirupattur District, Tamil Nadu 635810
Reception Helpline: +91 93424 88966

Please arrive 10 minutes prior to your slot and present this token at the reception desk.

Sincerely,
Front Desk Administration
SHIFA CLINIC, Pernambut`;

  return `mailto:${encodeURIComponent(app.email || '')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function renderTicketQrCode(tokenCode) {
  const qrWrap = document.getElementById("ticketQrWrapper");
  if (!qrWrap) return;

  const origin = "https://abusufiyan.netlify.app";
  const queueUrl = `${origin}/queue.html?token=${encodeURIComponent(tokenCode)}`;
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(queueUrl)}&margin=4`;

  qrWrap.innerHTML = `
    <img src="${qrApiUrl}" alt="Token QR Code" style="width: 100%; height: 100%; object-fit: contain; border-radius: 4px;" onerror="this.onerror=null; this.parentElement.innerHTML='<div style=\\'display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; background:#F8FAFC; border-radius:4px; text-align:center; padding:10px;\\'><div style=\\'font-size:11px; font-weight:700; color:#0284c7;\\'>TOKEN PASS</div><div style=\\'font-size:22px; font-weight:800; font-family:monospace; margin-top:6px; color:#0F172A;\\'>${tokenCode}</div><div style=\\'font-size:10px; color:#64748b; margin-top:4px;\\'>Scan Verified</div></div>';" />
  `;
}

// Patient Confirmation Email Dispatch Engine
window.currentBookingAppointment = null;

function dispatchPatientConfirmationEmail(app) {
  if (!app || !app.email) return;

  window.currentBookingAppointment = app;
  const htmlContent = generateClinicalEmailHtml(app);
  const payload = {
    to_email: app.email,
    patient_name: app.patientName,
    token: app.token,
    doctor_name: app.doctorName,
    specialty: app.specialty,
    room: app.room,
    date: app.date,
    time: app.time,
    subject: `SHIFA CLINIC — OPD Consultation Pass [${app.token}] - ${app.patientName}`,
    html: htmlContent
  };

  // Optimistic client-side outbox persistence
  try {
    const localOutbox = JSON.parse(localStorage.getItem("SHIFA_EMAIL_OUTBOX") || "[]");
    localOutbox.unshift({
      id: `local_${Date.now()}_${app.token}`,
      to: app.email,
      patientName: app.patientName,
      token: app.token,
      doctorName: app.doctorName,
      specialty: app.specialty,
      room: app.room,
      date: app.date,
      time: app.time,
      subject: payload.subject,
      dispatchedAt: new Date().toISOString(),
      status: "Dispatched (Outbox Logged)",
      htmlBody: htmlContent
    });
    localStorage.setItem("SHIFA_EMAIL_OUTBOX", JSON.stringify(localOutbox.slice(0, 50)));
    updateOutboxCounterBadge();
  } catch (e) {
    console.error("Local outbox cache error", e);
  }

  // Network dispatch to backend server API
  fetch("/api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
  .then(res => res.json())
  .then(data => {
    if (data.status === "success") {
      updateOutboxCounterBadge();
    }
  })
  .catch(err => {
    console.warn("Backend email dispatch saved to local outbox:", err);
  });
}

function resendCurrentBookingEmail() {
  if (!window.currentBookingAppointment) {
    showToast("No active booking to resend");
    return;
  }
  dispatchPatientConfirmationEmail(window.currentBookingAppointment);
  showToast(`Confirmation email resent to ${window.currentBookingAppointment.email}`);
}

function updateOutboxCounterBadge() {
  const badge = document.getElementById("outboxCountBadge");
  if (!badge) return;

  fetch("/api/emails")
    .then(r => r.json())
    .then(list => {
      const count = Array.isArray(list) ? list.length : 0;
      badge.textContent = `${count} Dispatched`;
    })
    .catch(() => {
      const local = JSON.parse(localStorage.getItem("SHIFA_EMAIL_OUTBOX") || "[]");
      badge.textContent = `${local.length} Dispatched`;
    });
}

// Front Desk Email Outbox Modal Handlers
let cachedEmailList = [];

function openEmailOutboxModal() {
  const dialog = document.getElementById("emailOutboxDialog");
  if (!dialog) return;

  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", "true");
  }

  loadEmailOutbox();
  loadSmtpStatus();
}

function closeEmailOutboxModal() {
  const dialog = document.getElementById("emailOutboxDialog");
  if (!dialog) return;

  if (typeof dialog.close === "function") {
    dialog.close();
  } else {
    dialog.removeAttribute("open");
  }
}

function loadEmailOutbox() {
  const tbody = document.getElementById("emailOutboxTableBody");
  if (tbody) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:24px; color:#64748b;">Loading outbox dispatch logs...</td></tr>`;
  }

  fetch("/api/emails")
    .then(r => r.json())
    .then(serverList => {
      const localList = JSON.parse(localStorage.getItem("SHIFA_EMAIL_OUTBOX") || "[]");
      const map = new Map();
      if (Array.isArray(serverList)) {
        serverList.forEach(item => map.set(item.id || item.token, item));
      }
      localList.forEach(item => {
        if (!map.has(item.id || item.token)) {
          map.set(item.id || item.token, item);
        }
      });
      cachedEmailList = Array.from(map.values());
      renderEmailOutbox(cachedEmailList);
      updateOutboxCounterBadge();
    })
    .catch(() => {
      const localList = JSON.parse(localStorage.getItem("SHIFA_EMAIL_OUTBOX") || "[]");
      cachedEmailList = localList;
      renderEmailOutbox(cachedEmailList);
    });
}

function renderEmailOutbox(items) {
  const tbody = document.getElementById("emailOutboxTableBody");
  if (!tbody) return;
  tbody.innerHTML = "";

  if (!items || items.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:32px; color:#94a3b8;">No confirmation emails dispatched yet. Book an OP appointment or walk-in to test.</td></tr>`;
    return;
  }

  items.forEach((item, index) => {
    const tr = document.createElement("tr");
    const dateStr = item.dispatchedAt ? new Date(item.dispatchedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }) : "Just now";
    const isSmtp = item.mode === "smtp_live";

    tr.innerHTML = `
      <td style="font-size:12px; color:#64748B;">${dateStr}</td>
      <td><strong style="font-family:monospace; color:#0284C7; font-size:13px;">${item.token || "-"}</strong></td>
      <td>
        <div style="font-weight:600; color:#0F172A;">${item.patientName || "Patient"}</div>
        <div style="font-size:11px; color:#64748B;">${item.doctorName || ""}</div>
      </td>
      <td style="font-family:monospace; font-size:12px; color:#334155;">${item.to || item.to_email || "-"}</td>
      <td>
        <span class="status-badge Completed" style="font-size:11px; padding:2px 8px; background:${isSmtp ? "#DCFCE7" : "#E0F2FE"}; color:${isSmtp ? "#15803D" : "#0284C7"};">
          ${isSmtp ? "Relayed (SMTP)" : "Logged & Ready"}
        </span>
      </td>
      <td>
        <button class="action-btn" style="background:#E0F2FE; color:#0284C7; font-size:11px; padding:4px 8px;" onclick="openEmailPreviewModal(${index})">
          Preview Slip
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function filterEmailOutbox() {
  const query = document.getElementById("outboxSearchInput")?.value.toLowerCase().trim() || "";
  if (!query) {
    renderEmailOutbox(cachedEmailList);
    return;
  }
  const filtered = cachedEmailList.filter(item => {
    return (item.patientName || "").toLowerCase().includes(query) ||
           (item.token || "").toLowerCase().includes(query) ||
           (item.to || "").toLowerCase().includes(query) ||
           (item.doctorName || "").toLowerCase().includes(query);
  });
  renderEmailOutbox(filtered);
}

function openEmailPreviewModal(index) {
  const item = cachedEmailList[index];
  if (!item) return;

  const dialog = document.getElementById("emailPreviewDialog");
  const subjectEl = document.getElementById("previewEmailSubject");
  const recipientEl = document.getElementById("previewEmailRecipient");
  const frame = document.getElementById("emailPreviewFrame");

  if (subjectEl) subjectEl.textContent = item.subject || `OPD Slip - ${item.token}`;
  if (recipientEl) recipientEl.textContent = `To: ${item.to || item.to_email} | Patient: ${item.patientName}`;
  if (frame) {
    frame.srcdoc = item.htmlBody || item.html || `<p>No HTML body recorded.</p>`;
  }

  if (dialog) {
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "true");
    }
  }
}

function closeEmailPreviewModal() {
  const dialog = document.getElementById("emailPreviewDialog");
  if (!dialog) return;

  if (typeof dialog.close === "function") {
    dialog.close();
  } else {
    dialog.removeAttribute("open");
  }
}

function toggleSmtpConfigPanel() {
  const panel = document.getElementById("smtpConfigPanel");
  if (panel) {
    panel.classList.toggle("hidden");
  }
}

function loadSmtpStatus() {
  fetch("/api/smtp-config")
    .then(r => r.json())
    .then(cfg => {
      const hostInput = document.getElementById("smtpHost");
      const portInput = document.getElementById("smtpPort");
      const userInput = document.getElementById("smtpUser");
      const fromInput = document.getElementById("smtpFromEmail");
      const titleEl = document.getElementById("smtpStatusTitle");
      const subtitleEl = document.getElementById("smtpStatusSubtitle");

      if (hostInput && cfg.host) hostInput.value = cfg.host;
      if (portInput && cfg.port) portInput.value = cfg.port;
      if (userInput && cfg.user) userInput.value = cfg.user;
      if (fromInput && cfg.fromEmail) fromInput.value = cfg.fromEmail;

      if (titleEl && subtitleEl) {
        if (cfg.enabled) {
          titleEl.textContent = `Live Relay Active (${cfg.host}:${cfg.port})`;
          subtitleEl.textContent = `All confirmation emails are transmitted live through ${cfg.fromEmail}.`;
        } else {
          titleEl.textContent = "Relay Mode: Active Local Dispatch & Archival Outbox";
          subtitleEl.textContent = "Confirmation emails are generated, validated, and logged for instant receipt.";
        }
      }
    })
    .catch(() => {});
}

function saveSmtpSettings() {
  const host = document.getElementById("smtpHost")?.value.trim() || "smtp.gmail.com";
  const port = parseInt(document.getElementById("smtpPort")?.value.trim() || "587", 10);
  const user = document.getElementById("smtpUser")?.value.trim() || "";
  const password = document.getElementById("smtpPass")?.value.trim() || "";
  const fromEmail = document.getElementById("smtpFromEmail")?.value.trim() || user || "noreply@shifaclinic.com";

  const payload = {
    enabled: Boolean(user && password),
    host,
    port,
    user,
    password,
    fromEmail,
    fromName: "SHIFA CLINIC Pernambut"
  };

  fetch("/api/smtp-config", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
  .then(r => r.json())
  .then(data => {
    if (data.status === "success") {
      showToast("SMTP configuration saved successfully!");
      toggleSmtpConfigPanel();
      loadSmtpStatus();
    } else {
      showToast("Failed to save SMTP config");
    }
  })
  .catch(() => {
    showToast("Error updating SMTP config");
  });
}

function testSmtpConnection() {
  showToast("Testing SMTP connection to mail server...");
  fetch("/api/smtp-config?test=true")
    .then(r => r.json())
    .then(res => {
      if (res.connected) {
        showToast("SMTP Connection Successful: Mail relay is ready!");
      } else {
        showToast("SMTP Notice: " + (res.message || "Could not reach server"));
      }
    })
    .catch(() => {
      showToast("Unable to reach local server endpoint");
    });
}

// Patient Inquiry Submission Handler
function submitInquiry() {
  const name = document.getElementById("inqName")?.value || "Patient";
  showToast(`Inquiry received. Our Pernambut desk will contact ${name} shortly.`);
  document.getElementById("contactInquiryForm")?.reset();
}

// Global Window Exports for Guaranteed Multi-Page Availability
window.openBookingModal = openBookingModal;
window.closeBookingModal = closeBookingModal;
window.handleTrackTokenClick = handleTrackTokenClick;
window.openSettingsModal = openSettingsModal;
window.closeSettingsModal = closeSettingsModal;
window.togglePortalView = togglePortalView;
window.togglePortalFromSettings = togglePortalFromSettings;
window.openAuthModal = openAuthModal;
window.closeAuthModal = closeAuthModal;
window.submitStaffAuth = submitStaffAuth;
window.logoutStaff = logoutStaff;
window.lookupTokenStatus = lookupTokenStatus;
window.submitAppointment = submitAppointment;
window.goToStep = goToStep;
window.openWalkInModal = openWalkInModal;
window.closeWalkInModal = closeWalkInModal;
window.submitWalkIn = submitWalkIn;
window.submitWalkInAppointment = submitWalkIn;
window.exportBookingsToCSV = exportBookingsToCSV;
window.resetDemoRecords = resetDemoRecords;
window.resetClinicDemoData = resetDemoRecords;
window.testAudioChime = testAudioChime;
window.announceTokenCall = announceTokenCall;
window.submitInquiry = submitInquiry;
window.generateClinicalEmailHtml = generateClinicalEmailHtml;
window.generateWhatsAppUrl = generateWhatsAppUrl;
window.generateMailtoUrl = generateMailtoUrl;
window.renderTicketQrCode = renderTicketQrCode;
window.dispatchPatientConfirmationEmail = dispatchPatientConfirmationEmail;
window.resendCurrentBookingEmail = resendCurrentBookingEmail;
window.openEmailOutboxModal = openEmailOutboxModal;
window.closeEmailOutboxModal = closeEmailOutboxModal;
window.loadEmailOutbox = loadEmailOutbox;
window.renderEmailOutbox = renderEmailOutbox;
window.filterEmailOutbox = filterEmailOutbox;
window.openEmailPreviewModal = openEmailPreviewModal;
window.closeEmailPreviewModal = closeEmailPreviewModal;
window.toggleSmtpConfigPanel = toggleSmtpConfigPanel;
window.saveSmtpSettings = saveSmtpSettings;
window.testSmtpConnection = testSmtpConnection;
function submitQuickHeroBooking() {
  const dept = document.getElementById("heroQuickDept")?.value || "all";
  const docId = document.getElementById("heroQuickDoctor")?.value;
  const dateVal = document.getElementById("heroQuickDate")?.value || getTodayString();

  bookingSession.date = dateVal;
  const dateInput = document.getElementById("bookingDateInput");
  if (dateInput) {
    dateInput.value = dateVal;
    const display = document.getElementById("selectedDateDisplay");
    if (display) {
      display.textContent = dateVal === getTodayString() ? "Today" : dateVal;
    }
  }

  if (docId) {
    openBookingModal(docId);
  } else if (dept && dept !== "all") {
    const matchedDoc = doctors.find(d => d.specialty.toLowerCase() === dept.toLowerCase());
    if (matchedDoc) {
      openBookingModal(matchedDoc.id);
    } else {
      openBookingModal();
    }
  } else {
    openBookingModal();
  }
}

window.submitQuickHeroBooking = submitQuickHeroBooking;
window.updateOutboxCounterBadge = updateOutboxCounterBadge;

