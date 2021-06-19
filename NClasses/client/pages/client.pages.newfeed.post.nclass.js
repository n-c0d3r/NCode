[Render("nf-js")]

[NClass("post")]

class{
    constructor(){}

    SetUp(){
        this.newfeedNClass=framework.ImportNClass('client.pages.newfeed');
        this.newfeedNClass.show1Post=true;
    }

    Start(){

    }

    ReSetUp(){
        var nclass=this;

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                nclass.uid = user.uid;
                nclass.ShowPost();
            } else {

            }
        });
    }

    ShowPost(){
        var parts=(window.location.href).split('/');
        var postId=parts[parts.length-1];
        this.postId=postId;
        this.server__GetToShowPost(postId);
    }

    server__GetToShowPost(postId,clientSocket){
        var postsNClass=framework.ImportNClass('server.user.posts');
        var post=postsNClass.posts[postId];
        this.client__ShowPost(post,clientSocket);
    }

    client__ShowPost(post){
        var nclass=this;
        var userPosts=new Object();
        userPosts[nclass.postId]=post;
        this.newfeedNClass.client__ShowPosts(userPosts);
    }

}