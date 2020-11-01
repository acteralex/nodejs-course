const { catcher } = require('../../common/catcher');
const router = require('express').Router();
const loginService = require('./login.service');

router.route('/login').post(
  catcher(async (req, res) => {
    const token = await loginService.login(req.body.login, req.body.password);
    res.status(200).json({ token });
  })
);

module.exports = router;
