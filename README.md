# ModuleJS

## Intro
A lightweight javascript library that provides an easy and effortless instantiation of javascript modules.   

## Install

> `Install-Package ModuleJs`

## Example

```html
<html>
<head>...</head>
<body>
    <div data-module="MyModule">
        <p>Hello world</p>
    </div>
    <script src="scripts/modulejs.js">
    <script>
        ModulesJS.Core.Managers.ModuleManager.instance
            .configure({ namespaces: ["Modules"]}).init();

        (function(Modules) {
            Modules.MyModule = function() {
                //...
            };
            Modules.prototype = {
                constructor: Modules.MyModule,
                init: function(moduleHtml) {
                    console.log(moduleHtml);
                }
            }
        })(window.Modules || (window.Modules = {});
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