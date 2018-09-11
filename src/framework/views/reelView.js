'use strict';


import Reel from "./reel";

export default class ReelView extends PIXI.Container {

    constructor(symbolIDsOfEveryReel) {
        super();

        var reelsMask = new PIXI.Sprite(PIXI.utils.TextureCache["mask.png"]);
        this._mask = reelsMask;

        this.createReels(symbolIDsOfEveryReel);
    }

    createReels(symbolIDsOfEveryReel){
        this._reels = new Array();

        var i;
        for (i=0; i < symbolIDsOfEveryReel.length; i++){
            var reel = new Reel(symbolIDsOfEveryReel[i]);

            reel.x = this.REEL_OFFSETS_X[i];
            this.addChild(reel);
            this._reels.push(reel);
        }
    }

    rollBackReels(){
        var i;
        for (i=0; i<this._reels.length; i++)
        {
            this._reels[i].spin(-this.REEL_ROLL_BACK_DISTANCE, this.ROLL_BACK_DURATION);
        }
        // this._reels.forEach(function(reel) {
        //     reel.spin(-this.REEL_ROLL_BACK_DISTANCE, this.ROLL_BACK_DURATION);
        // });
    }

    get REEL_OFFSETS_X(){
        return [70, 310, 553];
    }

    // how much should reels roll back before actual spinning, one measure unit equals to symbol height
    get REEL_ROLL_BACK_DISTANCE(){
        return -1;
    }

    get ROLL_BACK_DURATION(){
        return 50;
    }
}