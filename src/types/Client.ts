export default interface DatabaseClient {
  query(query: any): Promise<any>;
};