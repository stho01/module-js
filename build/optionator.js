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
        var ModuleFactory = function() {
            function ModuleFactory() {}
            ModuleFactory.prototype.create = function(moduleElement, namespaces) {
                var moduleName = moduleElement.getAttribute(ModulesJS.Core.Constants.Common.MODULE_JS_ATTRIBUTE_NAME), options = Opt.Nator.instance.getOptions(moduleElement), instance;
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
        Nator.prototype.getOptions = function(elem) {
            var fn = new Function("return " + this.getOptionsAsStringValue(elem) + ";");
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
//# sourceMappingURL=optionator.js.map