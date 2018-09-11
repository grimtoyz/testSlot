'use strict';


export default class SlotModel {

    constructor() {
        // const _spinButtonOffsetX = 100;
        // this.resetToDefaultValues();
    }

    resetToDefaultValues(){
        this.balance = 1000;
        this.currentBet = 10;
    }

    set balance(value){
        this._balance = value;
    }

    get balance(){
        return(this._balance);
    }

    getReelSymbolIDsByReelIndex(reelIndex){
        switch (reelIndex) {
            case 0:
                return [1, 3, 4, 5, 3, 6, 5, 4, 4, 7, 3, 7];
                break;
            case 1:
                return [1, 3, 4, 5, 3, 6, 5, 4, 4, 7, 3, 7];
                break;
            case 2:
                return [1, 3, 4, 5, 3, 6, 5, 4, 4, 7, 3, 7];
                break;
        }
    }

    getSymbolIDsOfEveryReel(){
        var IDsOfEveryReel = new Array();
        var i;

        for (i=0; i < this.REELS_NUMBER; i++){
            IDsOfEveryReel.push(this.getReelSymbolIDsByReelIndex(i));
        }

        return IDsOfEveryReel;
    }

    set currentBet(value){
        this._currentBet = value;
    }

    get currentBet(){
        return(this._currentBet);
    }

    set nextSymbols(value){
        this._nextSymbols = value;
    }

    get nextSymbols(){
        return this._nextSymbols;
    }

    get REELS_NUMBER(){
        return 3;
    }

    // get UNIQUE_SYMBOLS_AMOUNT(){
    //     return 6;
    // }
}
