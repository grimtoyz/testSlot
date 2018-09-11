'use strict';


export default class ReelSpinner {

    constructor() {
        // this.onSpinnerUpdated();
        this.setupTicker();
    }

    setupTicker(){
        this._ticker = PIXI.ticker.shared;
        this._ticker.autoStart = false;
        this._ticker.stop();
        this._ticker.add(this.update, this);
    }

    spin(distance, duration){
        this._timeTotal = duration;
        this._timeLeft = duration;
        this._timePassed = 0;
        this._distanceLeft = distance;
        this._distanceTotal = distance;
        this._ticker.start();
    }

    update(deltaTime) {
        // this.reels.forEach(function(item) {
        //     item.update(deltaTime);
        // });
        // this._stateMachine.update(deltaTime);
        var distancePassed;
        if (this._timePassed < this._timeTotal)
        {
            distancePassed = this.lerp(0, this._distanceTotal, this._timePassed/this._timeTotal);
            this._timePassed += deltaTime;
        }
        else
        {
            distancePassed = this._distanceTotal;
            this._ticker.stop();
        }

        this.onSpinnerUpdated(distancePassed);

    }

    onSpinnerUpdated(callback){
        this.onSpinnerUpdated = callback;
    }

    lerp(originalValue, targetValue, interpolationValue) {
        return (1 - interpolationValue)*originalValue + interpolationValue*targetValue;
    }
}