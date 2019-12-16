class DistanceSensor {
    constructor(id, distance, limit, status, detect) {
        this.id = id;
        this.distance = distance;
        this.limit = limit;
        this.status = status;
        this.detect = detect;
    }

    changeStatus(status) {
        this.status = status;
    }

    changedistance(distance) {
        this.distance = distance;
    }

    changeLimit(limit) {
        this.limit = limit;
    }

    changeDetect(detect) {
        this.detect = detect;
    }
}

module.exports = DistanceSensor;