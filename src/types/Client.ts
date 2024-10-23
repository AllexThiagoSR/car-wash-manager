export default interface DatabaseClient {
  query(query: any): Promise<any>;
  connect(): Promise<void>;
  end(): Promise<void>;
};