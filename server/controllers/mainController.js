// GET HOME PAGE



const Home= async(req,res)=>{
    const locals={
        title:'Node.js Notes',
        description:'Free Node.js Notes App'
    }
    res.render('index',locals)
}



// GET ABOUT PAGE

const About= async(req,res)=>{
    const locals={
        title:'Node.js Notes',
        description:'Free Node.js Notes App'
    }
    res.render('about',{
        locals,
        layout:'../views/layouts/frontend.ejs'
    })
}



module.exports={
    Home,
    About
}