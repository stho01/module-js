declare module Utils {
    class Activator {
        static tryCreateInstanceWithinNamespaces<T>(name: string, namespaces: string[], constructorArgs?: any[]): T;
        static createInstance<T>(name: string, ...constructorArgs: any[]): T;
        static classExists(name: string): boolean;
    }
}
declare namespace Opt.Constants {
    class Common {
        static readonly OPTIONS_ATTRIBUTE_NAME: string;
    }
}
declare namespace Opt.Factories {
    interface ModuleFactoryOptions {
        removeOptionsAttributeWhenAcquired: boolean;
    }
    class ModuleFactory implements ModulesJS.Core.Abstract.IModuleFactory {
        protected _options: ModuleFactoryOptions;
        constructor(options?: Partial<ModuleFactoryOptions>);
        create(moduleElement: HTMLElement, namespaces: string[]): ModulesJS.Core.Abstract.IModule;
    }
}
declare namespace Opt {
    interface NatorOptions {
        removeAttributeWhenAcquired?: boolean;
    }
    class Nator {
        "use strict": any;
        static readonly instance: Nator;
        private constructor();
        getOptions<T>(elem: HTMLElement, options?: NatorOptions): T;
        hasOptions(elem: HTMLElement): boolean;
        getOptionsAsStringValue(elem: HTMLElement): string;
    }
}
declare module ModulesJS.Core.Abstract {
    interface IDisposable {
        dispose(): void;
    }
}
declare module ModulesJS.Core.Abstract {
    interface IModule extends IDisposable {
        init(moduleHtml: any): void;
        onLoad(): void;
    }
}
declare namespace ModulesJS.Core.Abstract {
    interface IModuleFactory {
        create(moduleElement: HTMLElement, namespaces: string[]): IModule;
    }
}
declare module ModulesJS.Core.Constants {
    class Common {
        static readonly MODULE_JS_ATTRIBUTE_NAME: string;
    }
}
declare namespace ModulesJS.Core.Factories {
    class ModuleFactory implements Abstract.IModuleFactory {
        create(moduleElement: HTMLElement, namespaces: string[]): Abstract.IModule;
    }
}
declare module ModulesJS.Core.Managers {
    interface ModuleManagerOptions {
        namespaces: string[];
        moduleFactory: Abstract.IModuleFactory;
    }
    class ModuleManager {
        static readonly instance: ModuleManager;
        private _options;
        private readonly _instanceMap;
        private readonly _mutationObserver;
        private constructor();
        readonly moduleFactory: Abstract.IModuleFactory;
        configure(options: Partial<ModuleManagerOptions>): ModuleManager;
        init(): void;
        initAndLoadModulesInDOM(): void;
        createModule(moduleElement: HTMLElement): boolean;
        createAllModules(root?: HTMLElement): void;
        loadModules(): void;
        disposeModulesNotInDOM(): void;
        isModule(element: HTMLElement): boolean;
        private _getAllModuleElements(root?, includeSelf?);
        private _onDomMutatedEventHandler(mutations, mutationObserver);
    }
}
