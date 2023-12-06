import { usersModel } from "./models/users.model.js";

export class UsersManagerMongo {
  constructor() {
    this.model = usersModel;
  }

  //add user
  async addUser(userInfo) {
    try {
      const result = await this.model.create(userInfo);
      return result;
    } catch (error) {
      console.log(`add user error: ${error.message}`);
      throw new Error(`add user error: ${error.message}`);
    }
  }

  //get user by ID
  async getUserById(id) {
    try {
      const result = await this.model.findById(id);
      return result;
    } catch (error) {
      console.log(`get user by ID error: ${error.message}`);
      throw new Error(`get user by ID error: ${error.message}`);
    }
  }

  //get user by email
  async getUserByEmail(email) {
    try {
      const result = await this.model.findOne({ email: email });
      return result;
    } catch (error) {
      console.log(`get user by email error: ${error.message}`);
      throw new Error(`get user by email error: ${error.message}`);
    }
  }
}
