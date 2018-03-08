window.addEventListener("load", () => {
    
    ModulesJS.ModuleManager.instance
            .configure({
                namespaces: ["Application.Modules"],
                moduleFactory: new Opt.Factories.ModuleFactory()
            })
            .init();
   
    
});
