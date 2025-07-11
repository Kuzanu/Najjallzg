// Toggle FAQ items
function toggleFaq(element) {
  const faqItem = element.parentElement
  const isActive = faqItem.classList.contains("active")

  // Close all FAQ items
  document.querySelectorAll(".faq-item").forEach((item) => {
    item.classList.remove("active")
  })

  // If the clicked item wasn't active, open it
  if (!isActive) {
    faqItem.classList.add("active")
  }
}

// Copy script to clipboard
function copyScript(button) {
  const codeElement = button.previousElementSibling
  const textToCopy = codeElement.textContent

  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      // Change button icon temporarily
      const originalIcon = button.innerHTML
      button.innerHTML = '<i class="fas fa-check"></i>'

      // Reset button after 2 seconds
      setTimeout(() => {
        button.innerHTML = originalIcon
      }, 2000)
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err)
    })
}

// Add electric spark effect
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".electric-container")

  // Create sparks on mouse move
  container.addEventListener("mousemove", (e) => {
    if (Math.random() > 0.97) {
      createSpark(e.clientX, e.clientY)
    }
  })

  // Create initial sparks
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const x = Math.random() * window.innerWidth
      const y = Math.random() * window.innerHeight
      createSpark(x, y)
    }, i * 300)
  }
})

// Create electric spark
function createSpark(x, y) {
  const spark = document.createElement("div")
  spark.className = "spark"
  spark.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background-color: #ff0000;
        box-shadow: 0 0 10px 2px rgba(255, 0, 0, 0.7);
        border-radius: 50%;
        z-index: 1;
        top: ${y}px;
        left: ${x}px;
        pointer-events: none;
    `

  document.body.appendChild(spark)

  // Animate the spark
  const angle = Math.random() * Math.PI * 2
  const distance = 50 + Math.random() * 100
  const duration = 500 + Math.random() * 1000

  spark.animate(
    [
      {
        transform: "scale(1)",
        opacity: 1,
      },
      {
        transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
        opacity: 0,
      },
    ],
    {
      duration: duration,
      easing: "cubic-bezier(0.1, 0.9, 0.2, 1)",
    },
  ).onfinish = () => {
    spark.remove()
  }
}

// Add active class to current page in navigation
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop()
  const navLinks = document.querySelectorAll("nav ul li a")

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href")
    if (linkPage === currentPage) {
      link.classList.add("active")
    }
  })
})
