/**
 * Created by Sten Marius on 23.06.2017.
 */

namespace ModulesJS.Core.Factories {
    "use strict";

    /**
     * A default module factory that does nothing more than create the module instance. 
     */
    export class ModuleFactory implements Abstract.IModuleFactory {
        public create(moduleElement: HTMLElement, namespaces: string[]): Abstract.IModule {
            let moduleName  : string           = moduleElement.getAttribute(Constants.Common.MODULE_JS_ATTRIBUTE_NAME),
                instance    : Abstract.IModule = Utils.Activator.tryCreateInstanceWithinNamespaces<Abstract.IModule>(moduleName, namespaces);
            
            // if module failed to instantiate we throws an exception. 
            if (instance == null) {
                throw new Error(`The module with name [${moduleName}] couldn't be created within these namespaces [${namespaces.join(", ")}]`);
            }
            
            return instance;
        }
    }
}