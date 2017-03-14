module Utils {
    "use strict";

    /**
     * The activator class contains various methods for creating
     * a instance of a class.
     */
    export class Activator { 

        /**
         * Tries to create instance within the namespaces given.
         * If the class does not exists null is returned.
         *
         * @param {string}      name                - The name of the class that shall be instantiated
         * @param {string[]}    namespaces          - The namespaces to search within.
         * @param {[]}          [constructorArgs]   - The arguments that is passed in to the constructor upon creation.
         * @returns {T}
         */
        public static tryCreateInstanceWithinNamespaces<T>(name: string, namespaces: string[], constructorArgs: any[] = []): T {
            if (name == null) {
                throw new ReferenceError("argument name cannot be null");
            }

            let instance : T = null;
            constructorArgs.unshift(name);

            if(Activator.classExists(name)) {
                instance = <T>Activator.createInstance.apply(this, constructorArgs);
            } else {
                for (let i = 0; i < namespaces.length; i++) {
                    let fullName = namespaces[i] + "." + name;
                    constructorArgs[0] = fullName;
                    if(Activator.classExists(fullName)) {
                        instance = <T>Activator.createInstance.apply(this, constructorArgs);
                    }
                }
            }

            return instance;
        }

        /**
         * Creates an instance of class name with namespace.
         *
         * @param {string}  name                - The name of the class that shall be instantiated
         * @param {...}     constructorArgs     - The arguments that is passed in to the constructor upon creation.
         * @returns {T}
         */
        public static createInstance<T>(name: string, ...constructorArgs: any[]): T {
            if (name == null) { throw new ReferenceError("argument name cannot be null"); }

            // Splits up the name e.g. Namespace.ClassName = [Namespace, ClassName]   
            let functionPath      : string[]        = name.split(".");

            // can either be a object or a function. 
            // The last result should be a function if not, the class does not exist.
            let currentStepOnPath : Object|Function = (window || this);

            for (let i = 0, len = functionPath.length; i < len; i++) {
                currentStepOnPath = currentStepOnPath[functionPath[i]];
            }

            if (typeof currentStepOnPath !== "function") {
                // The function was not found..
                throw new Error("No function or class with name [" + name + "] was found in the system");
            }

            return new (Function.prototype.bind.apply(currentStepOnPath, arguments));
        }

        /**
         * Checks if a class name is valid and exists.
         *
         * @param {string}  name    - The name of the class that is about to be checked for existence.
         */
        public static classExists(name: string) : boolean {
            if(name == null) {
                return false;
            }

            // Splits up the name e.g. Namespace.ClassName = [Namespace, ClassName]   
            let functionPath        : string[]              = name.split(".");

            // can either be a object or a function. 
            // The last result should be a function if not, the class does not exist.
            let currentStepOnPath   : Object|Function       = (window || this);

            // Loop through the function path and check if the 
            // current step exists in path.
            for (let i = 0, len = functionPath.length; i < len; i++) {
                if(currentStepOnPath === void 0) {
                    return false;
                }
                currentStepOnPath = currentStepOnPath[functionPath[i]];
            }

            return (typeof currentStepOnPath === "function");
        }
    }
}