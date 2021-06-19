[Render("nf-js")]

[NClass("newfeed")]

class{
    constructor(){
        this.clientSockets=new Object();
    }

    SetUp(){
        this.postElements=new Object();
    }

    Start(){
        this.SetUpNewfeed();
    }

    SetUpNewfeed(){
        this.SetUpUI();
        var nclass=this;
        if(this.show1Post==null){
            if(this.showOtherUserPosts==null){
                firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                        var uid = user.uid;
                        nclass.uid=uid;
                        nclass.server__GetPosts(uid);
                    } else {
                    }
                });
            }
            else{
                firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                        var uid = user.uid;
                        nclass.uid=uid;
                        nclass.server__GetPosts(nclass.otherUid);
                    } else {
                    }
                });
            }
            
        }
        else{
            this.postNClass=framework.ImportNClass('client.pages.newfeed.post');
            this.postNClass.ReSetUp();
        }
        
    }

    SetUpUI(){
        var postsContainerElement=document.createElement('div');
        postsContainerElement.id=`newfeed-posts-container`;

        var nclass=this;

        var styleElement=document.createElement('style');
        styleElement.textContent=`
        
            #newfeed-posts-container{
                position:fixed;
                ${

                    (()=>{
                        if(nclass.showOtherUserPosts==null){
                            return "top:calc(50% - 35vh);";
                        }
                        else{
                            return "top:calc(50% - 30vh);";
                        }
                    })()

                }
                right:calc(50% - 20vw);
                width:40vw;
                height:70vh;
                overflow-x:auto;
                overflow-y:auto;
            }

            #newfeed-posts-container::-webkit-scrollbar{
                display:none;
            }

            .post{
                padding-top:10px;
                display:flex;
                flex-flow:column;
                margin-bottom:50px;
                width:100%;
                background-color:white;
                border-radius:10px;
            }

            .postOwnerAvatar{
                background-size:cover;
                width:80px;
                height:80px;
                border-radius:40px;
            }

            .postOwnerName{
                width:calc(100% - 80px);
                height:100%;
                display:flex;
                flex-flow:row;
                padding-top:20px;
                font-size:30px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                font-weight:500px;
                padding-left:10px;
            }

            .newfeed-post-title{
                font-size:30px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                font-weight:500px;
                width:calc(100% - 40px);
                height:50px;
                padding-left:20px;
                padding-right:20px;
            }

            .newfeed-post-content{
                margin-top:10px;
                margin-bottom:10px;
                padding-left:20px;
                padding-right:20px;
            }

            .comment-container{
                width:100%;
            }

            .comment{
                padding-top:5px;
                padding-bottom:5px;
                padding-left:5px;
                padding-right:5px;
                display:flex;
                flex-flow:column;
                width:calc(100% - 10px);
                background-color:rgba(0,0,0,0.1);
            }
            
            .comment-info{
                display:flex;
                flex-flow:row;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                
            }

            .comment-info-owner-avt{
                width:30px;
                height:30px;
                border-radius:15px;
                background-size:cover;
            }

            .comment-info-owner-name{
                margin-left:10px;
                display:flex;
                flex-flow:column;
                justify-content:space-around;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                font-weight:500;
            }
            
            .comment-content{
                display:flex;
                flex-flow:column;
                padding-left:40px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                
            }

            .comment-input{
                border:none;
                width:calc(100% - 110px);
                margin-left:5px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                font-weight:500;
                background-color:rgba(0,150,255,0.3);
                border-radius:15px;
                padding-left:10px;
                padding-right:10px;
            }

            .comment-input:focus{
                border:none;
                outline:0;
            }

            .comment-reach-btn{
                width:30px;
                height:30px;
                background-color:red;
                margin-left:5px;
                border-radius:15px;
                background-size:cover;
                background-image:url('/images/icons/like.png');
                filter:grayscale(100%);
                transition:0.2s;
            }

            .comment-reach-btn:hover{
                
                width:35px;
                height:35px;
                border-radius:17px;
            }

            .comment-reach-count{
                font-size:large;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                font-weight:500;
                margin-left:5px;
                margin-right:15px;
                padding-top:3px;
            }

        `;
        postsContainerElement.appendChild(styleElement);

        this.postsContainerElement=postsContainerElement;
        
        document.body.appendChild(postsContainerElement);
    }



    async ShowPost(post){
        var postElement=document.createElement('div');
        postElement.className='post';

        var avatarUrl=`/images/avatar/avt-${post.ownerData.avatarId}.png`;

        this.postElements[post.id]=post;

        postElement.innerHTML=`
            <div style='display:flex;flex-flow:row;height:80px;width:calc(100% - 20px);margin-bottom:10px;padding-left:10px;padding-right:10px;'>
                <div class='postOwnerAvatar' style="background-image:url('${avatarUrl}')" onclick="window.location.href='${window.origin+'/userInfo/'+post.owner}';">
                </div>
                <div class='postOwnerName' onclick='window.location.href=window.origin+"/posts/${post.id}";'>${post.ownerData.name}</div>
            </div>
            <div style='width:100%;height:1px;background-color:rgba(0,0,0,0.2);'></div>
            
        `;

        postElement.innerHTML+=post.innerHTML+`
            <div style='width:100%;height:1px;background-color:rgba(0,0,0,0.2);margin-bottom:10px;'></div>
        
            <div style='display:flex;flex-flow:row;width:100%;margin-bottom:10px;'>
                <div class='comment-container'>
                    
                </div>
            </div>

            
            <div style='width:100%;height:1px;background-color:rgba(0,0,0,0.2);margin-bottom:10px;'></div>
            <div style='display:flex;flex-flow:row;width:100%;margin-bottom:10px;'>
                <div class='comment-reach-btn' onclick='framework.ImportNClass("client.pages.newfeed").Reach(${post.id});'>
                </div>
                <div class='comment-reach-count'>
                    ${Object.keys(post.reachs).length}
                </div>
                <input type='text' class='comment-input' >
                    
            </div>
        
        `;

        postElement.owner=post.owner;
        postElement.privacy=post.privacy;

        var nclass=this;

        var input=postElement.getElementsByClassName('comment-input')[0];
        input.addEventListener('keydown',(e)=>{
            if(e.key=="Enter"){
                nclass.AddComment(input.value,post.id);
                input.value='';
            }
        });
        
        this.postElements[post.id].reachBtn=postElement.getElementsByClassName('comment-reach-btn')[0];
        this.postElements[post.id].reachCount=postElement.getElementsByClassName('comment-reach-count')[0];
        if(post.reachs[this.uid]==null)
            this.postElements[post.id].reached=false;
        else{
            this.postElements[post.id].reached=true;
            this.postElements[post.id].reachBtn.style='filter:grayscale(0%)';
        }

        this.postElements[post.id].commentContainer=postElement.getElementsByClassName('comment-container')[0];




        this.UpdatePostComments(post.id,post.comments);

        this.postsContainerElement.appendChild(postElement);
    }


    Reach(postId){

        var postElement=this.postElements[postId];
        postElement.reached=!postElement.reached;

        if(postElement.reached){
            this.server__Reach(this.uid,postId);
            postElement.reachBtn.style='filter:grayscale(0%)';

        }
        else{
            this.server__UnReach(this.uid,postId);
            postElement.reachBtn.style='filter:grayscale(100%)';

        }

    }



    server__Reach(uid,postId,clientSocket){
        var serverPostsNClass=framework.ImportNClass('server.user.posts');
        serverPostsNClass.Reach(uid,postId);
        var post=serverPostsNClass.posts[postId];
        try{
            this.client__UpdateReach(post,postId,clientSocket);

        }
        catch{

        }
    }

    client__UpdateReach(post,postId){
        var reachCount=Object.keys(post.reachs).length;
        this.postElements[postId].reachCount.textContent=reachCount;
    }

    server__UnReach(uid,postId,clientSocket){
        var serverPostsNClass=framework.ImportNClass('server.user.posts');
        serverPostsNClass.UnReach(uid,postId);
        var post=serverPostsNClass.posts[postId];
        try{
            this.client__UpdateReach(post,postId,clientSocket);

        }
        catch{

        }
        
    }

    client__UpdatePostComments(postId,comments){
        this.UpdatePostComments(postId,comments);
    }

    async UpdatePostComments(postId,comments){
        var postElement=this.postElements[postId];
        var fullInnerHTML=``;
        for(var i=0;i<comments.length;i++){
            var comment=comments[i];
            var owner=await firebase.firestore().collection('users').doc(comment.owner).get();
            owner=owner.data(); 
            var avatarUrl=`/images/avatar/avt-${owner.avatarId}.png`;
            var name=`${owner.name}`;
            var content=`${comment.content}`;
            var innerHTML=`
            <div class='comment'>
                <div class='comment-info'>
                    <div class='comment-info-owner-avt' style="background-image:url('${avatarUrl}');" onclick="window.location.href=window.origin+'/userInfo/${comment.owner}'">

                    </div>
                    <div class='comment-info-owner-name'>
                        ${name}
                    </div>
                </div>
                <div class='comment-content'>
                    ${content}
                </div>
            </div>
            `;
            fullInnerHTML+=innerHTML;
        }
        postElement.commentContainer.innerHTML=fullInnerHTML;
        
    }

    async server__GetPosts(uid,clientSocket){
        this.clientSockets[uid]=clientSocket;
        var postsNClass = framework.ImportNClass('server.user.posts');
        var usersDataNClass = framework.ImportNClass('server.user.data');
        var users = usersDataNClass.users;
        var posts = postsNClass.posts;
        var user=users[uid];
        var postIds=Object.keys(user.posts);
        Object.assign(postIds,Object.keys(user.sharedPosts));
        var userPosts=new Object();
        var fireStore=framework.ImportNClass('server.firebase.firestore').fireStore;
        for(var pid of postIds){
            userPosts[pid]=posts[pid];
            userPosts[pid].id=pid;
            var frFBownerData = await fireStore.collection('users').doc(posts[pid].owner).get();
            frFBownerData=frFBownerData.data();
            userPosts[pid].ownerData=users[posts[pid].owner];
            Object.assign(userPosts[pid].ownerData,frFBownerData);
        }
        this.client__ShowPosts(userPosts,clientSocket);
    }

    client__ShowPosts(userPosts){
        this.userPosts=userPosts;
        this.postIds=Object.keys(userPosts);
        var keys=Object.keys(this.userPosts);
        for(var i=keys.length-1;i>=0;i--){
            var key = keys[i];
            this.ShowPost(this.userPosts[key]);
        }
    }

    AddComment(content,postId){
        var nclass=this;
        var comment={
            "owner":nclass.uid,
            "content":content
        }
        this.server__AddComment(comment,postId);
    }

    server__AddComment(comment,postId){
        var postsNClass = framework.ImportNClass('server.user.posts');
        var post=postsNClass.posts[postId];
        var comments=post.comments;
        post.comments.push(comment);
        var sentClientSockets=new Object();


        var powner=post.owner;
        var clientSocket=this.clientSockets[powner];
        sentClientSockets[powner]=true;
        this.client__UpdatePostComments(postId,post.comments,clientSocket);

        for(var c of comments){
            var owner=c.owner;
            if(sentClientSockets[owner]!=true){

                var clientSocket2=this.clientSockets[owner];
                sentClientSockets[owner]=true;
                try{
                    this.client__UpdatePostComments(postId,post.comments,clientSocket2);

                }
                catch{

                }
            }
        }


    }

}