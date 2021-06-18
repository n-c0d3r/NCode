var post= CreatePost({
      'privacy':'global'
});

post.AddTitle('Hello World')
post.AddContent(`
              This Is First Post In NCode!!!!!
`);
post.AddImage(`url`); 

post.Push();