export default class Home {
    getHome(req, res, next) {
        if(req.session.userEmail) {
            return res.redirect('/jobs');
        } else {
            return res.render('home');
        }
    }

    getErrorPage(req, res, next) {
        return res.render('error404.ejs');
    }
}