export class LetteringService {
  animate(message, slowTyping = 0, callback) {
    if (!message) return;

    this.index       = 0;
    this.letters     = [];
    this.nextTiming  = null;
    this.message     = message;
    this.slowly      = slowTyping;

    this.hasCallback = typeof callback === 'function';
    this.word        = this.message.textContent.split('');

    if (!this.word.length) return;

    if (this.hasCallback) {
      this.callback = callback;
    }

    this.getLetters();

    while(this.message.firstChild) {
      this.message.removeChild(this.message.firstChild);
    }

    this.lastLetter  = this.letters[this.letters.length - 1];
    this.letteringID = requestAnimationFrame(this.lettersAnimation.bind(this));
  }

  getLetters() {
    this.word.forEach((char) => {
      if (char === '#') {
        this.letters.push(document.createElement('br'));
        return;
      }

      let letter = document.createElement('span');
      letter.textContent = char;

      if (char === '%') {
        letter.style.marginLeft = '50px';
        letter.textContent = '';
      }

      this.letters.push(letter);
    });
  }

  showLetter(letter) {
    letter.style.visibility = 'visible';
    this.message.appendChild(letter);
    this.last = letter;
  }

  lettersAnimation() {
    if (!this.letters[this.index]) return;
    let typeLetter = Date.now() >= this.nextTiming;

    if (!this.slowly || (this.slowly && typeLetter)) {
      this.showLetter(this.letters[this.index++]);
      this.nextTiming = Date.now() + this.slowly;
    }

    if (this.last === this.lastLetter) {
      cancelAnimationFrame(this.letteringID);

      if (this.hasCallback) {
        setTimeout(this.callback, 1000);
        return;
      }
    }

    this.letteringID = requestAnimationFrame(this.lettersAnimation.bind(this));
  }
}
