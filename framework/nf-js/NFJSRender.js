var nf_js_tags=require('./nf-js-tags');


var renderer=(framework)=>{
    return new class{
        constructor(){

        }

        getTagFromStr(tag,code){
            var tagInfo=new Object();
        
            var tagName="";
        
            var argsStart=0;
        
            var argsEnd=tag.length-1;
        
            for(var i=0;i<tag.length;i++){
                if(tag[i]=="("){
                    tagInfo.name=tagName;
                    argsStart=i+1;
                    break;
                }
                tagName+=tag[i];
            }
            tagInfo.name=tagInfo.name.replace(" ","");
            tagInfo.args=new Object();
        
            var tagTemplate=nf_js_tags[tagInfo.name];

            //console.log(nf_js_tags[tagInfo.name],tagInfo.name);
            
        
            for(var i=argsEnd;i>=argsStart;i--){
                if(code[i]==')'){
                    argsEnd=i-1;
                    break;
                }
            }
        
            var index=0;
        
            var argsStr=tag.slice(argsStart,argsEnd);
        
            var args=argsStr.split('"');
        
            var newArgs=[];
        
            for(var i=1;i<args.length;i+=2){
                newArgs.push(args[i]);
            }
        
            for(var i=0;i<newArgs.length;i++){
                tagInfo.args[tagTemplate.args[i]]=newArgs[i];
            }
        
        
            return tagInfo;
        }
        
        get_nf_js_tags_in_code(code){
            var result=[];
            var isComment=false;
            var isTagClosed=true;
        
            var jstext_start=0;
            var tag="";

            var endTags=code.length-1;

            result.dontUseNFJS=false;

            var tagCount=0;
        
            for(var i=0;i<code.length;i++){
                if(code[i]==`/`&&code[i+1]==`/`)
                    isComment=true;
                if(!isComment){
                    if(!isTagClosed&&code[i]==']'){
                        isTagClosed=true;
                        tagCount++;
                        var tagInfo=this.getTagFromStr(tag,code);
                        result.push(tagInfo);
                        endTags=i;
                        continue;
                    }
                    if(!isTagClosed){
                        tag+=code[i];
        
                    }
                    if(isTagClosed&&code[i]=='['){
                        isTagClosed=false;
                        tag="";
                    }
                    if(((isTagClosed&&code[i]!=' ')&&code[i]!='\n')&&code[i]!='[' && tagCount==0){
                        result.dontUseNFJS=true;
                        break;
                    }
                    if(isTagClosed){
                        if(code[i]!='\n' && code[i]!='\r'){
                            if(code[i]!=' '){
                                break;
                            }
                        }
                    }
                }
                if(isComment&&code[i]=='\n'){
                    isComment=false;
                }
            }

        
            result.endTags=endTags;
            return result;
        }
        
        JSRender(code,filepath,dirname){
            var result=new Object();

            var compiledCode="";

            var renderType="js";
            
        
            var nf_js_tags_in_code=this.get_nf_js_tags_in_code(code);

            if(!nf_js_tags_in_code.dontUseNFJS){
                var codeObjs=[];
            
                for(var i=0;i<nf_js_tags_in_code.length;i++){
                    var tag=nf_js_tags_in_code[i];
                
                
                    var codeObj=new Object();
        
                    codeObj.endTags=nf_js_tags_in_code.endTags;
        
                    codeObj.currentTag=tag;
        
                    codeObj.jstext=code.slice(codeObj.endTags+1,code.length);
        
                    codeObj.currentJSText="";
        
                    var process = nf_js_tags[tag.name].process;
        
                    codeObj=process(codeObj);
        
                    if(codeObj.renderType!=null){
                        renderType=codeObj.renderType;
                    }
    
                    codeObjs.push(codeObj);
    
                }

                if(renderType=="js"){
                    compiledCode=code;
                }
                else if(renderType=="nf-js"){
                    compiledCode+=`
                    __filename='${filepath}';
                    __dirname='${dirname}';
                    
                    `;
                    for(i=0;i<codeObjs.length;i++){
                        compiledCode+=codeObjs[i].currentJSText;
                    }
                }


            }
            else{
                compiledCode=code;
            }
            result.dontUseNFJS=nf_js_tags_in_code.dontUseNFJS;

            result.compiledCode=compiledCode;
        
            return result;
        }

        Import(filepath){
            var last0=filepath.lastIndexOf("\\");
            var last1=filepath.lastIndexOf("/");
            var last=last0;
            if(last1>last0)
                last=last1;
            var dirname=filepath.substring(0,last+1);
            
            var code=require('fs').readFileSync(filepath).toString();

            

            var renderedResult=this.JSRender(code,filepath,dirname);

            var exprts;


            if(renderedResult.dontUseNFJS){
                exprts=require(filepath);
            }
            else{
                var compiledCode=renderedResult.compiledCode;


                exprts=Function(compiledCode)();

            }

            

            

            return exprts;

        }

        ImportJS(filepath){
            var last0=filepath.lastIndexOf("\\");
            var last1=filepath.lastIndexOf("/");
            var last=last0;
            if(last1>last0)
                last=last1;
            var dirname=filepath.substring(0,last+1);
            
            var code=require('fs').readFileSync(filepath).toString();

            var renderedResult=this.JSRender(code,filepath,dirname,false);

            var compiledCode=renderedResult.compiledCode;            
            try{

                return compiledCode;
            }
            catch{
                
            }
        }

    }
}


module.exports=renderer;

