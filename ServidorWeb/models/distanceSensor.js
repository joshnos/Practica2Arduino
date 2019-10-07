class DistanceSensor {
    constructor(id, minDistance, status) {
        this.id = id;
        this.minDistance = minDistance;
        this.status = status;
    }

    changeStatus(status) {
        this.status = status;
    }

    changeMinDistance(minDistance) {
        this.minDistance = minDistance;
    }
}

module.exports = DistanceSensor;