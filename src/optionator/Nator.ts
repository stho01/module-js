/**
 * Created by Sten Marius on 22.06.2017.
 */

namespace Opt {

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
        public getOptions<T>(elem: HTMLElement): T {
            let fn: Function = new Function(`return ${this.getOptionsAsStringValue(elem)};`)
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
