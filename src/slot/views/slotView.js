'use strict';

import GameView from "../../framework/views/gameView";

const SPIN_BUTTON_OFFSET_X = 824;
const SPIN_BUTTON_OFFSET_Y = 218;


export default class SlotView extends GameView{

    constructor() {
        super();
    }

    setSpinButtonPosition(x, y){
        this.spinButton.view.x = x;
        this.spinButton.view.y
    }

}