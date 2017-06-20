module ModulesJS.Managers {
    "use strict";
    
    //************************************************************
    //* Type aliases. 
    //************************************************************
    
    type IModule = ModulesJS.Abstract.IModule;
    
    //************************************************************
    //* 
    //************************************************************
    
    interface ModuleDataHolder {
        element     : HTMLElement;
        module      : IModule,
        children    : HTMLElement[],
        loaded      : boolean
    }
    
    //************************************************************
    //* 
    //************************************************************
    
    export class ModuleManager {

        //************************************************************
        //* Static Fields
        //************************************************************

        public static readonly instance     : ModuleManager                     = new ModuleManager();
        
        //************************************************************
        //* Fields
        //************************************************************
        
        private readonly _instanceMap           : Map<HTMLElement, ModuleDataHolder> = new Map();
        private readonly _mutationObserver      : MutationObserver;
        private _namespaces                     : string[]                           = [];
        
        //************************************************************
        //* Ctor
        //************************************************************

        // this is a singleton
        private constructor() { 
            this._mutationObserver = new MutationObserver(this._onDomMutatedEventHandler.bind(this));
        }
        
        //************************************************************
        //* Public member functions
        //************************************************************

        /**
         * 
         * @param namespaces
         * @returns {ModulesJS.Managers.ModuleManager}
         */
        public configure(namespaces: string[]): ModuleManager {
            this._namespaces = namespaces;
            return this;
        }

        /**
         * 
         */
        public init(): void {
            this.createAllModules();
            this.loadModules();
            
            this._mutationObserver.observe(document.body, { 
                childList: true, 
                subtree: true
            }); 
        }

        /**
         * 
         * @param moduleElement
         * @returns {boolean} - true if module was successfully created 
         */
        public createModule(moduleElement: HTMLElement): boolean {
            // create module from element if the module is tagged as a module and has not 
            // yet been created. 
            if (this.isModule(moduleElement) && !this._instanceMap.has(moduleElement)) {
                // get the module name and tries to create an instance of the module class. 
                let moduleName  : string    = moduleElement.getAttribute(Constants.Common.MODULE_JS_ATTRIBUTE_NAME),
                    instance    : IModule   = Utils.Activator.tryCreateInstanceWithinNamespaces<IModule>(moduleName, this._namespaces);

                // if module failed to instantiate we throws an exception. 
                if (instance == null) {
                    throw new Error(`The module with name [${moduleName}] couldn't be created within these namespaces [${this._namespaces.join(", ")}]`);
                }
                
                // Initialize the module 
                instance.init(moduleElement);
                
                // Cache module and module meta data. 
                this._instanceMap.set(moduleElement, {
                    element     : moduleElement,
                    module      : instance,
                    children    : this._getAllModuleElements(moduleElement),
                    loaded      : false
                });
                
                // Return true as a sign that the module was 
                // successfully instantiated and initialized. 
                return true;
            }
            
            return false;
        }

        /**
         * 
         * @param root
         */
        public createAllModules(root: HTMLElement = document.body): void {
            this._getAllModuleElements(root, true)
                .forEach((moduleElement: HTMLElement) => 
                    this.createModule(moduleElement));
        }

        /**
         * Loads all modules that has not been loaded yet. 
         */
        public loadModules(): void {
            this._instanceMap.forEach((value: ModuleDataHolder, key: HTMLElement) => {
                if (value.loaded === false) {
                    value.module.onLoad();
                    value.loaded = true;
                }
            });
        }

        /**
         * Dispose all modules that no longer exist in DOM.
         */
        public disposeModulesNotInDOM(): void {
            let disposedModules: ModuleDataHolder[] = [];
            this._instanceMap.forEach((value: ModuleDataHolder, key: HTMLElement) => {
                if (!document.body.contains(value.element)) {
                    value.module.dispose();
                    disposedModules.push(value);
                }
            });
            
            disposedModules.forEach((moduleDH: ModuleDataHolder) => this._instanceMap.delete(moduleDH.element));
        }
        
        /**
         * 
         * @param element
         * @returns {boolean}
         */
        public isModule(element: HTMLElement): boolean {
            if (element == null) {
                return false;
            }
            
            return element.hasAttribute(Constants.Common.MODULE_JS_ATTRIBUTE_NAME);
        }
        
        //************************************************************
        //* Private member functions
        //************************************************************

        /**
         * 
         * @param root
         * @param includeSelf
         * @returns {HTMLElement[]}
         * @private
         */
        private _getAllModuleElements(root: HTMLElement = document.body, includeSelf: boolean = false): HTMLElement[] {
            let moduleNodes: NodeListOf<Element>
                = root.querySelectorAll(`[${Constants.Common.MODULE_JS_ATTRIBUTE_NAME}]`);

            let moduleElements: HTMLElement[] = Array.prototype.slice.apply(moduleNodes); 
            
            if (includeSelf === true && this.isModule(root)) {
                moduleElements.unshift(root);
            }
            
            return (moduleElements || []);
        }
        
        //********************************************************************************
        //** Event handlers
        //********************************************************************************

        /**
         * 
         * @param mutations
         * @param mutationObserver
         * @private
         */
        private _onDomMutatedEventHandler(mutations: MutationRecord[], mutationObserver: MutationObserver): void {
            this.init();
            this.disposeModulesNotInDOM();
        }
    }
}