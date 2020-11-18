class TimeShow extends HTMLElement {
    constructor() {
        super();
        this.currentTime = new Date();
        this.appendText = '';
        const shadow = this.attachShadow({ mode: 'open' });
        const warpper = document.createElement('span');
        warpper.setAttribute('class', 'wrapper');
        if (this.hasAttribute('appendText')) {
            this.appendText = this.getAttribute('appendText');
        }
        warpper.innerText = `${this.appendText !== '' ? `${this.appendText}：` : ''}${this.getCustomTimeString(this.currentTime)}`;
        const style = document.createElement('style');
        console.log('style not append', style.isConnected);
        style.textContent = `
    .wrapper {
      color: red
    }
    `;
        shadow.appendChild(style);
        console.log('style append', style.isConnected);
        shadow.appendChild(warpper);
        this.startTime();
    }
    setCurrentTime(time = new Date()) {
        this.currentTime = time;
        this.shadowRoot.querySelector('span').textContent = `${this.appendText !== '' ? `${this.appendText}：` : ''}${this.getCustomTimeString(this.currentTime)}`;
    }
    handleTimeHourMinuteSecondString(time) {
        let hour = time.getHours();
        if (hour < 10) {
            hour = `0${hour}`;
        }
        let minutes = time.getMinutes();
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        let seconds = time.getSeconds();
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        return `${hour}:${minutes}:${seconds}`;
    }
    getCustomTimeString(time) {
        return `${time.getFullYear()}年${time.getMonth()}月${time.getDate()}日${this.handleTimeHourMinuteSecondString(time)}`;
    }
    stopTime() {
        clearInterval(this.timer);
    }
    startTime() {
        this.timer = setInterval(() => this.setCurrentTime(), 1000);
    }
}
customElements.define('time-show', TimeShow);
