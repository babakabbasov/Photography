// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  let currentSlide = 0;
  let sliderTextStatus = true;
  const fst_text = document.querySelector(".fst-text");
  const snd_text = document.querySelector(".snd-text");
  const trd_text = document.querySelector(".trd-text");
  const dots_container = document.querySelector(".dots");
  function triggerSlideText(time) {
    let sliderTextOpacity = 1;
    let sliderTextTranslateX = "translateX(0)";
    if (!sliderTextStatus) {
      sliderTextOpacity = 0;
      sliderTextTranslateX = "translateX(200px)";
    }
    sliderTextStatus = !sliderTextStatus;
    setTimeout(() => {
      fst_text.style.opacity = sliderTextOpacity;
      fst_text.style.transform = sliderTextTranslateX;
      snd_text.style.opacity = sliderTextOpacity;
      snd_text.style.transform = sliderTextTranslateX;
      trd_text.style.opacity = sliderTextOpacity;
      trd_text.style.transform = sliderTextTranslateX;
    }, time); // Delay for smooth transition
  }

  const updateSlideNumber = () => {
    dots_container.style.setProperty(
      "--slide-number",
      `"0${currentSlide + 1}"`
    );
  };

  function changeSlide(direction) {
    const slides = document.querySelectorAll(".slide");

    const dots = document.querySelectorAll(".dots span");

    slides[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");

    currentSlide = (currentSlide + direction + slides.length) % slides.length;

    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
    triggerSlideText(200);
    triggerSlideText(3500);

    updateSlideNumber();
  }
  triggerSlideText(200);
  triggerSlideText(3500);
  setInterval(() => {
    changeSlide(1);
    //slideText.style.opacity = 1;
    //slideText.style.transform = "translateX(0)";
  }, 5000);

  function goToSlide(index) {
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dots span");
    slides[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");

    currentSlide = index;

    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
  }
  /*
  function updateSlideTextCSS(activeIndex) {
    opacity: 1;
    transform:;
    // Apply new styles based on the active slide
    switch (activeIndex) {
      case 0:
        slideText.style.opacity = 1;
        slideText.style.transform = "translateX(0)";
        break;
    }
  }

  function setActiveSlide(newIndex) {
    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === newIndex);
    });
    updateSlideTextCSS(newIndex);
  }

  let currentIndex1 = 0;
  */
  /*
  // Add click events for dots (if you have them)
  const dots = document.querySelectorAll(".dots span");
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex1 = index;
      setActiveSlide(currentIndex1);

      dots.forEach((dot) => dot.classList.remove("active"));
      dot.classList.add("active");
    });
  });
*/
  // Optional: Auto-slide logic
  /*setInterval(() => {
    currentIndex1 = (currentIndex1 + 1) % slides.length;
    setActiveSlide(currentIndex1);

    dots.forEach((dot) => dot.classList.remove("active"));
    dots[currentIndex1].classList.add("active");
  }, 5000); // Change slide every 5 seconds*/

  // Initialize the first dot as active
  document.querySelectorAll(".dots span")[0].classList.add("active");
  // let currentIndex = 0;
  // const slides = document.querySelectorAll(".slide");
  // const totalSlides = slides.length;
  // const dots = document.querySelectorAll(".dots span");
  // const slider = document.querySelector(".slides");

  // // Change Slide
  // function changeSlide(direction) {
  //   currentIndex += direction;

  //   if (currentIndex < 0) {
  //     currentIndex = totalSlides - 1;
  //   } else if (currentIndex >= totalSlides) {
  //     currentIndex = 0;
  //   }

  //   updateSlider();
  // }

  // // Go to Specific Slide
  // function goToSlide(index) {
  //   currentIndex = index;
  //   updateSlider();
  // }

  // // Update Slider View
  // function updateSlider() {
  //   slider.style.transform = `translateX(-${currentIndex * 100}%)`;

  //   // Update Active Dot
  //   dots.forEach((dot, index) => {
  //     dot.classList.toggle("active", index === currentIndex);
  //   });
  // }

  // // Auto Slide
  // setInterval(() => changeSlide(1), 5000);

  // // Initialize Slider
  // updateSlider();

  // // Expose functions globally for buttons to work
  // window.changeSlide = changeSlide;
  // window.goToSlide = goToSlide;

  // const header = document.querySelector(".header");

  // window.addEventListener("scroll", () => {
  //   if (window.scrollY > 50) {
  //     header.classList.add("scrolled");
  //   } else {
  //     header.classList.remove("scrolled");
  //   }
  // });
});
