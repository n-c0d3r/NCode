framework.NClass=(name,__class,debug)=>{

    var result=class extends __class{
        constructor(){
            super();
            this.name=name;
            this.childs=new Object();

            if(debug!=null){
                debug.SetUpFor(this);
            }


        }
        baseSetUp(){
            if(this.SetUp!=null)
                this.SetUp();
        }
        baseStart(){
            if(this.Start!=null)
                this.Start();
    
        }



    }

    result=new result();
    return result;

} 
