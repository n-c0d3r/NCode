[Render("nf-js")]

[NClass("setting")]

class{
    constructor(){}

    SetUp(){
    }

    Start(){
        this.edit=false;
        var nclass=this;
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                var uid = user.uid;
                nclass.uid=uid;
                nclass.SetUpUI();
            } else {
            }
        });
    }

    async SetUpUI(){

        this.avatarCount=7;

        var stE=document.getElementById('settingsContainer');
        if(stE!=null){
            stE.remove();
        }

        var userData=await firebase.firestore().collection('users').doc(this.uid).get();
        userData=userData.data();
        this.userData=userData;

        this.settingsContainer=document.createElement('div');
        this.settingsContainer.id=`settingsContainer`;

        var styleElement=document.createElement('style');
        styleElement.textContent=`
            #settingsContainer{
                position:fixed;
                top:25vh;
                left:40vw;
                width:30vw;
                height:50vh;
                overflow-y:auto;
            }
            #settingsContainer::-webkit-scrollbar{
                display:hidden;
            }
            #avatarDemo{
                width:100%;
                height:100px;
                display:flex;
                flex-flow:row;
                justify-content:space-around;
            }
            #avatarShower{
                border-radius:50px;
                height:100px;
                width:100px;
                background-size:cover;
                
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            }
            #avatarChanger{
                color:rgb(150,150,150);
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                margin-bottom:20px;
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                -khtml-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }
            #avatarChanger:hover{
                color:rgb(255,255,255);

            }
            #nameDemo{
                width:100%;
                display:flex;
                flex-flow:row;
                justify-content:space-around;
            }
            #nameShower{
                color:rgb(255,255,255);
                font-size:40px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            }
            #uid{
                color:rgb(100,100,100);
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                margin-bottom:5px;
            }
            #nameChanger{
                color:rgb(150,150,150);
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                margin-bottom:20px;
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                -khtml-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }
            #nameChanger:hover{
                color:rgb(255,255,255);

            }
            #nameInput{
                text-align:center;
                border-radius:15px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                font-weight:500;
                font-size:20px;
                visibility:hidden;
                width:calc(100% - 20px);
                height:30px;
                border:none;
                padding:0;
                margin:0;
                padding-left:10px;
                padding-right:10px;
            }
            #nameInput:focus{
                border:none;
                outline:0;
            }
        `;

        this.settingsContainer.appendChild(styleElement);

        this.settingsContainer.innerHTML+=`
            <div id="avatarDemo">
                <div id="avatarShower" style="background-image:url('/images/avatar/avt-${this.userData.avatarId}.png');">

                </div>
            </div>
            <div style=" width:100%;display:flex;flex-flow:row;justify-content:space-around;">
                <div id="avatarChanger" onclick="framework.ImportNClass('client.pages.setting').ChangerClicked('avt')">
                    Change Avatar
                </div>
            </div>

            <div id="nameDemo">
                <div id="nameShower">
                    ${this.userData.name}
                </div>
            </div>
            <div style=" width:100%;display:flex;flex-flow:row;justify-content:space-around;">
                <div id="uid">
                    (id: ${this.uid})
                </div>
            </div>
            <div style=" width:100%;display:flex;flex-flow:row;justify-content:space-around;">
                <div id="nameChanger" onclick="framework.ImportNClass('client.pages.setting').ChangerClicked('name')">
                    Edit
                </div>
            </div>
            <input type="text" id="nameInput">
        
        `;

        var nclass=this;


        document.body.appendChild(this.settingsContainer);

        var nameInput=document.getElementById('nameInput');
        nameInput.addEventListener("keydown",(e)=>{
            if(e.key=="Enter"){
                nclass.SetUserName(nameInput.value);
                document.getElementById('nameChanger').click();
            }
        });
    }

    SetUserName(name){
        document.getElementById('nameShower').textContent=name;
        this.userData.name=name;
        this.UpdateUserToFS();
    }

    UpdateUserToFS(){
        firebase.firestore().collection('users').doc(this.uid).set(this.userData);
    }


    ChangerClicked(type){
        if(type=="avt"){
            this.ChangeAvt();
        }
        else if(type=="name"){
            this.ChangeName();
        }
    }

    ChangeName(){
        this.edit=!this.edit;
        if(this.edit){
            document.getElementById('nameChanger').textContent="Back";
            var nameInput=document.getElementById('nameInput');
            nameInput.style.visibility="visible";
            
            var nclass=this;

            
            
        }
        else{
            document.getElementById('nameChanger').textContent="Edit";
            document.getElementById('nameInput').style.visibility="hidden";

        }
    }

    ChangeAvt(){
        var avatarId=this.userData.avatarId;
        avatarId++;
        if(avatarId>=this.avatarCount){
            avatarId=0;
        }
        this.userData.avatarId=avatarId;
        
        
        document.getElementById('avatarShower').style.backgroundImage=`url('/images/avatar/avt-${this.userData.avatarId}.png')`;
        document.getElementById('avt').style.backgroundImage=`url('/images/avatar/avt-${this.userData.avatarId}.png')`;

        this.UpdateUserToFS();
    }

    

}