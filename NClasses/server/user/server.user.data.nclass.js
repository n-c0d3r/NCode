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
            "chatrooms":new Object(),
            'sharedPosts':new Object(),
            'posts':new Object()
        };
        var posts=framework.ImportNClass('server.user.posts').posts;
        var postIds=Object.keys(posts);
        for(var postId of postIds){
            var post=posts[postId];
            if(post.privacy=="global"){
                newUser.sharedPosts[postId]=postId;
            }
        }
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