

    // --- Data ---
    const menuCategories = ['Fast Food', 'Mains', 'Healthy', 'Desserts'];
    
    // UPDATE IMAGE URLS BELOW: Replace the 'image' property values inside this array with your own image URLs
    const menuItems = [
      { id: 1, name: 'Pizza', description: 'Classic wood-fired pizza with tomato sauce and gooey mozzarella.', price: '₹100', category: 'Fast Food', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600' },
      { id: 2, name: 'Burger', description: 'Juicy patty layered with fresh lettuce, tomatoes, and house sauce in a toasted bun.', price: '₹190', category: 'Fast Food', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600' },
      { id: 3, name: 'Pasta', description: 'Al dente pasta tossed in a rich, creamy sauce with herbs and parmesan.', price: '₹80', category: 'Mains', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVrk_rNg2yawHJwZP9QabaIMxfYoePhTRn9w&s' },
      { id: 4, name: 'Sandwich', description: 'Freshly made sandwich with crisp veggies, meats, and delicious spreads.', price: '₹60', category: 'Fast Food', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=600' },
      { id: 5, name: 'Biryani', description: 'Aromatic basmati rice cooked with tender meat, saffron, and traditional spices.', price: '₹190', category: 'Mains', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=600' },
      { id: 6, name: 'Noodles', description: 'Stir-fried noodles with crisp vegetables and a savory soy-garlic glaze.', price: '₹90', category: 'Mains', image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&q=80&w=600' },
      { id: 7, name: 'Fried Rice', description: 'Wok-tossed rice with mixed vegetables and delicate Asian seasoning.', price: '₹90', category: 'Mains', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=600' },
      { id: 8, name: 'Salad', description: 'A healthy bowl of mixed greens, cherry tomatoes, and a light vinaigrette.', price: '₹50', category: 'Healthy', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600' },
      { id: 9, name: 'Cake', description: 'A sweet and moist slice of freshly baked cake layered with rich frosting.', price: '₹500', category: 'Desserts', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600' },
      { id: 10, name: 'Ice Cream', description: 'Two scoops of creamy, velvety ice cream perfect for a sweet ending.', price: '₹50', category: 'Desserts', image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&q=80&w=600' },
    ];

    // --- State & Initialization ---
    let currentPage = 'home';
    let isMobileMenuOpen = false;

    // Set Copyright Year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Initialize Icons
    lucide.createIcons();

    // Scroll Navbar & Progress Bar Effect
    window.addEventListener('scroll', () => {
      // Navbar Glass Effect
      const nav = document.getElementById('navbar');
      if (window.scrollY > 50) {
        nav.classList.add('glass-panel', 'py-4');
        nav.classList.remove('bg-transparent', 'py-6');
      } else {
        nav.classList.add('bg-transparent', 'py-6');
        nav.classList.remove('glass-panel', 'py-4');
      }

      // Scroll Progress Bar
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      document.getElementById('scroll-progress').style.width = scrolled + '%';
    });

    // --- NEW: Interactive Animations Logic ---

    // 1. Custom Cursor Tracking
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');
    
    window.addEventListener('mousemove', (e) => {
      // Dot follows immediately
      cursorDot.style.left = e.clientX + 'px';
      cursorDot.style.top = e.clientY + 'px';
      
      // Outline follows with a slight delay using Web Animations API
      cursorOutline.animate({
        left: e.clientX + 'px',
        top: e.clientY + 'px'
      }, { duration: 500, fill: "forwards" });
    });

    // 2. Cursor Hover Effects on Interactive Elements
    function initCursorHoverEffects() {
      const interactives = document.querySelectorAll('button, a, .cursor-pointer, input');
      interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
          cursorOutline.style.width = '60px';
          cursorOutline.style.height = '60px';
          cursorOutline.style.backgroundColor = 'rgba(251, 191, 36, 0.1)';
          cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
          cursorOutline.style.width = '40px';
          cursorOutline.style.height = '40px';
          cursorOutline.style.backgroundColor = 'transparent';
          cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        });
      });
    }

    // 3. Magnetic Button Effect
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const position = btn.getBoundingClientRect();
        const x = e.clientX - position.left - position.width / 2;
        const y = e.clientY - position.top - position.height / 2;
        
        // Slightly pull the button towards the cursor
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.4}px)`;
      });
      
      btn.addEventListener('mouseleave', () => {
        // Snap back to original position
        btn.style.transform = 'translate(0px, 0px)';
      });
    });

    // 4. Hero Background Mouse Parallax
    const heroSection = document.getElementById('hero-section');
    const heroBg = document.getElementById('hero-bg');
    if (heroSection && heroBg) {
      heroSection.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth - e.pageX * 2) / 90;
        const y = (window.innerHeight - e.pageY * 2) / 90;
        // The background is 110% size (inset-[-5%]) to prevent seeing borders when it shifts
        heroBg.style.transform = `translate(${x}px, ${y}px)`;
      });
      heroSection.addEventListener('mouseleave', () => {
        heroBg.style.transform = `translate(0px, 0px)`;
      });
    }

    // --- End Interactive Animations Logic ---

    // --- Scroll Reveal Logic ---
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    function initReveals(containerId) {
      const container = document.getElementById(containerId);
      if (!container) return;
      
      const elements = container.querySelectorAll('.reveal-item');
      elements.forEach(el => {
        el.classList.remove('is-visible');
        // Force reflow
        void el.offsetWidth;
        revealObserver.observe(el);
      });
    }

    // --- Navigation Logic ---
    function navigateTo(page) {
      currentPage = page;
      
      // Toggle visibility
      document.getElementById('home-page').classList.toggle('hidden', page !== 'home');
      document.getElementById('menu-page').classList.toggle('hidden', page !== 'menu');

      // Update Nav Links Styles
      document.querySelectorAll('.nav-link').forEach(link => {
        if (link.dataset.page === page) {
          link.classList.add('text-amber-500', 'font-semibold');
          link.classList.remove('text-neutral-300');
        } else {
          link.classList.add('text-neutral-300');
          link.classList.remove('text-amber-500', 'font-semibold');
        }
      });
      document.querySelectorAll('.mobile-nav-link').forEach(link => {
        if (link.dataset.page === page) {
          link.classList.add('text-amber-500');
          link.classList.remove('text-neutral-300');
        } else {
          link.classList.add('text-neutral-300');
          link.classList.remove('text-amber-500');
        }
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
      toggleMobileMenu(false);

      // Re-initialize reveals for the current page to replay animations
      initReveals(`${page}-page`);
    }

    // --- Mobile Menu Toggle ---
    function toggleMobileMenu(forceState) {
      isMobileMenuOpen = forceState !== undefined ? forceState : !isMobileMenuOpen;
      const menu = document.getElementById('mobile-menu');
      const btn = document.getElementById('mobile-menu-btn');

      if (isMobileMenuOpen) {
        menu.classList.remove('-translate-y-full');
        menu.classList.add('translate-y-0');
        btn.innerHTML = '<i data-lucide="x" class="w-6 h-6"></i>';
      } else {
        menu.classList.add('-translate-y-full');
        menu.classList.remove('translate-y-0');
        btn.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
      }
      lucide.createIcons();
    }

    // --- Menu Rendering Logic ---
    function renderCategories(activeCategory = 'All') {
      const container = document.getElementById('category-filters');
      const categories = ['All', ...menuCategories];
      
      container.innerHTML = categories.map(cat => {
        const isActive = cat === activeCategory;
        const baseClasses = "whitespace-nowrap uppercase tracking-widest text-sm pb-1 border-b-2 transition-all duration-300";
        const activeClasses = isActive ? "border-amber-500 text-amber-500" : "border-transparent text-neutral-400 hover:text-neutral-200";
        
        return `<button onclick="filterMenu('${cat}')" class="${baseClasses} ${activeClasses}">${cat}</button>`;
      }).join('');
    }

    function renderMenuItems(category = 'All') {
      const container = document.getElementById('menu-grid');
      const displayedItems = category === 'All' ? menuItems : menuItems.filter(item => item.category === category);
      
      container.innerHTML = displayedItems.map((item, index) => {
        const delay = (index % 4) * 100;
        return `
          <div class="reveal-item group flex flex-col sm:flex-row gap-6 items-start hover:bg-neutral-900/50 p-4 rounded-xl transition-colors duration-300 border border-transparent hover:border-neutral-800" style="transition-delay: ${delay}ms;">
            
            <div class="relative w-full sm:w-32 h-32 flex-shrink-0 overflow-hidden rounded-lg">
              <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
            </div>

            <div class="flex-1 w-full">
              <div class="flex justify-between items-baseline border-b border-neutral-800 pb-2 mb-3">
                <h3 class="text-xl font-serif group-hover:text-amber-500 transition-colors">${item.name}</h3>
                <span class="text-amber-500 font-semibold tracking-wider ml-4">${item.price}</span>
              </div>
              <p class="text-neutral-400 text-sm leading-relaxed mb-3">
                ${item.description}
              </p>
              <span class="text-xs uppercase tracking-widest text-neutral-600 bg-neutral-900 px-2 py-1 rounded">
                ${item.category}
              </span>
            </div>
            
          </div>
        `;
      }).join('');

      // Observe the newly created elements
      initReveals('menu-page');
    }

    function filterMenu(category) {
      renderCategories(category);
      renderMenuItems(category);
    }

    // --- On Load ---
    document.addEventListener('DOMContentLoaded', () => {
      // Initial render of menu data
      renderCategories('All');
      renderMenuItems('All');
      
      // Start reveals for the initial page
      initReveals('home-page');

      // Initialize custom cursor hover effects
      initCursorHoverEffects();
    });

 

  window.watsonAssistantChatOptions = {
    integrationID: "86bd86cd-2289-45be-83ff-bd17eb2c7005", // The ID of this integration.
    region: "au-syd", // The region your integration is hosted in.
    serviceInstanceID: "bb290488-d04c-46bd-b9b9-0229ebc6d4d3", // The ID of your service instance.
    onLoad: async (instance) => { await instance.render(); }
  };
  setTimeout(function(){
    const t=document.createElement('script');
    t.src="https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
    document.head.appendChild(t);
  });
