var ModulesJS;

(function(ModulesJS) {
    var Constants;
    (function(Constants) {
        "use strict";
        var Common = function() {
            function Common() {}
            return Common;
        }();
        Common.MODULE_JS_ATTRIBUTE_NAME = "data-module";
        Constants.Common = Common;
    })(Constants = ModulesJS.Constants || (ModulesJS.Constants = {}));
})(ModulesJS || (ModulesJS = {}));

var ModulesJS;

(function(ModulesJS) {
    "use strict";
    var Main = function() {
        function Main() {}
        Main.run = function() {
            ModulesJS.Managers.ModuleManager.instance.configure([ "ModulesJS.Modules" ]).init();
        };
        return Main;
    }();
    ModulesJS.Main = Main;
})(ModulesJS || (ModulesJS = {}));

var ModulesJS;

(function(ModulesJS) {
    var Managers;
    (function(Managers) {
        "use strict";
        var ModuleManager = function() {
            function ModuleManager() {
                this._instanceMap = new Map();
                this._namespaces = [];
                this._mutationObserver = new MutationObserver(this._onDomMutatedEventHandler.bind(this));
            }
            ModuleManager.prototype.configure = function(namespaces) {
                this._namespaces = namespaces;
                return this;
            };
            ModuleManager.prototype.init = function() {
                this.initAndLoadModulesInDOM();
                this._mutationObserver.observe(document.body, {
                    childList: true,
                    subtree: true
                });
            };
            ModuleManager.prototype.initAndLoadModulesInDOM = function() {
                this.createAllModules();
                this.loadModules();
            };
            ModuleManager.prototype.createModule = function(moduleElement) {
                if (this.isModule(moduleElement) && !this._instanceMap.has(moduleElement)) {
                    var moduleName = moduleElement.getAttribute(ModulesJS.Constants.Common.MODULE_JS_ATTRIBUTE_NAME), instance = Utils.Activator.tryCreateInstanceWithinNamespaces(moduleName, this._namespaces);
                    if (instance == null) {
                        throw new Error("The module with name [" + moduleName + "] couldn't be created within these namespaces [" + this._namespaces.join(", ") + "]");
                    }
                    instance.init(moduleElement);
                    this._instanceMap.set(moduleElement, {
                        element: moduleElement,
                        module: instance,
                        children: this._getAllModuleElements(moduleElement),
                        loaded: false
                    });
                    return true;
                }
                return false;
            };
            ModuleManager.prototype.createAllModules = function(root) {
                var _this = this;
                if (root === void 0) {
                    root = document.body;
                }
                this._getAllModuleElements(root, true).forEach(function(moduleElement) {
                    return _this.createModule(moduleElement);
                });
            };
            ModuleManager.prototype.loadModules = function() {
                this._instanceMap.forEach(function(value, key) {
                    if (value.loaded === false) {
                        value.module.onLoad();
                        value.loaded = true;
                    }
                });
            };
            ModuleManager.prototype.disposeModulesNotInDOM = function() {
                var _this = this;
                var disposedModules = [];
                this._instanceMap.forEach(function(value, key) {
                    if (!document.body.contains(value.element)) {
                        value.module.dispose();
                        disposedModules.push(value);
                    }
                });
                disposedModules.forEach(function(moduleDH) {
                    return _this._instanceMap.delete(moduleDH.element);
                });
            };
            ModuleManager.prototype.isModule = function(element) {
                if (element == null) {
                    return false;
                }
                return element.hasAttribute(ModulesJS.Constants.Common.MODULE_JS_ATTRIBUTE_NAME);
            };
            ModuleManager.prototype._getAllModuleElements = function(root, includeSelf) {
                if (root === void 0) {
                    root = document.body;
                }
                if (includeSelf === void 0) {
                    includeSelf = false;
                }
                var moduleNodes = root.querySelectorAll("[" + ModulesJS.Constants.Common.MODULE_JS_ATTRIBUTE_NAME + "]"), moduleElements = Array.from(moduleNodes);
                if (includeSelf === true && this.isModule(root)) {
                    moduleElements.unshift(root);
                }
                return moduleElements || [];
            };
            ModuleManager.prototype._onDomMutatedEventHandler = function(mutations, mutationObserver) {
                this.initAndLoadModulesInDOM();
                this.disposeModulesNotInDOM();
            };
            return ModuleManager;
        }();
        ModuleManager.instance = new ModuleManager();
        Managers.ModuleManager = ModuleManager;
    })(Managers = ModulesJS.Managers || (ModulesJS.Managers = {}));
})(ModulesJS || (ModulesJS = {}));

