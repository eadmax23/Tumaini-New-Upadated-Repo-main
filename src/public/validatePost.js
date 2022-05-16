
var content = document.getElementById("content")
var title = document.getElementById("title")
var form = document.getElementById("form");
var snippet = document.getElementById("snippet")
var err = [];


form.addEventListener('submit', (even)=>
{
    console.log("submitted...")
    if(title.value.length > 90)
    {
        err.push({name: "Title is too long(Lenght 15)"})
    }
    if(content.value.length > 2500)
    {
        err.push({name: "The content is too long"})
    }
    if(snippet.value.length > 300)
    {
        err.push({name: 'The sippet is too long.'})
    }
    if(err.length > 1)
    {
        even.preventDefault();
        for(let y = 0; y<err.length; y++)
        {
            console.log(err[y].name)
        }
    }
})
