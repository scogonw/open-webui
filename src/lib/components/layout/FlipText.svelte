<script>
  export let texts = ["Welcome to Sia", "Ask Sia to get instant answers", "Existence is futile"];
  let currentIndex = 0;
  let animatedText = texts[currentIndex];
  let letters = [];
  let interval;

  function animateText() {
    // Reset letters and start a new animation
    letters = [];
    let letterIndex = 0;

    // Clear any existing interval
    clearInterval(interval);

    // Set up a new interval to add letters one by one
    interval = setInterval(() => {
      if (letterIndex < animatedText.length) {
        letters = [...letters, animatedText[letterIndex]];
        letterIndex++;
      } else {
        clearInterval(interval);
        setTimeout(updateText, 6000); // Wait before changing text
      }
    }, 10); // Time between each letter
  }

  function updateText() {
    currentIndex = (currentIndex + 1) % texts.length;
    animatedText = texts[currentIndex];
    animateText();
  }

  // Start the animation initially
  animateText();
</script>

<style>
  .text-container {
    font-size: 1.5rem;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden; /* Hide overflow for fade effect */
    display: inline-block;
  }

  .letter-wrapper {
    display: inline-block;
    position: relative;
    width: 100%;
  }

  .letter {
    display: inline-block;
    opacity: 0;
    transform: translateX(-100%);
    animation: fadeIn 0.2s forwards;
  }

  .letter.space {
    display: inline-block; /* Ensure spaces are visible */
    width: 0.5rem; /* Ensure proper space width */
    visibility: visible; /* Make sure space is visible */
    transform: none; /* No need for translate */
    animation: none; /* Spaces don't need animation */
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateX(-100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
</style>

<div class="text-container">
  <div class="letter-wrapper">
    {#each letters as letter, index (index)}
      <span class="letter {letter === ' ' ? 'space' : ''}" style="animation-delay: {index * 0.1}s;">
        {letter === ' ' ? '\u00A0' : letter} <!-- Use non-breaking space for visibility -->
      </span>
    {/each}
  </div>
</div>
