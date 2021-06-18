[Render("nf-js")]

[Require("fs","fs")]

[NClass("data")]

class{
    constructor(){}

    SetUp(){
        this.ReadUsersData();
    }

    Start(){
        
    }

    GetFromFirestore(){

    }

    ReadUsersData(){
        var fs=modules.fs;
        var path=framework.usersDataDirPath;
        this.users=JSON.parse(fs.readFileSync(path).toString());
    }

    CreateUserData(uid,name){
        var newUser={
            'friends':new Object(),
            'friendRequests':new Object(),
            'sharedPosts':new Object(),
            'posts':new Object()
        };
        this.users[uid]=newUser;
        this.SaveUsersData();
    }

    SaveUsersData(){
        var fs=modules.fs;
        var path=framework.usersDataDirPath;
        try{
            fs.writeFileSync(path,JSON.stringify(this.users));

        }
        catch{

        }
    }

}