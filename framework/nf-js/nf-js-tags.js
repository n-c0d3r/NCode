module.exports={
    "Render":{
        process:function(code){
            code.renderType=code.currentTag.args.type;
            code.currentJSText=`
                                var module=new Object();     
                                var modules=new Object();                           
                                module.reuireList=new Object();
            `;
            return code;
        },
        args:["type"]
    },
    "NClass":{
        process:function(code){
            
            code.currentJSText= `
                                
                                
                                module.exports=(framework)=>{

                                    module.framework=framework;
                                    framework.AddCustomRequires(module.reuireList);
                                    return framework.CreateNClass("${code.currentTag.args.name}",${code.jstext}) }
                                
                                module.exports.nfjs=true;

                                return module.exports;
                                
            `;
            return code;
            
        },
        args:["name"]
    },
    "NView":{
        process:function(code){
            code.currentJSText= `
                                
                                    
                                module.exports=(framework)=>{

                                    module.framework=framework;
                                    framework.AddCustomRequires(module.reuireList);
                                    return framework.CreateNView("${code.currentTag.args.name}",${code.jstext}) }

                                module.exports.nfjs=true;
                                
                                return module.exports;
            `;
            return code;
        },
        args:["name"]
    },
    "Require":{
        process:function(code){
            code.currentJSText=`
                                module.reuireList['${code.currentTag.args.varName}']='${code.currentTag.args.varName2}';
                                Object.defineProperty(modules, '${code.currentTag.args.varName}', {
                                    get: function() { 
                                        var m=module.framework.modules['${code.currentTag.args.varName}']
                                        return m;
                                    }
                                });
            `;
            
            return code;
        },
        args:["varName","varName2"]
    }
}