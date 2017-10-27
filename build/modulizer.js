var ModulesJS;

(function(ModulesJS) {
    var Core;
    (function(Core) {
        var Abstract;
        (function(Abstract) {
            "use strict";
        })(Abstract = Core.Abstract || (Core.Abstract = {}));
    })(Core = ModulesJS.Core || (ModulesJS.Core = {}));
})(ModulesJS || (ModulesJS = {}));

var ModulesJS;

(function(ModulesJS) {
    var Core;
    (function(Core) {
        var Constants;
        (function(Constants) {
            "use strict";
            var Common = function() {
                function Common() {}
                Common.MODULE_JS_ATTRIBUTE_NAME = "data-module";
                return Common;
            }();
            Constants.Common = Common;
        })(Constants = Core.Constants || (Core.Constants = {}));
    })(Core = ModulesJS.Core || (ModulesJS.Core = {}));
})(ModulesJS || (ModulesJS = {}));

var ModulesJS;

(function(ModulesJS) {
    var Core;
    (function(Core) {
        var Factories;
        (function(Factories) {
            "use strict";
            var ModuleFactory = function() {
                function ModuleFactory() {}
                ModuleFactory.prototype.create = function(moduleElement, namespaces) {
                    var moduleName = moduleElement.getAttribute(Core.Constants.Common.MODULE_JS_ATTRIBUTE_NAME), instance = Utils.Activator.tryCreateInstanceWithinNamespaces(moduleName, namespaces);
                    if (instance == null) {
                        throw new Error("The module with name [" + moduleName + "] couldn't be created within these namespaces [" + namespaces.join(", ") + "]");
                    }
                    return instance;
                };
                return ModuleFactory;
            }();
            Factories.ModuleFactory = ModuleFactory;
        })(Factories = Core.Factories || (Core.Factories = {}));
    })(Core = ModulesJS.Core || (ModulesJS.Core = {}));
})(ModulesJS || (ModulesJS = {}));

var ModulesJS;

(function(ModulesJS) {
    var Core;
    (function(Core) {
        var Managers;
        (function(Managers) {
            "use strict";
            var _defaultOptions = {
                namespaces: [],
                moduleFactory: new Core.Factories.ModuleFactory()
            };
            var ModuleManager = function() {
                function ModuleManager() {
                    this._instanceMap = new Map();
                    this._mutationObserver = new MutationObserver(this._onDomMutatedEventHandler.bind(this));
                }
                Object.defineProperty(ModuleManager.prototype, "moduleFactory", {
                    get: function() {
                        return this._options.moduleFactory;
                    },
                    enumerable: true,
                    configurable: true
                });
                ModuleManager.prototype.configure = function(options) {
                    this._options = Object.assign({}, _defaultOptions, options);
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
                        var instance = this.moduleFactory.create(moduleElement, this._options.namespaces);
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
                    return element.hasAttribute(Core.Constants.Common.MODULE_JS_ATTRIBUTE_NAME);
                };
                ModuleManager.prototype._getAllModuleElements = function(root, includeSelf) {
                    if (root === void 0) {
                        root = document.body;
                    }
                    if (includeSelf === void 0) {
                        includeSelf = false;
                    }
                    var moduleNodes = root.querySelectorAll("[" + Core.Constants.Common.MODULE_JS_ATTRIBUTE_NAME + "]"), moduleElements = Array.from(moduleNodes);
                    if (includeSelf === true && this.isModule(root)) {
                        moduleElements.unshift(root);
                    }
                    return moduleElements || [];
                };
                ModuleManager.prototype._onDomMutatedEventHandler = function(mutations, mutationObserver) {
                    this.initAndLoadModulesInDOM();
                    this.disposeModulesNotInDOM();
                };
                ModuleManager.instance = new ModuleManager();
                return ModuleManager;
            }();
            Managers.ModuleManager = ModuleManager;
        })(Managers = Core.Managers || (Core.Managers = {}));
    })(Core = ModulesJS.Core || (ModulesJS.Core = {}));
})(ModulesJS || (ModulesJS = {}));
//# sourceMappingURL=modulizer.js.map