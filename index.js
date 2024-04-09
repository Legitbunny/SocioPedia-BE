const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const { fileURLToPath } =  require("url");
const {register} = require('./controllers/auth.js');
const authRoutes  = require("./routes/auth.js");
const usersRoutes = require("./routes/users.js");
const postsRoutes = require("./routes/posts.js");
const { verifyToken } = require('./middlewares/auth.js');
const { createPost } = require('./controllers/Posts.js');
const User = require('./models/User.js');
const Post = require('./models/Post.js');
const {users, posts } = require('./data/index.js');

// CONFIGURATIONS

dotenv.config();
const app = express();
app.use(cors(
    {
        origin: [""],
        methods: ["GET", "POST"],
        credentials:true,
    }
))
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan("comman"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
// It sets the directory of where we keep our asset
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

// FILE STORAGE
// whenever user upload some images multer will save it in public/assets
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/assets');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});
const upload = multer({storage});
app.get('/', (req, res)=>{
    res.json("success");})

//ROUTES WITH FILES - whenever this route will be hit upload will act as a middlware
// will upload images to public/assets folder before registering (saving into DB)
app.post('/auth/register', upload.single("picture"), register);
app.post('/posts', verifyToken, upload.single("picture"), createPost);

//ROUTES - api mounting
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);

// MONGOOSE SETUP

const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Listening on ${PORT}`))

    //Add data only need one time
    // User.insertMany(users);
    // Post.insertMany(posts);
}).catch((err) => console.log(`${err} did not connect`));

