DEBUG=test:* MONGO_URL="mongodb://$(docker-machine ip mongo-01),$(docker-machine ip mongo-02),$(docker-machine ip mongo-03)/?replicaSet=rs0" node index.js
