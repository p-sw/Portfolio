welcome_text = {
    object: document.getElementById("welcome-title"),

    text: "안녕하세요. \n웹 개발자 서브입니다.",

    get_flat: function() {
        return [].concat(...Hangul.disassemble(this.text));
    },

    get_index: function() {
        this.max_index = this.get_flat().length;
    },

    index: 0,

    speed: 50,
    special_speeds: {
        " ": 150,
        "\n": 200,
    },

    start: function() {
        if (this.index <= this.max_index) {
            this.object.innerText = Hangul.assemble(this.get_flat().slice(undefined, this.index));
            this.index++;
            current_char = this.get_flat()[this.index - 1];
            if ("\n" === current_char) {
                this.object.innerHTML += "<br>";
            }
            if (current_char in this.special_speeds) {
                setTimeout(this.start.bind(this), this.special_speeds[current_char])
            } else {
                setTimeout(this.start.bind(this), this.speed);
            }
        }
    }
}