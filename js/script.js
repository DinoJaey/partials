document.addEventListener("DOMContentLoaded", function() {
    var lazyloadImages;    
  
    if ("IntersectionObserver" in window) {
      lazyloadImages = document.querySelectorAll(".lazy");
      var imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            var image = entry.target;
            image.classList.remove("lazy");
            imageObserver.unobserve(image);
          }
        });
      });
  
      lazyloadImages.forEach(function(image) {
        imageObserver.observe(image);
      });
    } else {  
      var lazyloadThrottleTimeout;
      lazyloadImages = document.querySelectorAll(".lazy");
      
      function lazyload () {
        if(lazyloadThrottleTimeout) {
          clearTimeout(lazyloadThrottleTimeout);
        }    
  
        lazyloadThrottleTimeout = setTimeout(function() {
          var scrollTop = window.pageYOffset;
          lazyloadImages.forEach(function(img) {
              if(img.offsetTop < (window.innerHeight + scrollTop)) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
              }
          });
          if(lazyloadImages.length == 0) { 
            document.removeEventListener("scroll", lazyload);
            window.removeEventListener("resize", lazyload);
            window.removeEventListener("orientationChange", lazyload);
          }
        }, 20);
      }
  
      document.addEventListener("scroll", lazyload);
      window.addEventListener("resize", lazyload);
      window.addEventListener("orientationChange", lazyload);
    }
  })

  document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('toggle');
    const flexList = document.querySelector('.flex-list');
    const linksContainer = document.querySelector('.links-container');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const navDropdown = document.querySelector('.nav-dropdown');
    const dropdownContainer = document.getElementById('services-dropdown-container');

    navDropdown.hidden = true;
    dropdownToggle.setAttribute('aria-expanded', 'false');
  
    

    function handleInputChange() {
        if (window.matchMedia('(max-width: 1024px)').matches) { // Adjust breakpoint as needed

        if (event.key === 'Enter') {
          input.checked = !input.checked; // Toggle the checked state
          event.preventDefault(); // Prevent default behavior, if any
        }
        
        if (input.checked) {
        flexList.style.display = 'flex';
        linksContainer.style.padding = '20px';
        }
        else {
            flexList.style.display = 'none';
            linksContainer.style.padding = '0';
            }
        }
        else {
        // Optional: Reset styles when not in mobile view
            flexList.style.display = '';
            linksContainer.style.padding = '';
        }
    }

    dropdownToggle.addEventListener('click', () => {
      const isExpanded = dropdownToggle.getAttribute('aria-expanded') === 'true';
      dropdownToggle.setAttribute('aria-expanded', !isExpanded);
      navDropdown.hidden = isExpanded;
    });

    document.addEventListener('click', (event) => {
      if (!dropdownContainer.contains(event.target)) {
        dropdownToggle.setAttribute('aria-expanded', 'false');
        navDropdown.hidden = true;
      }
    });
    
    input.addEventListener('keydown', handleInputChange);

    input.addEventListener('change', handleInputChange);

    // Optional: Also check and reset on window resize
    window.addEventListener('resize', handleInputChange);
    });