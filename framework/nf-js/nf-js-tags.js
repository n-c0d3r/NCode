module.exports={
    "Render":{
        process:function(code){
            code.renderType=code.currentTag.args.type;
            return code;
        },
        args:["type"]
    },
    "NClass":{
        process:function(code){
            
            code.currentJSText= `
                                
                                var module=new Object();
                                
                                module.exports=(framework)=>{
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
                                
                                var module=new Object();
                                    
                                module.exports=(framework)=>{
                                    return framework.CreateNView("${code.currentTag.args.name}",${code.jstext}) }

                                module.exports.nfjs=true;
                                
                                return module.exports;
            `;
            return code;
        },
        args:["name"]
    }
}