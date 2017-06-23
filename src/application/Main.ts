module Application {
    "use strict";
    
    export class Main { 
        /**
         * Application Entry Point. 
         */
        public static run(): void {
            ModulesJS.Core.Managers.ModuleManager.instance
                .configure({ 
                    namespaces: ["Application.Modules"],
                    moduleFactory: new Opt.Factories.ModuleFactory()
                })
                .init();
        }
    } 
}