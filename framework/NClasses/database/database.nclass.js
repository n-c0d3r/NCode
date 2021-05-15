var fs=require('fs');
module.exports=(framework)=>{
    return framework.CreateNClass("database",class{
        constructor(){
            
        }

        SetUp(){
            this.ReadData();
        }

        ReadData(){
            this.dataPath=this.framework.dataPath;
            var dataPath=this.dataPath;
            var data=JSON.parse(fs.readFileSync(dataPath).toString());
            this.data=data;
        }

        SaveData(){
            var str=JSON.stringify(this.data);
            fs.writeFileSync(this.dataPath,str);
        }

        Get(path){
            var base=this.data;
            if(path!=null){
                var parts=path.split(".");
                for(var part of parts){
                    base=base[part];
                }
            }
            return base
        }

        Set(path,data){
            var parts=path.split(".");
            var base=this.data;
            for(var i=0;i<parts.length-1;i++){
                base=base[parts[i]];
            }
            base[parts[parts.length-1]]=data;
        }

        Start(){
          
        }


    });
}