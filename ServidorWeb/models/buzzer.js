class Buzzer {
    constructor(id, status, frecuency) {
        this.id = id;
        this.status = status;
        this.frecuency = frecuency;
    }

    changeStatus(status) {
        this.status = status;
    }

    changeFrecuency(frecuency) {
        this.frecuency = frecuency;
    }
}

module.exports = Buzzer;