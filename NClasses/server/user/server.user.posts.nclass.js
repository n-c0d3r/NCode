[Render("nf-js")]

[Require("fs","fs")]

[NClass("posts")]

class{
    constructor(){}

    SetUp(){
        this.ReadPostsData();
    }

    Start(){
        
    }

    GetFromFirestore(){

    }

    ReadPostsData(){
        var fs=modules.fs;
        var path=framework.postsDataDirPath;
        this.posts=JSON.parse(fs.readFileSync(path).toString());
    }

    CreatePost(post,pid){
        this.posts[pid]=post;
        var privacy=post.privacy;
        var usersDataNClass=framework.ImportNClass('server.user.data');
        var users=usersDataNClass.users;
        if(privacy=='global'){
            var uids=Object.keys(users);
            for(var uid of uids){
                if(uid!=post.owner){
                    users[uid].sharedPosts[pid]=pid;
                }
                else{
                    users[uid].posts[pid]=pid;

                }
            }
        }
        else if(privacy=='friends'){
            var uids=Object.keys(users[post.owner].friends);
            for(var uid of uids){
                users[uid].sharedPosts[pid]=pid;
            }
            users[post.owner].posts[pid]=pid;
        }
        this.SavePostsData();
    }
    
    Reach(uid,pid){
        var post = this.posts[pid];
        post.reachs[uid]=(uid);
        this.SavePostsData();
    }

    UnReach(uid,pid){
        var post = this.posts[pid];
        delete post.reachs[uid];
        this.SavePostsData();
    }

    

    SavePostsData(){
        var fs=modules.fs;
        var path=framework.postsDataDirPath;
        try{
            var usersDataNClass=framework.ImportNClass('server.user.data');
            usersDataNClass.SaveUsersData();
            fs.writeFileSync(path,JSON.stringify(this.posts));

        }
        catch{

        }
    }

}