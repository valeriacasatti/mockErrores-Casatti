import { Router } from "express";
import passport from "passport";
import { config } from "../config/config.js";
import { SessionsController } from "../controllers/sessions.controller.js";

const router = Router();

//sign up
router.post(
  "/signup",
  passport.authenticate("signupLocalStrategy", {
    session: false,
    failureRedirect: "/api/sessions/fail-signup",
  }),
  SessionsController.signup
);

//fail signup
router.get("/fail-signup", SessionsController.failSignup);

//log in
router.post(
  "/login",
  passport.authenticate("loginLocalStrategy", {
    session: false,
    failureRedirect: "/api/sessions/fail-login",
  }),
  SessionsController.login
);

//fail login
router.get("/fail-login", SessionsController.failLogin);

//sign up with github
router.get("/signup-github", passport.authenticate("signupGithubStrategy"));
router.get(
  config.github.callbackURL,
  passport.authenticate("signupGithubStrategy", {
    session: false,
    failureRedirect: "/api/sessions/fail-signup",
  }),
  SessionsController.signupGithub
);

//log in up with github
router.get("/login-github", passport.authenticate("loginGithubStrategy"));
router.get(
  config.github.callbackURL,
  passport.authenticate("loginGithubStrategy", {
    session: false,
    failureRedirect: "/api/sessions/fail-login",
  }),
  SessionsController.loginGithub
);

//profile
router.post(
  "/profile",
  passport.authenticate("jwtAuth", {
    session: false,
    failureRedirect: "/api/sessions/fail-auth",
  }),
  SessionsController.profile
);

//fail auth
router.get("/fail-auth", SessionsController.failAuth);

//logout
router.get("/logout", SessionsController.logout);

export { router as sessionsRouter };
