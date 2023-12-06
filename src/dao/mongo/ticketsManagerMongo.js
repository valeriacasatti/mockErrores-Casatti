import { ticketsModel } from "./models/tickets.model.js";

export class TikcketsManagerMongo {
  constructor() {
    this.model = ticketsModel;
  }

  async getAll() {
    try {
      const result = await this.model.find();
      return result;
    } catch (error) {
      console.log(`get tickets error: ${error.message}`);
      throw new Error(`get tickets error: ${error.message}`);
    }
  }

  async addTicket(ticket) {
    try {
      const result = await this.model.create(ticket);
      return result;
    } catch (error) {
      console.log(`add ticket error: ${error.message}`);
      throw new Error(`add ticket error: ${error.message}`);
    }
  }

  async getTicketById(id) {
    try {
      const result = await this.model.findById(id);
      return result;
    } catch (error) {
      console.log(`get ticket by ID error: ${error.message}`);
      throw new Error(`get ticket by ID error: ${error.message}`);
    }
  }
}
