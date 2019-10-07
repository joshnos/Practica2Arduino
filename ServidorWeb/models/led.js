class Led {
    constructor(id, status) {
        this.id = id;
        this.status = status;
    }

    changeStatus(status) {
        this.status = status;
    }
}

module.exports = Led;