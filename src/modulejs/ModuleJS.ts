function ModuleJs(options?: Partial<ModulesJS.ModuleManagerOptions>): ModulesJS.ModuleManager {
    let manager: ModulesJS.ModuleManager = new ModulesJS.ModuleManager();
    manager.configure(options);
    manager.init();
    return manager;
}