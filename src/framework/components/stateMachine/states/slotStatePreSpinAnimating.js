'use strict';


import BaseSlotState from "./baseSlotState";

export default class SlotStatePreSpinAnimating{

    constructor(reelView) {
        this._reelView = reelView;
        // this.onStateEnter();
    }

    onStateEnter(){
        this._reelView.rollBackReels();
    }

    // update(dt){
    //     console.log("starting to animate");
    //     console.log(this._reel);
    // }

    destroy(){

    }

    // // how much should reels roll back before actual spinning, one measure unit equals to symbol height
    // get REEL_ROLL_BACK_AMOUNT(){
    //     return 0.5;
    // }

    // get ROLL_BACK_DURATION(){
    //     return 0.5;
    // }

}