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

var Opt;

(function(Opt) {
    var Constants;
    (function(Constants) {
        "use strict";
        var Common = function() {
            function Common() {}
            Common.OPTIONS_ATTRIBUTE_NAME = "data-options";
            return Common;
        }();
        Constants.Common = Common;
    })(Constants = Opt.Constants || (Opt.Constants = {}));
})(Opt || (Opt = {}));

var Opt;

(function(Opt) {
    var Factories;
    (function(Factories) {
        "use strict";
        var _defaultOptions = {
            removeOptionsAttributeWhenAcquired: false
        };
        var ModuleFactory = function() {
            function ModuleFactory(options) {
                this._options = Object.assign({}, _defaultOptions, options);
            }
            ModuleFactory.prototype.create = function(moduleElement, namespaces) {
                var moduleName = moduleElement.getAttribute(ModulesJS.Core.Constants.Common.MODULE_JS_ATTRIBUTE_NAME), options = Opt.Nator.instance.getOptions(moduleElement, {
                    removeAttributeWhenAcquired: this._options.removeOptionsAttributeWhenAcquired
                }), instance;
                instance = Utils.Activator.tryCreateInstanceWithinNamespaces(moduleName, namespaces, [ options ]);
                if (instance == null) {
                    throw new Error("The module with name [" + moduleName + "] couldn't be created within these namespaces [" + namespaces.join(", ") + "]");
                }
                return instance;
            };
            return ModuleFactory;
        }();
        Factories.ModuleFactory = ModuleFactory;
    })(Factories = Opt.Factories || (Opt.Factories = {}));
})(Opt || (Opt = {}));

var Opt;

(function(Opt) {
    var Nator = function() {
        function Nator() {}
        Nator.prototype.getOptions = function(elem, options) {
            var fn = new Function("return " + this.getOptionsAsStringValue(elem) + ";");
            if (options.removeAttributeWhenAcquired === true) {
                elem.removeAttribute(Opt.Constants.Common.OPTIONS_ATTRIBUTE_NAME);
            }
            return fn();
        };
        Nator.prototype.hasOptions = function(elem) {
            return elem.hasAttribute(Opt.Constants.Common.OPTIONS_ATTRIBUTE_NAME);
        };
        Nator.prototype.getOptionsAsStringValue = function(elem) {
            if (this.hasOptions(elem)) {
                return elem.getAttribute(Opt.Constants.Common.OPTIONS_ATTRIBUTE_NAME);
            }
            return null;
        };
        Nator.instance = new Nator();
        return Nator;
    }();
    Opt.Nator = Nator;
})(Opt || (Opt = {}));
//# sourceMappingURL=modulejs.js.map