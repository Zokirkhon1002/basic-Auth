const {Router} = require("express");
const router = Router();
const users = require("../config/users");
const {v4} = require("uuid");
const isAuth = require("../middlewares/auth");





router.get("/", (req,res)=> {
    res.json({msg: users})
})


// Find by Username function
const findByUserName = async (userNameFromFrontEnd)=> {
    const user = users.filter(({username})=> username === userNameFromFrontEnd);
    return user[0]
}


// sign up rorute
router.post("/signup", async (req,res)=> {
    let newUser = {
        id: v4(),
        username: req.body.username,
        password: req.body.password
    }
    if(!req.body.password || !req.body.username){
        return res.status(400).json({msg: "Please add username and password!"})
    }
    let isUniq = users.filter(({username})=> username === req.body.username);
    if(isUniq.length){
        return res.status(400).json({msg: "this user is already registrated, please use another username!"})
    }
    users.push(newUser)
    return res.status(201).json({
        msg: "You are successfully signed up",
        newUser
    })
})

// Sign in route
router.post("/signin", async (req,res)=> {
    const user = await findByUserName(req.body.username);
    if(!user) return res.status(400).json({msg: "Wrong credentionals"});
    const isPasswordMatch = user.password === req.body.password;
    if(!isPasswordMatch) return res.status(400).json({msg: "Wrong credentionals"});

    return res.status(200).json({
        msg: "You are signed in",
        user
    })
})



// Profile route
router.get("/profile", isAuth, (req,res)=> {
    res.json({msg: "You are in your profile!"})
})





module.exports = router;