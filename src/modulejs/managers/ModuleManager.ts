//declare function ModuleJS(options?: PartModulesJS.ModuleManagerOptions): ModulesJS.ModuleManager;

namespace ModulesJS {
    "use strict";
    
    //************************************************************
    //* Type aliases. 
    //************************************************************
    
    type IModule = ModulesJS.Abstract.IModule;
    
    //********************************************************************************
    //** Manager Options
    //********************************************************************************
    
    export interface ModuleManagerOptions {
        namespaces      : string[],
        moduleFactory   : Abstract.IModuleFactory
    }
    
    //************************************************************
    //* 
    //************************************************************
    
    interface ModuleDataHolder {
        element     : HTMLElement;
        module      : IModule,
        children    : HTMLElement[],
        loaded      : boolean
    }
    
    //********************************************************************************
    //** Defaults
    //********************************************************************************
    
    let _defaultOptions: ModuleManagerOptions = {
        namespaces: [],
        moduleFactory: new Factories.ModuleFactory()
    };

    /**
     * 
     */
    export class ModuleManager {
        
        //************************************************************
        //* Fields
        //************************************************************
        
        private _options                        : ModuleManagerOptions;
        private readonly _instanceMap           : Map<HTMLElement, ModuleDataHolder> = new Map();
        private readonly _mutationObserver      : MutationObserver;
      
        //************************************************************
        //* Ctor
        //************************************************************

        public constructor() { 
            this._mutationObserver = new MutationObserver(this._onDomMutatedEventHandler.bind(this));
        }
        
        //********************************************************************************
        //** Accessors
        //********************************************************************************

        /**
         * Gets the current used module factory.
         * 
         * @return {Abstract.IModuleFactory<IModule>}
         */
        public get moduleFactory(): Abstract.IModuleFactory {
            return this._options.moduleFactory;
        }
        
        //************************************************************
        //* Public member functions
        //************************************************************

        /**
         * Configures the manager by overriding the default options.
         *
         * @returns {ModulesJS.Managers.ModuleManager}
         * @param options
         */
        public configure(options: Partial<ModuleManagerOptions>): ModuleManager {
            this._options = Object.assign({}, _defaultOptions, options);
            
            return this;
        }

        /**
         * Finds all modules in DOM and initialize and loads them. 
         * Initializes the DOM mutation observer. 
         */
        public init(): void {
            this.initAndLoadModulesInDOM();
            this._mutationObserver.observe(document.body, {
                childList: true,
                subtree: true
            });
        }

        /**
         * Initializes all modules before loading them.
         */
        public initAndLoadModulesInDOM(): void {
            this.createAllModules();
            this.loadModules();
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
                let instance : IModule = this.moduleFactory.create(moduleElement, this._options.namespaces);
                
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
         * Creates all the modules relative to the root element given. 
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
         * Checks if the element has the module attribute.
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
         * Gets all elements that has the data-module attribute. 
         * 
         * @param root
         * @param includeSelf
         * @returns {HTMLElement[]}
         * @private
         */
        private _getAllModuleElements(root: HTMLElement = document.body, includeSelf: boolean = false): HTMLElement[] {
            let moduleNodes: NodeListOf<HTMLElement> = root.querySelectorAll(`[${Constants.Common.MODULE_JS_ATTRIBUTE_NAME}]`) as NodeListOf<HTMLElement>,
                moduleElements: HTMLElement[] = Array.from(moduleNodes); 
            
            if (includeSelf === true && this.isModule(root)) {
                moduleElements.unshift(root);
            }
            
            return (moduleElements || []);
        }

        //********************************************************************************
        //** Event handlers
        //********************************************************************************

        /**
         * Handle all DOM Mutation events. 
         * 
         * @param mutations
         * @param mutationObserver
         * @private
         */
        private _onDomMutatedEventHandler(mutations: MutationRecord[], mutationObserver: MutationObserver): void {
            // find all new modules in DOM and init and load them 
            this.initAndLoadModulesInDOM();
            // find and dispose all modules that was removed from DOM.
            this.disposeModulesNotInDOM();
        }
    }
}
