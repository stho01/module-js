# ModuleJS

A lightweight javascript library that provides an easy and effortless instantiation of javascript modules.

## Build Setup

``` bash
# install dependencies
npm install

# Build distribution files
grunt "Build Distribution"

# Build example
grunt "Build Test Application"
```

## Nuget Package

``` bash
# Nuget
https://www.nuget.org/packages/ModuleJS/

# Package Manager
> Install-Package ModuleJs

# .NET CLI
> dotnet add package ModuleJS
```

## TypeScript Example

```ts
// TypeScript Class 
namespace Modules {
    export class MyModule implements ModuleJs.Abstract.IModule {
        /**
         * Initialize module
         */
        init(moduleHtml: HTMLElement): void {
            console.log(moduleHtml);
        }

        /**
         * On load is called after every module on page has initialized.
         */
        onLoad(): void {
            console.log("MyModule loaded");
        }

        /**
         * Dispose is called if module is removed from DOM.
         */
        dispose(): void {
            // Detach event handlers etc.
        }
    }
}
```

```html
<html>
<head>...</head>
<body>
    <div data-module="MyModule">
        <p>Hello world</p>
    </div>
    <script src="scripts/MyModule.js"></script>
    <script src="scripts/modulejs.js"></script>
    <script>
        ModulesJS({ namespaces: ["Modules"]});
    </script>
</body>
</html>
```

## Javascript Example

```html
<html>
<head>...</head>
<body>
    <div data-module="MyModule">
        <p>Hello world</p>
    </div>
    <script src="scripts/modulejs.js"></script>
    <script>
        (function(Modules) {
            Modules.MyModule = function() {
                //...
            };
            Modules.MyModule.prototype = {
                constructor: Modules.MyModule,
                init: function(moduleHtml) {
                    console.log(moduleHtml);
                }
            }
        })(window.Modules || (window.Modules = {}));

        ModulesJS({ namespaces: ["Modules"]});
    </script>
</body>
</html>
```

console log output:

```html
<div data-module="MyModule">
    <p>Hello world</p>
</div>
```

## Run Example

Use any web server you want and host from /wwwwroot.  