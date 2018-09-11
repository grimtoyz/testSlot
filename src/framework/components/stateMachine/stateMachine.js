'use strict';


export default class StateMachine{

    constructor() {
    }

    switchToState(newState){
        if (this._currentState)
            this._currentState.destroy();

        this._currentState = newState;
        this._currentState.onStateEnter();
    }

    update(deltaTime){
        // if (this._currentState)
        //     this._currentState.update(deltaTime);
    }

    set states(value){
        this._states = value;
    }

    get states(){
        return this._states;
    }
}