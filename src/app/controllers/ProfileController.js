docs = [
  {
    title: "biendeptrai",
    summary: "Qua dep trai",
    tags: "deptrai",
    link: "fine",
  },
];
class ProfileController {
  index(req, res) {
    res.render("profile", { docs, style: "app.css" });
  }
}

module.exports = new ProfileController();
