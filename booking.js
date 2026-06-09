function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function formatDate(dateStr) {
  const d=new Date(dateStr);
  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function showToast(message, type="success") {
  const existing=document.getElementById("salon-toast");
  if (existing) existing.remove();

  const toast=document.createElement("div");
  toast.id="salon-toast";
  toast.innerHTML=message;
  Object.assign(toast.style, {
    position: "fixed",
    bottom: "30px",
    left: "50%",
    transform: "translateX(-50%) translateY(20px)",
    background: type==="success" ? "#3d2b2b" : "#7a2d2d",
    color: "#f5e9e9",
    padding: "16px 28px",
    borderRadius: "12px",
    fontSize: "15px",
    lineHeight: "1.5",
    maxWidth: "420px",
    textAlign: "center",
    boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
    zIndex: "9999",
    opacity: "0",
    transition: "all 0.4s ease",
    border: "1px solid rgba(255,200,180,0.2)",
  });

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) translateY(0)";
  });

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-50%) translateY(20px)";
    setTimeout(() => toast.remove(), 400);
  }, 5000);
}

function booking() {
  const firstName=document.querySelector('input[placeholder="Manel"]');
  const lastName=document.querySelector('input[placeholder="Njeh"]');
  const phone=document.querySelector('input[type="tel"]');
  const email=document.querySelector('input[type="email"]');
  const selects=document.querySelectorAll(".appt-select");
  const service=selects[0];
  const date=document.querySelector('input[type="date"]');
  const timeSelect=selects[1];

  if (!firstName.value.trim() || !lastName.value.trim()) {
    showToast(" Please enter your full name.", "error");
    return false;
  }
  if (!phone.value.trim()) {
    showToast("Please enter your phone number.", "error");
    return false;
  }
  if (!email.value.trim() || !isValidEmail(email.value)) {
    showToast(" Please enter a valid email address.", "error");
    return false;
  }
  if (!service.value) {
    showToast(" Please select a service.", "error");
    return false;
  }
  if (!date.value) {
    showToast(" Please choose a preferred date.", "error");
    return false;
  }

  const selectedDate=new Date(date.value);
  const today=new Date();
  today.setHours(0, 0, 0, 0);
  if (selectedDate < today) {
    showToast(" Please select a future date.", "error");
    return false;
  }

  if (!timeSelect.value) {
    showToast(" Please select a preferred time.", "error");
    return false;
  }

  showToast(
    ` Thank you, ${firstName.value.trim()}! Your appointment for <strong>${service.value}</strong> on <strong>${formatDate(date.value)}</strong> at <strong>${timeSelect.value}</strong> has been requested. We'll confirm shortly.`,
    "success"
  );

  setTimeout(() => document.querySelector("form").reset(), 3000);
  return false;
}

function contact() {
  const name=document.getElementById("name");
  const email=document.getElementById("email");
  const message=document.getElementById("message");

  if (!name.value.trim()) {
    showToast(" Please enter your name.", "error");
    return false;
  }
  if (!email.value.trim() || !isValidEmail(email.value)) {
    showToast(" Please enter a valid email address.", "error");
    return false;
  }
  if (!message.value.trim() || message.value.trim().length < 10) {
    showToast(" Please enter a message (at least 10 characters).", "error");
    return false;
  }

  showToast(
    `Thank you, <strong>${name.value.trim()}</strong>! Your message has been sent. We'll get back to you at <strong>${email.value.trim()}</strong> as soon as possible. `,
    "success"
  );

  setTimeout(() => document.querySelector("form").reset(), 3000);
  return false;
}