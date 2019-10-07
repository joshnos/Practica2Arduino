class DistanceSensor {
    constructor(id, distance, limit, status) {
        this.id = id;
        this.distance = distance;
        this.limit = limit;
        this.status = status;
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
}

module.exports = DistanceSensor;