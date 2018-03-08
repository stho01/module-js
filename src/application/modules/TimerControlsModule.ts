namespace Application.Modules {
    "use strict";

    export interface TimerControlsModuleOptions {
        
        /**
         * Defines the container element that the modules shall be appended to.
         */
        appendToElementSelector : string;

        /**
         * Defines what template element to use. 
         */
        templateSelector        : string;

        /**
         * Id of the button that removes all modules
         * that was added.
         */
        btnRemoveId: string;

        /**
         * Id of the button that adds a module
         * to the element with the appendToElementSelector. 
         */
        btnAddId: string;
    }

    /**
     * Default module options.
     * @type {{appendToElementSelector: string; templateSelector: string}}
     * @private
     */
    let _defaultOptions         : TimerControlsModuleOptions = {
        appendToElementSelector : "main",
        templateSelector        : "#TimerClockTemplate",
        btnRemoveId             : "btnRemoveModule",
        btnAddId                : "btnAddModule"
    };

    /**
     * A module that contains two buttons 
     * One button for parsing a module template and add it to a given container.
     * One button for removing all appended modules from DOM.
     */
    export class TimerControlsModule implements ModulesJS.Core.Abstract.IModule {

        //***************************************************
        //** CLASS VARIABLES AND ATTRIBUTES
        //***************************************************
        
        protected readonly _options: TimerControlsModuleOptions;
        private readonly _domParser: DOMParser;
        protected _moduleHtml: HTMLElement;

        //***************************************************
        //** CONSTRUCTOR
        //***************************************************

        constructor(options?: Partial<TimerControlsModuleOptions>) {
            this._options   = Object.assign({}, _defaultOptions, options);
            this._domParser = new DOMParser();
        }
        
        //***************************************************
        //** PUBLIC MEMBERS FUNCTIONS
        //***************************************************

        /**
         * Initializes module.
         * @param moduleHtml
         */
        init(moduleHtml): void {
            this._moduleHtml = moduleHtml;
        }

        /**
         * Loads module 
         */
        onLoad(): void {
            this._moduleHtml.addEventListener("click", this._onModuleClickEventHandler.bind(this));
        }

        /**
         * Disposes module
         */
        dispose(): void {
            this._moduleHtml.removeEventListener("click", this._onModuleClickEventHandler.bind(this));
        }

        /**
         * Remove all modules that was added. 
         */
        removeAll(): void {
            let createdModules: HTMLElement[]
                    = Array.from(document.querySelectorAll(".created-module"));
            
            createdModules.forEach((module) => module.parentNode.removeChild(module));
        }

        /**
         * Adds a module to the container selected with the appendToElementSelector option.
         */
        addModule(): void {
            let container       : HTMLMainElement|null  = document.querySelector(this._options.appendToElementSelector),
                template        : string                = (document.querySelector(this._options.templateSelector) as HTMLElement).innerText,
                templateDoc     : Document              = this._domParser.parseFromString(template, "text/html"),
                moduleElement   : Element|null          = templateDoc.body.firstElementChild;

            moduleElement.classList.add("created-module");
            container.appendChild(moduleElement);
        }
        
        //********************************************
        //** event handlers:
        //*******************************************

        /**
         * Handles all module click events. 
         * 
         * @param {Event} event
         * @private
         */
        private _onModuleClickEventHandler(event: Event): void {
            if (event.target instanceof Element) {
                switch (event.target.id) {
                    case this._options.btnAddId     : this.addModule(); break;
                    case this._options.btnRemoveId  : this.removeAll(); break;
                } 
            }
        }
    }
}