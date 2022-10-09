welcome_text = {
    object: document.getElementById("welcome-title"),
    text: "Welcome to my portfolio!",
    index: 0,
    speed: 100,
    write: function() {
        if (this.index < this.text.length) {
            this.object.innerHTML += this.text.charAt(this.index);
            this.index++;
            setTimeout(this.write.bind(this), this.speed);
        }
    }
}