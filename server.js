import createError from 'http-errors'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import logger from 'morgan'
import methodOverride from 'method-override'

// import routers
import { router as indexRouter } from './routes/index.js'
import { router as skillsRouter } from './routes/skills.js'

// set up app
const app = express()

// view engine setup
app.set(
  'views',
  path.join(path.dirname(fileURLToPath(import.meta.url)), 'views')
)
app.set('view engine', 'ejs')

// middleware
app.use(function(req, res, next) {
   // Add a time property to the req object
   req.time = new Date().toLocaleTimeString()
  next()
})

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
  express.static(
    path.join(path.dirname(fileURLToPath(import.meta.url)), 'public')
  )
)
app.use(methodOverride('_method'))

// mounted routers
app.use('/', indexRouter)
app.use('/skills', skillsRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export {
  app
}

/* 
1. Use EJS partial views to make your templates more DRY (see link in the Reference section of the lesson) or this link.
2. Add styling or use a CSS framework to make the app look better
3. 1. On the **show** view, display an *Edit Skill* link that, when clicked, displays an **edit** view that displays a form for editing that Dev Skill.
4. When the edit Dev Skill form is submitted, the skill should be updated in the “database” and redirect the user back to the **show** view.
5. Elementary vs. Advanced chosen by user. 
6. Replace Fake DB by MongoDB
// 7. Links and back links

*/