// public/js/channelControl.js
// UX helpers for Channel page: dynamic placeholders, submit spinner, smooth scroll.

// Wrap everything in an IIFE so variables don't leak to window (prevents name clashes)
(() => {
  /* ---------- Dynamic placeholders for style / tone / more_instructions ---------- */
  // Grab inputs by ID (these IDs exist in your channel.ejs)
  const styleInput            = document.getElementById('styleInput');
  const toneInput             = document.getElementById('toneInput');
  const moreInstructionsInput = document.getElementById('moreInstructionsInput');
  const channelSelect         = document.querySelector('select[name="channel"]');

  // Update placeholder hints based on chosen channel
  function updatePlaceholders() {
    // If elements aren’t on this page, safely no-op
    if (!styleInput || !toneInput || !moreInstructionsInput || !channelSelect) return;

    const channel = channelSelect.value;

    switch (channel) {
      case 'Twitter':
        styleInput.placeholder = 'e.g. Witty, meme, poll, question, announcement, call-to-action';
        toneInput.placeholder = 'e.g. Playful, conversational, punchy';
        moreInstructionsInput.placeholder = 'e.g. Use a hashtag, add a trending topic, or start with a question';
        break;
      case 'LinkedIn':
        styleInput.placeholder = 'e.g. Thought-leadership, announcement, poll, case study, expert Q&A';
        toneInput.placeholder = 'e.g. Formal, professional, motivational';
        moreInstructionsInput.placeholder = 'e.g. Mention industry stats, avoid emojis, address B2B audience';
        break;
      case 'Email':
        styleInput.placeholder = 'e.g. Personalized, story, announcement, limited-time offer';
        toneInput.placeholder = 'e.g. Warm, persuasive, helpful';
        moreInstructionsInput.placeholder = 'e.g. Add a discount code, personalize with name, include a strong CTA';
        break;
      case 'Instagram':
        styleInput.placeholder = 'e.g. Storytelling, meme, visual, announcement, poll';
        toneInput.placeholder = 'e.g. Fun, energetic, aspirational';
        moreInstructionsInput.placeholder = 'e.g. Use emojis, add a call to tag friends, create a swipe-up prompt';
        break;
      default:
        styleInput.placeholder = 'e.g. Witty, poetic, poll, meme, announcement, call-to-action';
        toneInput.placeholder = 'e.g. Formal, casual, playful, professional';
        moreInstructionsInput.placeholder = 'e.g. Avoid hashtags, write as a Q&A, include a joke, or any special request';
    }
  }

  // Bind change handler and initialize once on load
  if (channelSelect) {
    channelSelect.addEventListener('change', updatePlaceholders);
    updatePlaceholders(); // run once immediately
  }

  /* -------------------- Submit UX: disable + show loading -------------------- */
  const formEl    = document.getElementById('genForm');
  const btnEl     = document.getElementById('generateBtn');
  const loadingEl = document.getElementById('loading');

  if (formEl && btnEl && loadingEl) {
    formEl.addEventListener('submit', () => {
      btnEl.disabled = true;
      btnEl.textContent = 'Generating...';
      loadingEl.style.display = ''; // unhide spinner/notice
    });
  }

  /* ----------------- Smooth-scroll to results when present ------------------- */
  const resultsSection = document.getElementById('results-section');
  if (resultsSection) {
    setTimeout(() => {
      resultsSection.scrollIntoView({ behavior: 'smooth' });
    }, 150); // small delay so DOM has rendered the section
  }
})();
