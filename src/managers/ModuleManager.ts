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
        
        private _instanceMap                : Map<HTMLElement, ModuleDataHolder> = new Map();
        private _namespaces                 : string[]                           = [];
        
        //************************************************************
        //* Ctor
        //************************************************************

        // this is a singleton
        private constructor() { }
        
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
        }

        /**
         * 
         * @param moduleElement
         * @returns {boolean} - true if module was successfully created 
         */
        public createModule(moduleElement: HTMLElement): boolean {
            if (this.isModule(moduleElement)) {
                let moduleName  : string    = moduleElement.getAttribute(Constants.Common.MODULE_JS_ATTRIBUTE_NAME),
                    instance    : IModule   = Utils.Activator.tryCreateInstanceWithinNamespaces<IModule>(moduleName, this._namespaces);
                
                if (instance == null) {
                    throw new Error(`The module with name [${moduleName}] couldn't be created within these namespaces [${this._namespaces.join(", ")}]`);
                }
                
                instance.init(moduleElement);
                this._instanceMap.set(moduleElement, {
                    element     : moduleElement,
                    module      : instance,
                    children    : this._getAllModuleElements(moduleElement),
                    loaded      : false
                });
                
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
                if(value.loaded === false) {
                    value.module.load();
                    value.loaded = true;
                } 
            });
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
    }
}