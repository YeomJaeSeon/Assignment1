import {createConnection, getConnection} from 'typeorm';

const connection = {
  async create(){
    await createConnection();
  },

  async close(){
    await getConnection().close(); 
  },

  async clear(){
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    entities.forEach(async (entity) => {
        const repository = connection.getMongoRepository(entity.name);

        try{
            await repository.clear();
        }catch(err){
            console.log(err)
        }

    });
  },
};

export default connection;