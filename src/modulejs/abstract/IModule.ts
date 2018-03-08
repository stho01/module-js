module ModulesJS.Abstract {
    
    export interface IModule extends IDisposable {
        init(moduleHtml): void;
        onLoad(): void;
    }
}