import BaseRepository from "./BaseRepository";
import DatabaseClient from "./Client";
import Wash from "./Wash";

export default abstract class IWashRespository extends BaseRepository<Wash> {
  protected client: DatabaseClient;

  constructor(name: string, databaseClient: DatabaseClient) {
    super(name)
    this.client = databaseClient;
  }
}