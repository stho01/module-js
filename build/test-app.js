var Application;

(function(Application) {
    "use strict";
    var Main = function() {
        function Main() {}
        Main.run = function() {
            ModulesJS.Core.Managers.ModuleManager.instance.configure({
                namespaces: [ "Application.Modules" ],
                moduleFactory: new Opt.Factories.ModuleFactory()
            }).init();
        };
        return Main;
    }();
    Application.Main = Main;
})(Application || (Application = {}));

var Application;

(function(Application) {
    var Modules;
    (function(Modules) {
        "use strict";
        var _defaultOptions = {
            minuteSpanHook: "",
            secoundHook: "",
            rememberTime: false
        };
        var TimerModule = function() {
            function TimerModule(options) {
                this._startTime = null;
                this._options = Object.assign({}, _defaultOptions, options);
                this._startTime = null;
                this._totalMS = 0;
                this._kill = false;
            }
            TimerModule.prototype.init = function(moduleHtml) {
                console.log("Timer module initialized");
                this._minsSpan = moduleHtml.querySelector('[data-js-hook="tc:mins"]');
                this._secsSpan = moduleHtml.querySelector('[data-js-hook="tc:secs"]');
                this._hsSpan = moduleHtml.querySelector('[data-js-hook="tc:hs"]');
                if (this._options.rememberTime) {
                    var storedST = parseFloat(localStorage.getItem(TimerModule._STORED_ST_KEY));
                    this._startTime = Number.isNaN(storedST) ? null : storedST;
                }
            };
            TimerModule.prototype.onLoad = function() {
                this._minsSpan.innerText = "00";
                this._secsSpan.innerText = "00";
                if (this._hsSpan != null) {
                    this._hsSpan.innerText = "00";
                }
                this._animFrameReqId = requestAnimationFrame(this._tick.bind(this));
                console.log("Timer module loaded and started");
            };
            TimerModule.prototype.dispose = function() {
                console.log("Timer module disposed");
                this._kill = true;
                cancelAnimationFrame(this._animFrameReqId);
            };
            TimerModule.prototype._tick = function(ts) {
                if (this._startTime == null) {
                    this._startTime = ts;
                    if (this._options.rememberTime) {
                        localStorage.setItem(TimerModule._STORED_ST_KEY, this._startTime.toString(10));
                    }
                    console.log("StartTime: ", this._startTime);
                }
                if (this._kill === false) {
                    this._animFrameReqId = requestAnimationFrame(this._tick.bind(this));
                }
                this._totalMS = ts - this._startTime;
                var time = this._calculateTime();
                this._displayTime(time.min, time.sec, time.hs);
            };
            TimerModule.prototype._calculateTime = function() {
                var totalHs = Math.floor(this._totalMS / 10), totalSeconds = Math.floor(this._totalMS / 1e3), hs = totalHs % 100, seconds = totalSeconds % 60, minutes = Math.floor(totalSeconds / 60);
                return {
                    sec: seconds,
                    min: minutes,
                    hs: hs
                };
            };
            TimerModule.prototype._displayTime = function(minutes, seconds, hs) {
                if (this._crrntDisplayedMin != minutes) {
                    this._crrntDisplayedMin = minutes;
                    this._minsSpan.innerText = minutes < 10 ? "0" + minutes.toString(10) : minutes.toString(10);
                }
                if (this._crrntDisplayedSec != seconds) {
                    this._crrntDisplayedSec = seconds;
                    this._secsSpan.innerText = seconds < 10 ? "0" + seconds.toString(10) : seconds.toString(10);
                }
                if (this._hsSpan != null && this._crrntDisplayedHs != hs) {
                    this._crrntDisplayedHs = hs;
                    this._hsSpan.innerText = hs < 10 ? "0" + hs.toString(10) : hs.toString(10);
                }
            };
            TimerModule._STORED_ST_KEY = "timermodule/starttime";
            return TimerModule;
        }();
        Modules.TimerModule = TimerModule;
    })(Modules = Application.Modules || (Application.Modules = {}));
})(Application || (Application = {}));
//# sourceMappingURL=test-app.js.map