sub_nav = {
    buttons: document.querySelector("nav.sub-nav").children,
    visible_delay: 400,
    i: 0,
    buttons_visible: function() {
        if (this.i<=1) {
            this.buttons[this.i].classList.add("visible");
            this.i++;
        } else {
            return;
        }
        setTimeout(this.buttons_visible.bind(this), this.visible_delay);
    }
}

welcome_text = {
    object: document.getElementById("welcome-title"),

    get_flat: function(text) {
        return [].concat(...Hangul.disassemble(text));
    },

    index: 0,

    speed: 30,
    special_speeds: {
        " ": 60,
        "\n": 100,
    },

    start: function(text) {
        let max_index = this.get_flat(text).length;
        let current_char;
        if (this.index <= max_index) {
            this.object.innerText = Hangul.assemble(this.get_flat(text).slice(undefined, this.index));
            this.index++;
            current_char = this.get_flat(text)[this.index - 1];
            if ("\n" === current_char) {
                this.object.innerHTML += "<br>";
            }
            if (current_char in this.special_speeds) {
                setTimeout(this.start.bind(this, text), this.special_speeds[current_char])
            } else {
                setTimeout(this.start.bind(this, text), this.speed);
            }
        } else {
            sub_nav.buttons_visible();
        }
    }
}