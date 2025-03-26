// Author Name: Noah Hamblen
// File Name: main.js

// Enables strict mode to catch common coding mistakes and prevent the use of potentially unsafe features.
"use strict";

// Get the hamburger elements
const hamburger_button = document.querySelector(".ham_menu"); // The hamburger button
const menu = document.querySelector(".off_screen_menu"); // The hamburger menu
const overlay = document.querySelector(".overlay"); // The overlay

// Toggle the hamburger menu
hamburger_button.addEventListener("click", (event) => {
  event.stopPropagation(); // Prevent the click from bubbling up
  menu.classList.toggle("active"); // Toggle the menu open/close class
  overlay.classList.toggle("active"); // Show/hide the overlay
  hamburger_button.classList.toggle("active"); // Toggle hamburger button animation
});

// Close the hamburger menu if clicked on the overlay
overlay.addEventListener("click", () => {
  menu.classList.remove("active");
  overlay.classList.remove("active");
  hamburger_button.classList.remove("active"); // Reset the hamburger animation
});

// Updates the year for footer
document.getElementById("year").textContent = new Date().getFullYear();

//
// JavaScript for index.html (show more button)
//

const showMoreButton = document.getElementById("show_more_button");
const aboutImage = document.getElementById("about_img");
const aboutText = document.getElementById("about_txt");

if (showMoreButton && aboutImage && aboutText) {
  window.onload = function () {
    let isExpanded = false; // Track whether the additional details are shown

    // Calculate age dynamically based on birthdate
    const birthDate = new Date(1998, 7, 4); // August 4, 1998 (Month is 0-indexed: 7 = August)
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    // Check if the birthday has not occurred yet this year
    const hasBirthdayPassed =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() >= birthDate.getDate());
    if (!hasBirthdayPassed) {
      age--; // Subtract 1 if the birthday hasn't occurred yet this year
    }

    showMoreButton.addEventListener("click", function () {
      // Trigger fade-out
      aboutImage.classList.add("hidden");
      aboutText.classList.add("hidden");

      setTimeout(() => {
        if (!isExpanded) {
          // Expand the content
          aboutImage.src = "assets/img/noah_casual.jpg";
          aboutImage.alt = "A picture of Noah Hamblen and his dog Pancake";
          aboutText.innerHTML = `
            Hi, my name is Noah 😊. I appreciate you taking the time to visit my website! I’m ${age} years old, I was born and
            raised in Omaha, Nebraska, and I’ve lived here my whole life.
            <br><br>
            In my free time, you'll find me going on runs, reading, or playing video games. I enjoy a lot of games,
            but a childhood favorite of mine is World of Warcraft.
            <br><br>
            My passion for technology began as a young lad with my own PC and a gaming hobby, eventually
            evolving into IT and web development. I have my grandpa to thank for that, as
            he would often give my brother and I a new gaming console, or an old Windows 98 PC to use.
            This sparked a deeper interest in problem-solving.
            <br><br>
            Feel free to explore my website and reach out—I’d love to connect!
          `;
          showMoreButton.textContent = "See Professional Life";
        } else {
          // Collapse the content
          aboutImage.src = "assets/img/noah_about.jpg";
          aboutImage.alt = "A professional picture of Noah Hamblen";
          aboutText.innerHTML = `
            Hi, my name is Noah, and I want to thank you for visiting my website. I'm a passionate IT professional and web developer,
            currently studying at Bellevue University.
            <br><br>
            In my free time, you'll find me constantly exploring ways to improve both personally and professionally. Whether
            it's advancing my education, or earning new certifications, I'm looking for
            opportunities to expand my knowledge and sharpen my skills.
            <br><br>
            Feel free to explore my website, and don’t hesitate to reach out—I’d be happy to
            connect and discuss opportunities.
          `;
          showMoreButton.textContent = "See Personal Life";
        }

        // Toggle the state
        isExpanded = !isExpanded;

        // Force reflow to restart the animation
        void aboutImage.offsetWidth;
        void aboutText.offsetWidth;

        // Reapply the fade-in effect
        aboutImage.classList.add("visible");
        aboutText.classList.add("visible");
      }, 600); // Match the duration of the fade-out animation

      setTimeout(() => {
        aboutImage.classList.remove("hidden", "visible");
        aboutText.classList.remove("hidden", "visible");
      }, 1000); // Delay before removing both classes "visible" and "hidden"
    });
  };
}

//
// JavaScript for contact.html (manipulating form)
//

// Ensure the elements exist before adding event listeners
const modal = document.getElementById("thank_you_modal");
const closeModalBtn = document.getElementById("close_modal");
const form = document.getElementById("contact_form");

if (form && modal && closeModalBtn) {
  // Show the modal after form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Send form data using Fetch API
    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
    })
      .then((response) => {
        if (response.ok) {
          modal.style.display = "flex"; // Show modal
          form.reset(); // Clear form fields
        } else {
          alert(
            "There was an issue sending your message. Please try again later."
          );
        }
      })
      .catch(() => {
        modal.style.display = "flex"; // Show modal even if there’s an error
        form.reset();
      });
  });

  // Close the modal when the close button is clicked
  closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none"; // Hide modal
  });

  // Close the modal if the user clicks outside the modal content
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}

//
// JavaScript for resume.html (manipulating resume)
//

// Get button and iframe elements
const button = document.getElementById("toggle_resume");
const resumeFrame = document.getElementById("resume");
const current = document.getElementById("current");

if (button && resumeFrame) {
  window.onload = function () {
    let isWebDevResume = true; // Tracks the current resume state

    // Add event listener for the button click
    button.addEventListener("click", function () {
      if (isWebDevResume) {
        resumeFrame.src = "../pdf/noah_hamblen_portfolio_resume2.pdf"; // IT Resume
        button.textContent = "View IT Resume";
        button.classList.remove("expanded"); // Toggle the expanded class for button
      } else {
        resumeFrame.src = "../pdf/noah_hamblen_portfolio_resume1.pdf"; // Web Dev Resume
        button.textContent = "View Web Development Resume";
        button.classList.toggle("expanded"); // Remove the expanded class for button
      }

      isWebDevResume = !isWebDevResume; // Toggle state
    });
  };
}

//
// JavaScript for projects.html (sorting projects)
//

const sortDropdown = document.getElementById("sort_projects");

if (sortDropdown) {
  window.onload = function () {
    const projectsGrid = document.querySelector(".projects_grid");
    const projectItems = Array.from(
      projectsGrid.querySelectorAll(".project_item")
    );

    if (sortDropdown && projectsGrid && projectItems) {
      sortDropdown.addEventListener("change", function () {
        sortProjects(sortDropdown.value);
      });

      function sortProjects(order) {
        const sortedItems = projectItems.sort((a, b) => {
          const dateA = new Date(a.getAttribute("data-date"));
          const dateB = new Date(b.getAttribute("data-date"));
          return order === "new" ? dateB - dateA : dateA - dateB;
        });

        projectsGrid.innerHTML = "";
        sortedItems.forEach((item) => projectsGrid.appendChild(item));
      }
    }
  };
}
