window.addEventListener("load", () => {
    
    ModulesJS.Core.Managers.ModuleManager.instance
            .configure({
                namespaces: ["Application.Modules"],
                moduleFactory: new Opt.Factories.ModuleFactory()
            })
            .init();
    
});
