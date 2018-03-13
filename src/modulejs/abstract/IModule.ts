module ModulesJS.Abstract {
    
    export interface IModule extends IDisposable {
        init(moduleHtml:HTMLElement): void;
        onLoad(): void;
    }
}