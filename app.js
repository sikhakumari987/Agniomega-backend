const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const homeRoutes = require('./routes/home');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const editorRoutes = require('./routes/editor');
const aboutRoutes = require('./routes/about');
const contactRoute = require('./routes/contact');
const blogPageRoutes = require("./routes/blogPage");
const blogRoutes = require("./routes/blog");
const careerContentRoutes = require("./routes/career");
const careerWorkRoutes = require("./routes/careerWork");
const careerPositionRoutes = require('./routes/careerPosition');
const teamContentRoutes = require('./routes/team');
const teamMemberRoutes = require('./routes/teamMember');

require('dotenv').config();

const connectWithDatabase = async()=>{
    try{
        await mongoose.connect(process.env.MongoDb)
        console.log('connected with database')
    }
    catch(err)
    {
        console.log(err)

    }
}
connectWithDatabase()

app.use(bodyParser.json())
app.use(fileUpload({
    useTempFiles : true,
    // tempFileDir : '/tmp/'
}));

app.use(cors()); 
app.use(express.json());
app.use('/api/homePage', homeRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user/editor', editorRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/contact', contactRoute);
app.use("/api/blogPage", blogPageRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/careerContent", careerContentRoutes);
app.use("/api/careerWork", careerWorkRoutes);
app.use("/api/careerPosition", careerPositionRoutes);
app.use("/api/teamContent", teamContentRoutes);
app.use("/api/teamMember", teamMemberRoutes);

module.exports = app;