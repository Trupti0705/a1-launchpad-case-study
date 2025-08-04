// FORM SUBMISSION VALIDATION
const form = document.querySelector("#repair-form");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.elements["name"].value.trim();
    const contact = form.elements["contact"].value.trim();
    const issue = form.elements["issue"].value.trim();

    if (!name || !contact || !issue) {
      alert("Please fill in all fields.");
      return;
    }

    const request = {
      name,
      issue,
      date: new Date().toLocaleDateString()
    };

    localStorage.setItem("repairRequest", JSON.stringify(request));
    form.reset();

    // Show confirmation modal instead of alert
    const modal = document.getElementById("confirmationModal");
    if (modal) {
      modal.style.display = "flex";
    }
  });
}

// RECENT REQUEST DISPLAY
window.addEventListener("DOMContentLoaded", () => {
  const saved = JSON.parse(localStorage.getItem("repairRequest"));
  const display = document.getElementById("recent-request");

  if (saved && display) {
    display.innerText = `${saved.name} reported "${saved.issue}" on ${saved.date}`;
  }
});

// FAQ TOGGLE
document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    item.addEventListener("click", () => {
      item.classList.toggle("open");
    });
  });
});

// STATUS FILTER
const statusFilter = document.getElementById("statusFilter");

statusFilter?.addEventListener("change", function () {
  const selected = this.value;
  const rows = document.querySelectorAll("table tbody tr");

  rows.forEach((row) => {
    const status = row.cells[6].innerText; // 7th column = Status
    if (selected === "All" || status === selected) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
});

// COUNTING STATS
window.addEventListener("DOMContentLoaded", () => {
  const rows = document.querySelectorAll("table tbody tr");
  let total = rows.length;
  let inProgress = 0;
  let completed = 0;

  rows.forEach((row) => {
    const status = row.cells[6].innerText;
    if (status === "In Progress") inProgress++;
    if (status === "Completed") completed++;
  });

  document.getElementById("totalCount").innerText = `Total Requests: ${total}`;
  document.getElementById("inProgressCount").innerText = `In Progress: ${inProgress}`;
  document.getElementById("completedCount").innerText = `Completed: ${completed}`;
});

// MODAL CLOSE FUNCTIONALITY
const closeModalBtn = document.getElementById("closeModalBtn");
if (closeModalBtn) {
  closeModalBtn.addEventListener("click", () => {
    const modal = document.getElementById("confirmationModal");
    if (modal) {
      modal.style.display = "none";
    }
  });
}

// ADVANCED FAQ TOGGLE
document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      // Close all other answers
      faqItems.forEach((el) => {
        if (el !== item) el.classList.remove('open');
      });

      // Toggle current
      item.classList.toggle('open');
    });
  });
});






