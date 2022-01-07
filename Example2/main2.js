
const getPost = async () =>{
    try {
       const res = await axios.get("https://jsonplaceholder.typicode.com/posts?_limit=20") ;
       
       return res.data ;
    } catch (error) {
            console.log(error);
            return [];
    }

};

const posts = document.querySelector("#posts");

const buildComments = async () =>{

        const data = await getPost() ;
        console.log(data);


        data.map((post , i) =>{

            const col = document.createElement("div");
            col.className = "col-md-6 col-12";
            posts.append(col);

           

            
            const p =document.createElement("p");

             const comment = document.createElement("div");
            
            comment.className = "p-2";
                
            comment.append(p);
            col.append(comment);

            p.innerHTML = post.title ;
            if(i%2 == 0){
                p.className = "text-start text-success mb-1";
            }
            else {
                p.className = "text-end text-warning";
            }


        });
       
};




buildComments();