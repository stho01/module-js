/**
 * Created by Sten Marius on 22.06.2017.
 */

namespace ModulesJS.Abstract {
    "use strict";

    
    /**
     * A module factory contract. 
     * Implementations allows control over the module creation and instantiation.   
     */
    export interface IModuleFactory {
        
        /**
         * Create module instance. 
         * 
         * @param {HTMLElement} moduleElement
         * @param {string[]} namespaces
         * @returns {ModulesJS.Abstract.IModule}
         */
        create(moduleElement: HTMLElement, namespaces: string[]): IModule;
    }
}