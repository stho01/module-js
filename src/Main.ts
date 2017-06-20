module ModulesJS {
    "use strict";
    
    
    export class Main {
        
        /**
         * Application Entry Point. 
         */
        public static run(): void {
            
            Managers.ModuleManager.instance
                .configure(["ModulesJS.Modules"])
                .init();
        }
    } 
}