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
            }
            ModuleManager.prototype.configure = function(namespaces) {
                this._namespaces = namespaces;
                return this;
            };
            ModuleManager.prototype.init = function() {
                this.createAllModules();
                this.loadModules();
            };
            ModuleManager.prototype.createModule = function(moduleElement) {
                if (this.isModule(moduleElement)) {
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
                        value.module.load();
                        value.loaded = true;
                    }
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
                var moduleNodes = root.querySelectorAll("[" + ModulesJS.Constants.Common.MODULE_JS_ATTRIBUTE_NAME + "]");
                var moduleElements = Array.prototype.slice.apply(moduleNodes);
                if (includeSelf === true && this.isModule(root)) {
                    moduleElements.unshift(root);
                }
                return moduleElements || [];
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
                console.log(moduleHtml);
                alert(moduleHtml);
            };
            TestModule.prototype.load = function() {};
            TestModule.prototype.dispose = function() {};
            return TestModule;
        }();
        Modules.TestModule = TestModule;
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