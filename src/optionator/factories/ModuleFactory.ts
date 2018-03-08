/**
 * Created by Sten Marius on 23.06.2017.
 */

namespace Opt.Factories {
    "use strict";

    
    
    export interface ModuleFactoryOptions {
        removeOptionsAttributeWhenAcquired : boolean;
    }

    let _defaultOptions: ModuleFactoryOptions = {
        removeOptionsAttributeWhenAcquired: false
    };
    
    /**
     * A Module factory that passes inn an options object to the module constructor if the options
     * exists on the module element. 
     */
    export class ModuleFactory implements ModulesJS.Abstract.IModuleFactory {

        /**
         * 
         */
        protected _options: ModuleFactoryOptions;

        /**
         * 
         * @param {Partial<Opt.Factories.ModuleFactoryOptions>} options
         */
        constructor(options?: Partial<ModuleFactoryOptions>) {
            this._options = Object.assign({}, _defaultOptions, options);
        }

        /**
         * 
         * @param {HTMLElement} moduleElement
         * @param {string[]} namespaces
         * @return {ModulesJS.Core.Abstract.IModule}
         */
        create(moduleElement: HTMLElement, namespaces: string[]): ModulesJS.Abstract.IModule {
            let moduleName  : string                          = moduleElement.getAttribute(ModulesJS.Constants.Common.MODULE_JS_ATTRIBUTE_NAME),
                options     : Object                          = Nator.instance.getOptions(moduleElement, {
                    removeAttributeWhenAcquired: this._options.removeOptionsAttributeWhenAcquired
                }),
                instance    : ModulesJS.Abstract.IModule;

            instance = Utils.Activator.tryCreateInstanceWithinNamespaces<ModulesJS.Abstract.IModule>(moduleName, namespaces, [options]);
            
            // if module failed to instantiate we throws an exception. 
            if (instance == null) {
                throw new Error(`The module with name [${moduleName}] couldn't be created within these namespaces [${namespaces.join(", ")}]`);
            }

            return instance;
        }
        
    }
}