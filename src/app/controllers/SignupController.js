const { query } = require("express");
const User = require("../models/User");
const { FALSE } = require("node-sass");

class SignupController {
    //[GET] /signup
    index(req, res) {
        res.render("signup", { docs, style: "app.css" });
    }

    //[POST] /signup/
    async store(req, res) {
        const formData = {
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            id_docs: req.body.id_docs,
        };

        const user = new User(formData);

        if (req.body.password != req.body.repassword) {
            return res.render("signup", {
                error: "Mật khẩu không trùng khớp",
                style: "app.css",
            });
        }

        try {
            await user.save();
            res.redirect("/login");
        } catch (error) {
            if (error.code === 11000 && error.keyPattern.username === 1) {
                // Trường hợp username bị trùng lặp
                res.render("signup", {
                    error: "Tên đăng nhập đã tồn tại. Vui lòng chọn tên đăng nhập khác.",
                    style: "app.css",
                });
            } else {
                // Trường hợp lỗi khác
                res.render("signup", {
                    error: "Đã xảy ra lỗi. Vui lòng thử lại sau.",
                    style: "app.css",
                });
            }
        }
    }
}

module.exports = new SignupController();
