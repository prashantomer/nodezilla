class StrongParams {
  constructor(params = {}, allowedKeys = [], requiredKeys = [], nest = false, labels = []) {
    if (nest && labels.length > 0) {
      const resolvedParams = labels.reduce((acc, label) => {
        if (Object.prototype.hasOwnProperty.call(params, label)) {
          acc = params[label];
        }
        return acc;
      }, {});
      this.params = resolvedParams;
      console.log('Nested params resolved:', this.params);
    } else {
      this.params = params;
    }
    this.allowedKeys = allowedKeys;
    this.requiredKeys = requiredKeys;
    this.errors = [];
  }

  permit(allowedKeys = this.allowedKeys) {
    const filtered = {};
    allowedKeys.forEach(key => {
      if (Object.prototype.hasOwnProperty.call(this.params, key)) {
        filtered[key] = this.params[key];
      }
    });
    return filtered;
  }

  require(requiredKeys = this.requiredKeys) {
    requiredKeys.forEach(key => {
      if (!Object.prototype.hasOwnProperty.call(this.params, key)) {
        this.errors.push(`Missing required parameter: ${key}`);
      }
    });
    return this.errors.length === 0;
  }

  handleMissingRequiredParameters(res) {
    if (this.errors.length > 0) {
      res.status(400).json({ errors: this.errors });
      return true;
    }
    return false;
  }
}

module.exports = StrongParams;


/*
  // Example usage in a controller (e.g., UserController.js)

  function createUser(req, res) {
    // Define allowed and required params for this controller
    const allowedParams = ['name', 'email', 'password'];
    const requiredParams = ['name', 'email', 'password'];

    // Initialize StrongParams with request body
    const params = new StrongParams(req.body);

    // Check for required params
    if (!params.require(requiredParams)) {
      // Handle missing required params
      return params.handleMissingRequiredParameters(res);
    }

    // Filter only allowed params
    const filteredParams = params.permit(allowedParams);
    // Example: User.create(filteredParams)
    res.status(201).json({ message: 'User created', data: filteredParams });
  }
*/