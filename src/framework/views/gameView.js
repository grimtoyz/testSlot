'use strict';


import SpinButton from "../components/spinButton";
import StateMachine from "../components/stateMachine/stateMachine";
import SlotStateIdle from "../components/stateMachine/states/slotStateIdle";
import SlotStatePreSpinAnimating from "../components/stateMachine/states/slotStatePreSpinAnimating";
import ReelView from "./reelView";


export default class GameView extends PIXI.Container{

    constructor(symbolIDsOfEveryReel) {
        super();

        this.fillBackGround();
        this.createReels(symbolIDsOfEveryReel);
        this.createSpinButton();

        this.setupStateMachine();
        // this.setupTicker();
    }

    fillBackGround() {
        let bg = new PIXI.Sprite(
            PIXI.utils.TextureCache["BG.png"]
        );

        this.addChild(bg);
    }

    createReels(symbolIDsOfEveryReel){
        this._reelView = new ReelView(symbolIDsOfEveryReel);
        this.addChild(this._reelView);
    }

    createSpinButton(){
        var textureEnabled = PIXI.utils.TextureCache["BTN_Spin.png"];
        var textureDisabled = PIXI.utils.TextureCache["BTN_Spin_d.png"];

        this._spinButton = new SpinButton(textureEnabled, textureDisabled);
        this._spinButton.interactive = true;
        this._spinButton.buttonMode = true;

        this.setSpinButtonPosition();
        this.addChild(this._spinButton);

        this._spinButton.tap = this.onClick.bind(this);
        this._spinButton.click = this.onClick.bind(this);
    }

    setSpinButtonPosition(){
        this._spinButton.x = this.DEFAULT_SPIN_BUTTON_POSITION_X;
        this._spinButton.y = this.DEFAULT_SPIN_BUTTON_POSITION_Y;
    }

    setupStateMachine(){
        this._stateMachine = new StateMachine();
        this._stateMachine.switchToState(new SlotStateIdle());
    }

    // setupTicker(){
    //     this._ticker = PIXI.ticker.shared;
    //     this._ticker.autoStart = true;
    //     this._ticker.add(this.update, this);
    // }

    // update(deltaTime) {
    //     // this.reels.forEach(function(item) {
    //     //     item.update(deltaTime);
    //     // });
    //     this._stateMachine.update(deltaTime);
    // }

    startSpinning(){
        this._stateMachine.switchToState(new SlotStatePreSpinAnimating(this._reelView));
    }

    stopSpinning(symbolsToStopAt){

    }

    onClick(){
        this.onSpinClickedCallback();
    }

    onSpinClickedCallback(callback){
        this.onSpinClickedCallback = callback;
    }

    onStopClickedCallback(callback){
        this.onStopClickedCallback = callback;
    }

    get DEFAULT_SPIN_BUTTON_POSITION_X(){
        return 824;
    }

    get DEFAULT_SPIN_BUTTON_POSITION_Y(){
        return 218;
    }

    // get REEL_OFFSETS_X(){
    //     return [70, 310, 553];
    // }
}