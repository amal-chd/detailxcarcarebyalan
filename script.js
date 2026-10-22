/* Add real business contact details below to activate the WhatsApp and call links. */
const DETAILX_CONTACT = {
  whatsapp: "", // Example format: 15551234567 (country code + number, digits only)
  phone: "", // Example format: +1 555 123 4567
};

const menuToggle = document.querySelector(".menu-toggle");
const primaryNavigation = document.querySelector("#primary-navigation");
const navigationLinks = primaryNavigation ? primaryNavigation.querySelectorAll("a") : [];

function closeMenu({ returnFocus = false } = {}) {
  if (!menuToggle || !primaryNavigation) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  primaryNavigation.classList.remove("is-open");
  document.body.classList.remove("menu-open");
  if (returnFocus) menuToggle.focus();
}

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  primaryNavigation?.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
  if (!isOpen) primaryNavigation?.querySelector("a")?.focus();
});

navigationLinks.forEach((link) => link.addEventListener("click", () => closeMenu()));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle?.getAttribute("aria-expanded") === "true") {
    closeMenu({ returnFocus: true });
  }
});
window.addEventListener("resize", () => {
  if (window.innerWidth > 680) closeMenu();
});

const feedback = document.querySelector("#site-feedback");
let feedbackTimer;

function showFeedback(message) {
  if (!feedback) return;
  feedback.textContent = message;
  feedback.hidden = false;
  window.clearTimeout(feedbackTimer);
  feedbackTimer = window.setTimeout(() => {
    feedback.hidden = true;
  }, 6500);
}

document.querySelectorAll("[data-contact-action]").forEach((link) => {
  link.addEventListener("click", (event) => {
    const action = link.dataset.contactAction;
    if (action === "whatsapp") {
      const digits = DETAILX_CONTACT.whatsapp.replace(/\D/g, "");
      if (digits.length >= 7) {
        event.preventDefault();
        const message = encodeURIComponent("Hi DetailX Car Care, I’d like to enquire about a detail.");
        window.location.assign(`https://wa.me/${digits}?text=${message}`);
        return;
      }
      showFeedback("WhatsApp booking is ready to connect. Add the studio’s real WhatsApp number in script.js to activate this link.");
    }

    if (action === "call") {
      const phone = DETAILX_CONTACT.phone.trim();
      if (phone.replace(/\D/g, "").length >= 7) {
        event.preventDefault();
        window.location.href = `tel:${phone.replace(/[^\d+]/g, "")}`;
        return;
      }
      showFeedback("Call booking is ready to connect. Add the studio’s real phone number in script.js to activate this link.");
    }
  });
});

const serviceSelect = document.querySelector("#service-interest");
document.querySelectorAll("[data-service-choice]").forEach((link) => {
  link.addEventListener("click", () => {
    const serviceName = link.dataset.serviceChoice;
    if (serviceSelect && Array.from(serviceSelect.options).some((option) => option.value === serviceName)) {
      serviceSelect.value = serviceName;
    }
  });
});

const enquiryForm = document.querySelector("#enquiry-form");
const successMessage = document.querySelector("#form-success");
const errorSummary = document.querySelector("#form-error-summary");
const formFields = [
  { input: document.querySelector("#customer-name"), error: document.querySelector("#name-error") },
  { input: document.querySelector("#customer-phone"), error: document.querySelector("#phone-error") },
  { input: document.querySelector("#customer-email"), error: document.querySelector("#email-error") },
  { input: document.querySelector("#service-interest"), error: document.querySelector("#service-error") },
].filter(({ input, error }) => input && error);

function validationMessage(input) {
  if (input.validity.valueMissing) return "Please complete this required field.";
  if (input.validity.tooShort) return `Please enter at least ${input.minLength} characters.`;
  if (input.validity.typeMismatch) return "Please enter a valid email address.";
  if (input.validity.patternMismatch) return "Please enter a valid phone number with at least 7 digits.";
  if (input.name === "name" && input.value.trim().length < 2) return "Please enter your name.";
  if (input.name === "phone" && input.value.replace(/\D/g, "").length < 7) return "Please enter a phone number with at least 7 digits.";
  return "";
}

function validateField({ input, error }) {
  const message = validationMessage(input);
  error.textContent = message;
  if (message) {
    input.setAttribute("aria-invalid", "true");
    const describedBy = new Set((input.getAttribute("aria-describedby") || "").split(/\s+/).filter(Boolean));
    describedBy.add(error.id);
    input.setAttribute("aria-describedby", Array.from(describedBy).join(" "));
  } else {
    input.removeAttribute("aria-invalid");
    const describedBy = (input.getAttribute("aria-describedby") || "").split(/\s+/).filter((id) => id && id !== error.id);
    if (describedBy.length) input.setAttribute("aria-describedby", describedBy.join(" "));
    else input.removeAttribute("aria-describedby");
  }
  return !message;
}

formFields.forEach(({ input, error }) => {
  input.addEventListener("input", () => {
    if (enquiryForm?.dataset.attempted === "true") validateField({ input, error });
  });
  input.addEventListener("change", () => {
    if (enquiryForm?.dataset.attempted === "true") validateField({ input, error });
  });
});

enquiryForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  enquiryForm.dataset.attempted = "true";
  const isValid = formFields.map(validateField).every(Boolean);
  if (!isValid) {
    if (errorSummary) errorSummary.hidden = false;
    formFields.find(({ input }) => input.getAttribute("aria-invalid") === "true")?.input.focus();
    successMessage.hidden = true;
    return;
  }

  if (errorSummary) errorSummary.hidden = true;
  const customerName = document.querySelector("#customer-name").value.trim();
  successMessage.textContent = `Thanks, ${customerName}. Your enquiry details are valid. This preview does not send or store submissions; connect a form service before launch so DetailX can receive them.`;
  successMessage.hidden = false;
  successMessage.focus?.();
});

const dateField = document.querySelector("#preferred-date");
if (dateField) {
  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
  dateField.min = localDate;
}

const currentYear = document.querySelector("#current-year");
if (currentYear) currentYear.textContent = String(new Date().getFullYear());
