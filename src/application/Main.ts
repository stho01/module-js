window.addEventListener("load", () => {
    let manager = new ModulesJS.ModuleManager();
    
    manager.configure({
        namespaces: ["Application.Modules"],
        moduleFactory: new Opt.Factories.ModuleFactory()
    });
    
    manager.init();
});
