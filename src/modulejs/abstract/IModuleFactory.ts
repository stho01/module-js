/**
 * Created by Sten Marius on 22.06.2017.
 */

namespace ModulesJS.Abstract {
    "use strict";

    
    /**
     * Summary
     */
    export interface IModuleFactory {
        create(moduleElement: HTMLElement, namespaces: string[]): IModule;
    }
}