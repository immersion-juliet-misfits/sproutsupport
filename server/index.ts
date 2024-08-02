import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
// import Posts from './routes/postRoute';
import Plants from './routes/plantCareRoutes/plantAddRoutes';
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';
import isAuthenticated from './routes/auth';

const prisma = new PrismaClient();
const { G_CLIENT_ID, G_CLIENT_SECRET } = process.env;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 8000;
const DIST_PATH = path.resolve(__dirname, '../client/dist');

// Middleware to parse JSON bodies
app.use(express.json());
// parses form data
app.use(express.urlencoded({ extended: false }));
// Server to Serve Client
app.use(express.static(DIST_PATH));
app.use('/plants', Plants);

// GAuth Session middleware
app.use(
  session({
    secret: 'your_session_secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365
    }
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

interface User {
  id: number;
  google_id: string | number;
  userName: string | null;
  email: string | null;
  avatar: string | null;
}

passport.use(
  new GoogleStrategy(
    {
      clientID: G_CLIENT_ID as string,
      clientSecret: G_CLIENT_SECRET as string,
      callbackURL: '/auth/google/callback',
    },
    // Setting function User authorization
    (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      doneCB: (error: User, user?: Express.User) => void
    ) => {
      // Temp logging the profile
      // console.log(profile);

      // Prisma method for adding User to DB
      prisma.user
        .findUnique({
          where: { google_id: profile.id },
        })
        .then((user) => {
          if (!user) {
            return prisma.user.create({
              data: {
                google_id: profile.id,
                userName: profile.displayName,
                email: profile.emails?.[0].value,
                avatar: profile.photos?.[0].value,
              },
            });
          }
          return user;
        })
        .then((user) => doneCB(null, user))
        .catch((err) => doneCB(err));
    }
  )
);

// Serialize user into the sessions - tracks Sessions
passport.serializeUser((user: User, doneCB) => {
  doneCB(null, user);
});

// Deserialize user from the sessions
// Kills session on log out
passport.deserializeUser((obj: User, doneCB) => {
  doneCB(null, obj);
});

// Directs users to specific pages based on their login status
app.use((req, res, next) => {
  if (
    req.isAuthenticated() ||
    req.path.startsWith('/auth/google') ||
    req.path.startsWith('/login')
  ) {
    return next();
  } else {
    return res.redirect('/login');
  }
});

// Checking auth for the Client
app.get('/api/checkAuth', (req, res) => {
  res.json({ isAuthenticated: req.isAuthenticated() });
});


// When User navigates to the root ('/') - If logged in, they will be directed to '/home'. If not, to '/login'
app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/home');
  } else {
    res.redirect('/login');
  }
});

// When User navigates to '/login' - if logged in, redirected to '/home'.  If not, to '/login'
app.get('/login', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/home');
  } else {
    res.sendFile(path.join(DIST_PATH, 'index.html'));
  }
});

// Add endpoint to enable logout
app.post('/api/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send('Logout failed');
    }
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.redirect('/login');
    });
  });
});

// Initiates authentication - requests access to User profile & email
app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Authenticates User , handles Google callback, & redirects User to home on successful Google login
app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/home');
  }
);

// Serves the homepage after User logs in (is Authenticated)
app.get('/home', isAuthenticated, (req, res) => {
  res.sendFile(path.join(DIST_PATH, 'index.html'));
});

// handles all path defaults
app.get('*', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
