import app from './index';
import { Database } from './database/database';
import datasource from './database/datasource';

const db: Database = new Database();
db.setDatasource(datasource);

app.setDatabase(db);
app.start(3001);


