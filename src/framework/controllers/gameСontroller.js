'use strict';

import * as PIXI from 'pixi.js';
import SlotModel from "../../slot/models/slotModel";
// import TweenMax from "gsap";
// import GameModel from "../model/game_model";
// import GameView from "../view/game_view";
import SpinButton from "../components/spinButton";
import GameView from "../views/gameView";



export default class GameController{

    constructor() {

        this.setupSlotModel();

        this._slotView = new GameView(this.slotModel.getSymbolIDsOfEveryReel());
        this._slotView.onSpinClickedCallback(this.onSpinClicked.bind(this));
    }

    setupSlotModel(){
        this.slotModel = new SlotModel();
        this.slotModel.resetToDefaultValues();
    }

    onSpinClicked(){
        this.requestSymbols();

        if (this.canSpin())
            this._slotView.startSpinning();
    }

    onStopClicked(){
        this._slotView.stopSpinning(this.slotModel.nextSymbols);
    }

    requestSymbols(){
        // should request data from server here instead of generating random symbols

        var nextSymbols = new Array();

        var i;
        for (i = 0; i < this.slotModel.REELS_NUMBER; i++) {
            var symbolIDs = this.slotModel.getReelSymbolIDsByReelIndex(i);
            var index = Math.floor(Math.random()*symbolIDs.length);
            var symbolID = symbolIDs[index];
            nextSymbols.push(symbolID);
        }

        this.slotModel.nextSymbols = nextSymbols;

        // for (var i in )
    }

    canSpin(){
        var canSpin = false;

        if (this.slotModel.balance >= this.slotModel.currentBet){
            canSpin = true;
        }

        return (canSpin);
    }

    set spinButton(value){
        this._spinButton = value;
    }

    get spinButton(){
        return this._spinButton;
    }

    get view(){
        return this._slotView
    }
}
