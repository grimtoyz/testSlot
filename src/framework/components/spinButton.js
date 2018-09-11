'use strict';


export default class SpinButton extends PIXI.Sprite{

    constructor(textureEnabled, textureDisabled) {

        super(textureEnabled);

        this._textureEnabled = textureEnabled;
        this._textureDisabled = textureDisabled;

        // this._spinButton = new PIXI.Sprite(textureEnabled);
        // this.tap = this.onClick;
        // this.view.click = this.onClick;

        // this.buttonMode = true;
        // this.view.interactive = true;

        // spinButton.x = app.renderer.width - spinButton.width;
        // spinButton.y = app.renderer.height - spinButton.height;
        // app.stage.addChild(spinButton);

        // this._spinButton.tap = this.onClick;
        // this._spinButton.click = this.onClick;

        // this.setState(true);

    }

    setState(isEnabled){
        var texture = isEnabled ? this._textureEnabled : this._textureDisabled;

        if (!this._spinButton)
            this._spinButton = new PIXI.Sprite(texture);
        else
           this._spinButton.texture = texture;

        // this.spinButton.buttonMode = true;
    }

    // onClick(){
    //     alert("clicked");
    // }

    // onClick(callback){
    //    this.onClick = callback;
    // }

    // get view(){
    //     return this.view;
    // }
}