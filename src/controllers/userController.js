import userService from "../services/userService";

const handleLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter!",
    });
  }

  const userData = await userService.handleUserLogin(email, password);

  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

const handleGetAllUsers = async (req, res) => {
  const id = req.query.id;

  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameter!",
      users: [],
    });
  }

  const users = await userService.getAllUsers(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    users,
  });
};

const handleCreateNewUser = async (req, res) => {
  const message = await userService.createNewUser(req.body);
  return res.status(201).json(message);
};

const handleEditUser = async (req, res) => {
  let userData = req.body;
  const message = await userService.updateUserInfo(userData);
  return res.status(200).json(message);
};

const handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(404).json({
      errCode: 1,
      errMessage: "Missing required parameter!",
    });
  }

  const message = await userService.deleteUserById(req.body.id);
  return res.status(200).json(message);
};

module.exports = {
  handleLogin,
  handleGetAllUsers,
  handleCreateNewUser,
  handleEditUser,
  handleDeleteUser,
};
