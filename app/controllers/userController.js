const StrongParams = require('../helpers/strongParams');
const { logger, requestLogger } = require('../../configs/logger');
const path = require('path');
const { User } = require(path.join(process.cwd(), 'app/models'));
const UserSerializer = require('../serializers/userSerializer');

const UsersController = {
  // Get all user records
  index: (req, res) => {
    const queryOptions = {};
    const fields=req.query.fields?req.query.fields.split(',').map(f=>f.trim()):null;
    if (fields) queryOptions.attributes = fields;
    User.findAll(queryOptions)
      .then(users => {
        res.status(200).json({ users: UserSerializer.serializeMany(users) });
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        // see if its server error or bad request
        logger.error('UserController#index', 'Error fetching users', { errors: err.message, request: req.query });
        if (err.name === 'SequelizeDatabaseError') {
          res.status(400).json({ message: 'Bad request', errors: err.message });
          return;
        }
        res.status(500).json({ message: 'Internal server error' });
      });
    return;
  },

  // Create a new user record
  create: (req, res) => {
    const allowedParams = ['first_name', 'last_name', 'email', 'gender', 'ip_address', 'phone_number', 'username', 'active'];
    const requiredParams = ['first_name', 'last_name', 'email', 'gender'];
    const params = new StrongParams(req.body, allowedParams, requiredParams, true, ['user']);

    console.log('StrongParams:', params);

    // Check for required params
    if (!params.require) {
      // Handle missing required params
      return params.handleMissingRequiredParameters(res);
    }
    // Filter only allowed params
    const filteredParams = params.permit(allowedParams);

    // Proceed with filteredParams
    payload = filteredParams;
    User.create(payload)
      .then(user => {
        res.status(201).json({ user: UserSerializer.serialize(user) });
      })
      .catch(err => {
        console.error('Error creating user:', err);
        res.status(400).json({ message: 'Bad request', errors: err.errors.map((er) => er.message) });
      });
  },

  // Get a single user record by ID
  show: (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = USER_DATA.find(u => u.id === userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  },

  // Update a user record
  update: (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const userIndex = USER_DATA.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      const updatedUser = { ...USER_DATA[userIndex], ...req.body };
      USER_DATA[userIndex] = updatedUser;
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  },

  // Delete a user record
  destroy: (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const userIndex = USER_DATA.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      USER_DATA.splice(userIndex, 1);
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  }
};

module.exports = UsersController;