interface UserFormData {
    name: string;
    dob: string;
    gender: string;
    email: string;
    phone: string;
    address: string;
  }
  
  let formData: UserFormData = {
    name: "",
    dob: "",
    gender: "",
    email: "",
    phone: "",
    address: ""
  };
  let currentStep: number = 1;
  
  const steps = document.querySelectorAll(".form-step") as NodeListOf<HTMLElement>;
  const nextBtn = document.getElementById("next") as HTMLButtonElement;
  const backBtn = document.getElementById("back") as HTMLButtonElement;
  const submitBtn = document.getElementById("submit") as HTMLButtonElement;
  const stepNum = document.getElementById("step-num") as HTMLSpanElement;
  
  // Load saved data from localStorage
  const savedData = localStorage.getItem("formData");
  if (savedData) {
    formData = JSON.parse(savedData);
    populateForm();
  }
  
  function populateForm(): void {
    (document.getElementById("name") as HTMLInputElement).value = formData.name;
    (document.getElementById("dob") as HTMLInputElement).value = formData.dob;
    (document.getElementById("gender") as HTMLSelectElement).value = formData.gender;
    (document.getElementById("email") as HTMLInputElement).value = formData.email;
    (document.getElementById("phone") as HTMLInputElement).value = formData.phone;
    (document.getElementById("address") as HTMLTextAreaElement).value = formData.address;
  }
  
  function updateButtons(): void {
    backBtn.style.display = currentStep === 1 ? "none" : "inline-block";
    nextBtn.style.display = currentStep === 3 ? "none" : "inline-block";
    submitBtn.style.display = currentStep === 3 ? "inline-block" : "none";
    stepNum.textContent = currentStep.toString();
  }
  
  function showError(id: string, message: string): void {
    const errorElement = document.getElementById(`${id}-error`) as HTMLElement;
    errorElement.textContent = message;
  }
  
  function clearErrors(): void {
    document.querySelectorAll(".error").forEach((el) => (el.textContent = ""));
  }
  
  function validateStep(step: number): boolean {
    clearErrors();
    let isValid = true;
  
    if (step === 1) {
      formData.name = (document.getElementById("name") as HTMLInputElement).value;
      formData.dob = (document.getElementById("dob") as HTMLInputElement).value;
      formData.gender = (document.getElementById("gender") as HTMLSelectElement).value;
  
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
    } else if (step === 2) {
      formData.email = (document.getElementById("email") as HTMLInputElement).value;
      formData.phone = (document.getElementById("phone") as HTMLInputElement).value;
      formData.address = (document.getElementById("address") as HTMLTextAreaElement).value;
  
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
  
    if (isValid) localStorage.setItem("formData", JSON.stringify(formData));
    return isValid;
  }
  
  function renderSummary(): void {
    const summary = document.getElementById("summary") as HTMLElement;
    summary.innerHTML = `
      <p>Name: ${formData.name} <button onclick="editStep(1)">Edit</button></p>
      <p>DOB: ${formData.dob}</p>
      <p>Gender: ${formData.gender}</p>
      <p>Email: ${formData.email} <button onclick="editStep(2)">Edit</button></p>
      <p>Phone: ${formData.phone}</p>
      <p>Address: ${formData.address}</p>
    `;
  }
  
  nextBtn.addEventListener("click", () => {
    if (validateStep(currentStep)) {
      steps[currentStep - 1].style.display = "none";
      currentStep++;
      steps[currentStep - 1].style.display = "block";
      if (currentStep === 3) renderSummary();
      updateButtons();
    }
  });
  
  backBtn.addEventListener("click", () => {
    steps[currentStep - 1].style.display = "none";
    currentStep--;
    steps[currentStep - 1].style.display = "block";
    updateButtons();
  });
  
  submitBtn.addEventListener("click", () => {
    alert("Form submitted successfully!");
    localStorage.removeItem("formData");
  });
  
  function editStep(step: number): void {
    steps[currentStep - 1].style.display = "none";
    currentStep = step;
    steps[currentStep - 1].style.display = "block";
    populateForm();
    updateButtons();
  }
  
  updateButtons();