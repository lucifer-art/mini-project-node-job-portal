import { getJobs } from "../models/jobs.model.js";
import UserModel from "../models/user.model.js";

export default class Login {
  getLoginPage = (req, res) => {
    return res.render("login", {});
  };

  postRegister = (req, res, next) => {
    const {name, email, password} = req.body;
    UserModel.add(name, email, password);
    res.redirect("/login");
  }

  postLogin(req, res) {
    const { email, password } = req.body;
    const user = UserModel.isValidUser(email, password);
    if (!user) {
      return res.render("home", { errorMessage: "Invalid Credentials" });
    }
    req.session.userEmail = email;
    req.session.userName = user.name;
    res.render("jobs", { jobs: getJobs(), userEmail: req.session.userEmail, userName:req.session.userName });
  }

  logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    });
    res.clearCookie("lastVisit");
  }
}
