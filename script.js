var formData = {
    name: "",
    dob: "",
    gender: "",
    email: "",
    phone: "",
    address: ""
};
var currentStep = 1;
var steps = document.querySelectorAll(".form-step");
var nextBtn = document.getElementById("next");
var backBtn = document.getElementById("back");
var submitBtn = document.getElementById("submit");
var stepNum = document.getElementById("step-num");
// Load saved data from localStorage
var savedData = localStorage.getItem("formData");
if (savedData) {
    formData = JSON.parse(savedData);
    populateForm();
}
function populateForm() {
    document.getElementById("name").value = formData.name;
    document.getElementById("dob").value = formData.dob;
    document.getElementById("gender").value = formData.gender;
    document.getElementById("email").value = formData.email;
    document.getElementById("phone").value = formData.phone;
    document.getElementById("address").value = formData.address;
}
function updateButtons() {
    backBtn.style.display = currentStep === 1 ? "none" : "inline-block";
    nextBtn.style.display = currentStep === 3 ? "none" : "inline-block";
    submitBtn.style.display = currentStep === 3 ? "inline-block" : "none";
    stepNum.textContent = currentStep.toString();
}
function showError(id, message) {
    var errorElement = document.getElementById("".concat(id, "-error"));
    errorElement.textContent = message;
}
function clearErrors() {
    document.querySelectorAll(".error").forEach(function (el) { return (el.textContent = ""); });
}
function validateStep(step) {
    clearErrors();
    var isValid = true;
    if (step === 1) {
        formData.name = document.getElementById("name").value;
        formData.dob = document.getElementById("dob").value;
        formData.gender = document.getElementById("gender").value;
        if (!formData.name) {
            showError("name", "Name is required");
            isValid = false;
        }
        if (!formData.dob) {
            showError("dob", "Date of Birth is required");
            isValid = false;
        }
        if (!formData.gender) {
            showError("gender", "Gender is required");
            isValid = false;
        }
    }
    else if (step === 2) {
        formData.email = document.getElementById("email").value;
        formData.phone = document.getElementById("phone").value;
        formData.address = document.getElementById("address").value;
        if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
            showError("email", "Valid email is required");
            isValid = false;
        }
        if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
            showError("phone", "Valid 10-digit phone number is required");
            isValid = false;
        }
        if (!formData.address) {
            showError("address", "Address is required");
            isValid = false;
        }
    }
    if (isValid)
        localStorage.setItem("formData", JSON.stringify(formData));
    return isValid;
}
function renderSummary() {
    var summary = document.getElementById("summary");
    summary.innerHTML = "\n      <p>Name: ".concat(formData.name, " <button onclick=\"editStep(1)\">Edit</button></p>\n      <p>DOB: ").concat(formData.dob, "</p>\n      <p>Gender: ").concat(formData.gender, "</p>\n      <p>Email: ").concat(formData.email, " <button onclick=\"editStep(2)\">Edit</button></p>\n      <p>Phone: ").concat(formData.phone, "</p>\n      <p>Address: ").concat(formData.address, "</p>\n    ");
}
nextBtn.addEventListener("click", function () {
    if (validateStep(currentStep)) {
        steps[currentStep - 1].style.display = "none";
        currentStep++;
        steps[currentStep - 1].style.display = "block";
        if (currentStep === 3)
            renderSummary();
        updateButtons();
    }
});
backBtn.addEventListener("click", function () {
    steps[currentStep - 1].style.display = "none";
    currentStep--;
    steps[currentStep - 1].style.display = "block";
    updateButtons();
});
submitBtn.addEventListener("click", function () {
    alert("Form submitted successfully!");
    localStorage.removeItem("formData");
});
function editStep(step) {
    steps[currentStep - 1].style.display = "none";
    currentStep = step;
    steps[currentStep - 1].style.display = "block";
    populateForm();
    updateButtons();
}
updateButtons();
