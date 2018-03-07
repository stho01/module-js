/**
 * Created by Sten Marius on 22.06.2017.
 */

namespace Opt {

    export interface NatorOptions {
        removeAttributeWhenAcquired?: boolean;
    }
    
    export class Nator {
        "use strict";

        //***************************************************
        //** CLASS VARIABLES AND ATTRIBUTES
        //***************************************************

        public static readonly instance : Nator = new Nator();

        //***************************************************
        //** CONSTRUCTOR
        //***************************************************

        private constructor() {}

        //***************************************************
        //** PUBLIC MEMBERS FUNCTIONS
        //***************************************************

        /**
         * Gets the options object as an Object parsed from the
         * elements data-options attribute. 
         * 
         * @param elem
         */
        public getOptions<T>(elem: HTMLElement, options?: NatorOptions): T {
            let fn: Function = new Function(`return ${this.getOptionsAsStringValue(elem)};`);
            
            if (options.removeAttributeWhenAcquired === true) {
               elem.removeAttribute(Constants.Common.OPTIONS_ATTRIBUTE_NAME); 
            }
            
            return fn() as T;
        }

        /**
         * Checks if the element has the data-options attribute. 
         * 
         * @param elem
         * @return {boolean}
         */
        public hasOptions(elem: HTMLElement): boolean {
            return elem.hasAttribute(Constants.Common.OPTIONS_ATTRIBUTE_NAME);
        }

        /**
         * Gets the options as string. 
         * 
         * @param elem
         * @return {any}
         */
        public getOptionsAsStringValue(elem: HTMLElement): string {
            if(this.hasOptions(elem)) {
                return elem.getAttribute(Constants.Common.OPTIONS_ATTRIBUTE_NAME);
            }
            return null;
        }
    }    
}
