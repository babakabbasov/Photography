// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  let serviceIndex = 0;
  const serviceContainer = document.querySelector(".services");
  const track = document.querySelector(".service-track");
  const services = document.querySelectorAll(".service-cover");
  const totalServices = services.length;
  let offset = 0;

  // Configuration
  let servicesPerView = 4;
  let serviceCoverWidth = 330;
  let serviceContainerWidth = serviceContainer.clientWidth;
  // Minimum and Maximum Width Constraints
  const minServiceWidth = 330;

  // Adjust `servicesPerView` dynamically based on container width
  function adjustServicesPerView() {
    serviceContainerWidth = serviceContainer.clientWidth;
    servicesPerView = Math.floor(serviceContainerWidth / minServiceWidth);
    servicesPerView = Math.max(1, servicesPerView); // Ensure at least one service is visible
  }

  // Function to Calculate and Set Service Widths
  function setServiceWidths() {
    adjustServicesPerView();
    serviceCoverWidth = serviceContainerWidth / servicesPerView; // Calculated width
    // Apply width and margin-right to services
    services.forEach((service, index) => {
      service.style.width = `${serviceCoverWidth}px`;
    });

    updateServices();
  }

  // Function to Change Services
  function changeService(direction) {
    serviceIndex += direction;

    if (serviceIndex < 0) {
      serviceIndex = totalServices - servicesPerView;
    } else if (serviceIndex > totalServices - servicesPerView) {
      serviceIndex = 0;
    }

    updateServices();
  }

  // Function to Update the Track Position
  function updateServices() {
    const serviceCoverWidth = services[0].clientWidth;
    const borderWidth =
      parseFloat(getComputedStyle(services[0]).borderLeftWidth) * 2 || 0;
    offset = -serviceIndex * (serviceCoverWidth + borderWidth);
    track.style.transform = `translateX(${offset}px)`;
  }

  // Event Listeners for Navigation Buttons

  document.getElementById("next-service").addEventListener("click", () => {
    changeService(1);
  });

  document.getElementById("prev-service").addEventListener("click", () => {
    changeService(-1);
  });

  // Debounce function to optimize resize event
  function debounce(func, delay) {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(func, delay);
    };
  }

  // Auto-Slide (Optional)
  setInterval(() => {
    if (!keepMoving) return;
    changeService(1);
  }, 4000);

  // Adjust on Window Resize (with debounce for performance)
  window.addEventListener(
    "resize",
    debounce(() => {
      adjustServicesPerView();
      setServiceWidths();
    }, 200)
  );

  adjustServicesPerView();
  setServiceWidths();

  // Dragging Logic
  let isDragging = false;
  let startX = 0;
  let hasDragged = false;
  let deltaX = 0;
  let keepMoving = true;

  // Mouse Down
  track.addEventListener("mousedown", (e) => {
    if (e.target.tagName === "A") {
      e.preventDefault(); // Prevent default link behavior
    }
    isDragging = true;
    hasDragged = false; // Reset flag
    startX = e.clientX;
    track.style.transition = "none";
    document.body.style.userSelect = "none"; // Prevent text selection
  });

  track.addEventListener("mouseover", () => {
    keepMoving = false;
  });
  track.addEventListener("mouseout", () => {
    keepMoving = true;
  });

  // Mouse Move
  track.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    deltaX = e.clientX - startX;
    if (Math.abs(deltaX) > 5) {
      hasDragged = true; // Significant movement detected
    }
    track.style.transform = `translateX(${offset + deltaX}px)`;
  });

  // Mouse Up
  track.addEventListener("mouseup", (e) => {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = "transform 0.3s ease-in-out";
    document.body.style.userSelect = ""; // Restore text selection
    const direction = Math.round(deltaX / -serviceCoverWidth);
    changeService(direction);
  });

  // Click Event on `<a>` Tags
  track.addEventListener("click", (e) => {
    if (hasDragged && e.target.tagName === "A") {
      e.preventDefault(); // Prevent click after drag
      e.stopPropagation();
    }
  });

  track.addEventListener("mouseleave", () => {
    track.style.transition = "transform 0.3s ease-in-out";
    document.body.style.userSelect = "";
    updateServices();
  });
});
