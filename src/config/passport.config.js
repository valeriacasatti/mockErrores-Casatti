import passport from "passport";
import localStrategy from "passport-local";
import { createHash, isValidPassword } from "../utils.js";
import { UsersService } from "../services/users.service.js";
import { config } from "./config.js";
import GithubStrategy from "passport-github2";
import jwt from "passport-jwt";
import { CreateUser } from "../dao/dto/createUserDto.js";

const JWTStrategy = jwt.Strategy;
const extractJwt = jwt.ExtractJwt;

export const initializePassport = () => {
  //signup
  passport.use(
    "signupLocalStrategy",
    new localStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        const { firstName, lastName, age } = req.body;
        let role;

        try {
          const user = await UsersService.getUserByEmail(username);

          if (
            username === "adminCoder@coder.com" &&
            password === "adminCod3r123"
          ) {
            role = "admin";
          } else {
            role = "user";
          }

          if (user) {
            //usuario ya registrado
            return done(null, false);
          }
          //usuario no registrado
          const newUser = {
            firstName,
            lastName,
            age,
            email: username,
            role,
            password: createHash(password),
          };
          const userCreated = await UsersService.addUser(newUser);

          return done(null, userCreated);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  //signup with github
  passport.use(
    "signupGithubStrategy",
    new GithubStrategy(
      {
        clientID: config.github.clientId,
        clientSecret: config.github.clientSecret,
        callbackURL: `http://localhost:8080/api/sessions${config.github.callbackURL}`,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await UsersService.getUserByEmail(profile._json.email);
          if (user) {
            return done(null, user);
          }
          const newUser = {
            fullName: profile._json.name,
            email: profile._json.email,
            password: createHash(profile.id),
          };
          const userCreated = await UsersService.addUser(newUser);
          return done(null, userCreated);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  //log in
  passport.use(
    "loginLocalStrategy",
    new localStrategy(
      {
        usernameField: "email",
      },
      async (username, password, done) => {
        try {
          const user = await UsersService.getUserByEmail(username);
          if (!user) {
            //usuario no registrado
            return done(null, false);
          }
          if (!isValidPassword(password, user)) {
            return done(null, false);
          }
          //luego de validar user registrado y contasena correcta
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  //login with github
  passport.use(
    "loginGithubStrategy",
    new GithubStrategy(
      {
        clientID: config.github.clientId,
        clientSecret: config.github.clientSecret,
        callbackURL: `http://localhost:8080/api/sessions${config.github.callbackUrl}`,
      },
      async (profile, done) => {
        try {
          const user = await UsersService.getUserByEmail(profile._json.email);
          if (!user) {
            return done(null, false);
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  const cookieExtractor = (req) => {
    let token;
    if (req && req.cookies) {
      token = req.cookies["cookieToken"];
    } else {
      token = null;
    }
    return token;
  };

  //extraer token
  passport.use(
    "jwtAuth",
    new JWTStrategy(
      {
        //extraer info del token
        jwtFromRequest: extractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: config.token.privateKey,
      },
      async (jwtPayload, done) => {
        try {
          const result = new CreateUser(jwtPayload);
          return done(null, result); //req.user = info del token
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};
