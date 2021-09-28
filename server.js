const express =require('express')
const mongoose= require('mongoose')
const Article =require('./models/article')

const articleRouter= require('./routes/articles')
const methodOverride= require('method-override')
const app= express()

mongoose.connect('mongodb://localhost/blog', {
   useNewUrlParser: true, useUnifiedTopology: true
},
   () => {
      console.log("Connection to mongodb database was successful!");
    }
);

app.set('view engine','ejs')

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.get('/', async (req,res)=>{
   const articles=  await Article.find().sort({
      createdate: 'desc'})
   res.render('articles/index', {articles: articles})  //want all of my articles in this index page
})


app.use('/articles',articleRouter)
app.listen(8080)