class EmojiAnimate {
  constructor() {
    this.emojis = document.querySelectorAll(".emoji-list button");
    this.container = document.querySelector(".emoji-container");
    this.handleEmojiClick = this.handleEmojiClick.bind(this);
    this.addEventListeners();
  }

  addEventListeners() {
    this.emojis.forEach((emoji) =>
      emoji.addEventListener("click", this.handleEmojiClick)
    );

    // this is just to emulate a click
    setTimeout(() => {
      this.emojis[7].click();
    }, 200);
    setTimeout(() => {
      this.emojis[1].click();
    }, 1000);
  }

  handleEmojiClick(e) {
    // create new element to hold emoji
    const emojiEl = document.createElement("div");
    emojiEl.classList.add("emoji-animate");

    // get emoji from clicked element
    const { innerHTML } = e.target;
    emojiEl.innerHTML = innerHTML;

    // place the element inside the container
    this.container.appendChild(emojiEl);

    // get dynamic positions
    const { height, left } = e.target.getBoundingClientRect();
    const { bottom, top, width } = this.container.getBoundingClientRect();

    // animation
    const animation = emojiEl.animate(
      [
        { 
          opacity: 1, 
          transform: `translate(${left}px, ${bottom}px)` },
        {
          opacity: 0,
          transform: `translate(${width / 2}px, ${top - height}px)`,
        },
      ],
      {
        duration: 2000,
        easing: "cubic-bezier(.47,.48,.44,.86)",
      }
    );

    // remove element once has finished animating
    animation.onfinish = () => emojiEl.remove();
  }
}

new EmojiAnimate();