var ModulesJS;

(function(ModulesJS) {
    var Modules;
    (function(Modules) {
        "use strict";
        var TestModule = function() {
            function TestModule() {}
            TestModule.prototype.init = function(moduleHtml) {
                console.log("Test module initialized");
            };
            TestModule.prototype.onLoad = function() {
                console.log("Test module loaded");
            };
            TestModule.prototype.dispose = function() {
                console.log("Test module disposed");
            };
            return TestModule;
        }();
        Modules.TestModule = TestModule;
    })(Modules = ModulesJS.Modules || (ModulesJS.Modules = {}));
})(ModulesJS || (ModulesJS = {}));

var ModulesJS;

(function(ModulesJS) {
    var Modules;
    (function(Modules) {
        "use strict";
        var TimerModule = function() {
            function TimerModule() {
                this._startTime = null;
                this._startTime = null;
                this._totalMS = 0;
                this._kill = false;
            }
            TimerModule.prototype.init = function(moduleHtml) {
                console.log("Timer module initialized");
                this._minsSpan = moduleHtml.querySelector('[data-js-hook="tc:mins"]');
                this._secsSpan = moduleHtml.querySelector('[data-js-hook="tc:secs"]');
                this._hsSpan = moduleHtml.querySelector('[data-js-hook="tc:hs"]');
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
            return TimerModule;
        }();
        Modules.TimerModule = TimerModule;
    })(Modules = ModulesJS.Modules || (ModulesJS.Modules = {}));
})(ModulesJS || (ModulesJS = {}));

var Utils;

(function(Utils) {
    "use strict";
    var Activator = function() {
        function Activator() {}
        Activator.tryCreateInstanceWithinNamespaces = function(name, namespaces, constructorArgs) {
            if (constructorArgs === void 0) {
                constructorArgs = [];
            }
            if (name == null) {
                throw new ReferenceError("argument name cannot be null");
            }
            var instance = null;
            constructorArgs.unshift(name);
            if (Activator.classExists(name)) {
                instance = Activator.createInstance.apply(this, constructorArgs);
            } else {
                for (var i = 0; i < namespaces.length; i++) {
                    var fullName = namespaces[i] + "." + name;
                    constructorArgs[0] = fullName;
                    if (Activator.classExists(fullName)) {
                        instance = Activator.createInstance.apply(this, constructorArgs);
                    }
                }
            }
            return instance;
        };
        Activator.createInstance = function(name) {
            var constructorArgs = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                constructorArgs[_i - 1] = arguments[_i];
            }
            if (name == null) {
                throw new ReferenceError("argument name cannot be null");
            }
            var functionPath = name.split(".");
            var currentStepOnPath = window || this;
            for (var i = 0, len = functionPath.length; i < len; i++) {
                currentStepOnPath = currentStepOnPath[functionPath[i]];
            }
            if (typeof currentStepOnPath !== "function") {
                throw new Error("No function or class with name [" + name + "] was found in the system");
            }
            return new (Function.prototype.bind.apply(currentStepOnPath, arguments))();
        };
        Activator.classExists = function(name) {
            if (name == null) {
                return false;
            }
            var functionPath = name.split(".");
            var currentStepOnPath = window || this;
            for (var i = 0, len = functionPath.length; i < len; i++) {
                if (currentStepOnPath === void 0) {
                    return false;
                }
                currentStepOnPath = currentStepOnPath[functionPath[i]];
            }
            return typeof currentStepOnPath === "function";
        };
        return Activator;
    }();
    Utils.Activator = Activator;
})(Utils || (Utils = {}));
//# sourceMappingURL=main.js.map