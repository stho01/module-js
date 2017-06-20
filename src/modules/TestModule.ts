module ModulesJS.Modules {
    "use strict";
    export class TestModule implements ModulesJS.Abstract.IModule {

        //************************************************************
        //* Fields
        //************************************************************


        //************************************************************
        //* Ctor
        //************************************************************

        public constructor() {

        }

        //************************************************************
        //* Public member functions
        //************************************************************

        init(moduleHtml): void {
            console.log("Test module initialized");
        }

        onLoad(): void {
            console.log("Test module loaded");
        }

        dispose(): void {
            console.log("Test module disposed");
        }

        //************************************************************
        //* Private member functions
        //************************************************************
    }
}