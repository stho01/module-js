/**
 * Created by Sten Marius on 23.06.2017.
 */

namespace Opt.Factories {
    "use strict";

    /**
     * A Module factory that passes inn an options object to the module constructor if the options
     * exists on the module element. 
     */
    export class ModuleFactory implements ModulesJS.Core.Abstract.IModuleFactory {
        
        create(moduleElement: HTMLElement, namespaces: string[]): ModulesJS.Core.Abstract.IModule {
            let moduleName  : string                          = moduleElement.getAttribute(ModulesJS.Core.Constants.Common.MODULE_JS_ATTRIBUTE_NAME),
                options     : Object                          = Nator.instance.getOptions(moduleElement),
                instance    : ModulesJS.Core.Abstract.IModule;

            instance = Utils.Activator.tryCreateInstanceWithinNamespaces<ModulesJS.Core.Abstract.IModule>(moduleName, namespaces, [options]);
            
            // if module failed to instantiate we throws an exception. 
            if (instance == null) {
                throw new Error(`The module with name [${moduleName}] couldn't be created within these namespaces [${namespaces.join(", ")}]`);
            }

            return instance;
        }
        
    }
}