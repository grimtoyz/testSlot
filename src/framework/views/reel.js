'use strict';


import ReelSpinner from "../components/reelSpinner";

export default class Reel extends PIXI.Container {

    constructor(symbolIDs) {
        super();

        this._symbolIDs = symbolIDs;
        this._spinner = new ReelSpinner();
        this._spinner.onSpinnerUpdated(this.onSpinnerUpdated.bind(this));

        this.updateReelPosition(0);
    }

    onSpinnerUpdated(distancePassed){
        this.updateReelPosition(distancePassed);
    }

    updateReelPosition(position){
        var normalizedPosition = this.getNormalizedPosition(position);

        var visibleSymbols = this.getVisibleSymbolIDs(normalizedPosition);

        this.updateSymbolsIfNeeded(visibleSymbols);
        // var symbolPosition = (this.symbolsTotal - 1)*normalizedPosition;
        // this.y = symbolPosition - this.getSymbolIndexByPosition(normalizedPosition);
        this.y = Math.round(position*this._symbolHeight*this._symbolIDs.length);
    }

    getNormalizedPosition(position){
        if (position > 1)
            return (position - Math.floor(position));

        if (position < 0)
        {
            var positionAbs = Math.abs(position);
            return (-(positionAbs - Math.floor(positionAbs)));
        }

        return position;
    }

    getVisibleSymbolIDs(position){
        var centralSymbolID = this.getCentralRowSymbolIdByPosition(position);
        var symbolsToShow = new Array();

        var i;
        for (i=0; i < this.NUMBER_OF_ROWS; i++){
            const NUMBER_OF_ROWS_ABOVE = Math.floor((this.NUMBER_OF_ROWS - 1)/2);

            var normalizedIndex = this.normalizeIndex(-NUMBER_OF_ROWS_ABOVE + i + centralSymbolID);
            var symbolID = this._symbolIDs[normalizedIndex];

            symbolsToShow.push(symbolID);
        }

        return (symbolsToShow);
    }

    // update(deltaTime){
    //     this._s
    // }
    spin(distance, duration){
        this._spinner.spin(distance, duration);
        // this.updateReelPosition(distance);
    }

    updateSymbolsIfNeeded(visibleSymbols){
        if (typeof this.currentSymbolIDs == 'undefined') {
            this.createSymbolSprites(visibleSymbols);
            this.currentSymbolIDs = visibleSymbols;
            return;
        }

        var i;
        for (i=0; i < visibleSymbols.length; i++){
            if (visibleSymbols[i] != this.currentSymbolIDs[i]){
                this.currentSymbolIDs = visibleSymbols;
                this.updateSymbolTextures();
                break;
            }
        }
    }

    createSymbolSprites(visibleSymbols){
        this.currentSymbolSprites = new Array();

        var i;
        for (i=0; i < visibleSymbols.length; i++){
            let symbolSprite = new PIXI.Sprite(
                PIXI.utils.TextureCache[`SYM${visibleSymbols[i]}.png`]
            );
            symbolSprite.y = i * symbolSprite.height;

            this.addChild(symbolSprite);
            this.currentSymbolSprites.push(symbolSprite);
        }

        this._symbolHeight = this.currentSymbolSprites[0].height;
    }

    updateSymbolTextures(){
        var i;
        for (i=0; i < this.currentSymbolIDs.length; i++){
            this.currentSymbolSprites[i].texture = PIXI.utils.TextureCache[`SYM${this.currentSymbolIDs[i]}.png`];
        }
    }

    // getVisibleSymbolIDs(position){
    //     var symbolsToShow = new Array();
    //
    //     var i;
    //     for (i=0; i < this.NUMBER_OF_ROWS; i++){
    //         const NUMBER_OF_ROWS_ABOVE = Math.floor((this.NUMBER_OF_ROWS - 1)/2);
    //
    //         var normalizedIndex = this.normalizeIndex(-NUMBER_OF_ROWS_ABOVE + i);
    //         var symbolID = this._symbolIDs[normalizedIndex];
    //
    //         symbolsToShow.push(symbolID);
    //     }
    //
    //     return (symbolsToShow);
    // }

    normalizeIndex(index){
        var normalizedIndex = index;

        if (index >= this._symbolIDs.length)
            normalizedIndex = 0;

        if (index < 0)
            normalizedIndex = this._symbolIDs.length - 1;

        return normalizedIndex;
    }

    getTopSymbolIdByPosition(position){
        return (this._symbolIDs[this.getSymbolIndexByPosition(position)]);
    }

    getCentralRowSymbolIdByPosition(position){
        return (this._symbolIDs[this.getSymbolIndexByPosition(position)]);
    }

    get NUMBER_OF_ROWS(){
        return 3;
    }

    get symbolsTotal(){
        return (this._symbolIDs.length);
    }

    getSymbolIndexByPosition(position){
        return (Math.floor((this.symbolsTotal - 1)*position));
    }
}