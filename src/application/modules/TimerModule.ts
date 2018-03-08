module Application.Modules {
    "use strict";
    
    export interface TimerModuleOptions {
        minuteSpanHook: string;
        secoundHook: string;
        rememberTime: boolean;
    }
    
    let _defaultOptions : TimerModuleOptions = { 
      minuteSpanHook        : "",
      secoundHook           : "",
      rememberTime          : false  
    };
    
    export class TimerModule implements ModulesJS.Core.Abstract.IModule {
        //********************************************************************************
        //** STATIC FIELDS
        //********************************************************************************
        private static readonly _STORED_ST_KEY: string = "timermodule/starttime";
        
        //************************************************************
        //* Fields
        //************************************************************
        
        private readonly _options   : TimerModuleOptions;
        private _minsSpan           : HTMLSpanElement;
        private _secsSpan           : HTMLSpanElement;
        private _hsSpan             : HTMLSpanElement;
        private _totalMS            : number;
        private _crrntDisplayedHs   : number; 
        private _crrntDisplayedSec  : number;
        private _crrntDisplayedMin  : number;
        private _kill               : boolean;
        private _startTime          : number|null = null;
        private _animFrameReqId     : number|null;   

        //************************************************************
        //* Ctor
        //************************************************************

        public constructor(options?: Partial<TimerModuleOptions>) {
            this._options = Object.assign({}, _defaultOptions, options);
            this._startTime = null;
            this._totalMS   = 0;
            this._kill      = false;
        }

        //************************************************************
        //* Public member functions
        //************************************************************

        init(moduleHtml: HTMLElement): void { 
            console.log("Timer module initialized");
            this._minsSpan = moduleHtml.querySelector(`[data-js-hook="tc:mins"]`) as HTMLSpanElement;
            this._secsSpan = moduleHtml.querySelector(`[data-js-hook="tc:secs"]`) as HTMLSpanElement;
            this._hsSpan   = moduleHtml.querySelector(`[data-js-hook="tc:hs"]`) as HTMLSpanElement;
            
            if(this._options.rememberTime) {
                let storedST = parseFloat(localStorage.getItem(TimerModule._STORED_ST_KEY));
                this._startTime =  Number.isNaN(storedST) ? null : storedST;
            }
        }

        onLoad(): void {
            this._minsSpan.innerText = "00";
            this._secsSpan.innerText = "00";
            
            if(this._hsSpan != null) {
                this._hsSpan.innerText = "00";
            }
            
            // start the timer. 
            this._animFrameReqId = requestAnimationFrame(this._tick.bind(this));
            console.log("Timer module loaded and started");
        }

        dispose(): void {
            console.log("Timer module disposed");
            this._kill = true;
            cancelAnimationFrame(this._animFrameReqId);
        }

        //************************************************************
        //* Private member functions
        //************************************************************

        /**
         * 
         * @param deltaTime
         * @private
         */
        private _tick(ts: number): void {
            if(this._startTime == null) {
                this._startTime = ts;
                if(this._options.rememberTime) {
                    localStorage.setItem(TimerModule._STORED_ST_KEY, this._startTime.toString(10));
                }
                console.log("StartTime: ", this._startTime);
            }
            
            if(this._kill === false) {
                this._animFrameReqId = requestAnimationFrame(this._tick.bind(this));
            }
            
            this._totalMS = ts - this._startTime;
            let time = this._calculateTime();
            this._displayTime(time.min, time.sec, time.hs);
        }

        /**
         * 
         * @return {{sec: number, min: number}}
         * @private
         */
        private _calculateTime(): { min: number, sec: number, hs: number } {
            let totalHs       : number = Math.floor(this._totalMS / 10),
                totalSeconds  : number = Math.floor(this._totalMS / 1000),
                hs            : number = totalHs % 100,
                seconds       : number = totalSeconds % 60,
                minutes       : number = Math.floor(totalSeconds / 60);

            return {
                sec: seconds,
                min: minutes, 
                hs: hs
            };
        }
        
        /**
         * 
         * @private
         */
        private _displayTime(minutes: number, seconds: number, hs: number): void {
            // TODO: Use regex instead to replace. 
            
            // don't update if the current displaed is the same as the give minutes parameter. 
            if(this._crrntDisplayedMin != minutes) {
                this._crrntDisplayedMin = minutes;
                this._minsSpan.innerText = minutes < 10 ? `0${minutes.toString(10)}` : minutes.toString(10);
            }

            // don't update if the current displaed is the same as the give seconds parameter. 
            if(this._crrntDisplayedSec != seconds) {
                this._crrntDisplayedSec = seconds;
                this._secsSpan.innerText = seconds < 10 ? `0${seconds.toString(10)}` : seconds.toString(10);
            }
            
            if(this._hsSpan != null && this._crrntDisplayedHs != hs) {
                this._crrntDisplayedHs = hs;
                this._hsSpan.innerText = hs < 10 ? `0${hs.toString(10)}` : hs.toString(10);
            }
        }
    }
}