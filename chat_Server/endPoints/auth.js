const mongoApi = require("../mongoApi");
const uuid = require("uuid");

module.exports.login = (request, response) => {
  mongoApi.findOne("users", request.body).then((res) => {
    response.send(JSON.stringify(res));
  });
};

module.exports.creatAdmin = () => {
  mongoApi.findOne("users", { login: "admin", pass: "admin"}).then((res) => {
    if (!res) {
      mongoApi
        .insertOne("users", { login: "admin", pass: "admin", firstName: 'admin', middleName: 'admin', role:'0'})
        .then((res) => {
          console.log("creatAdmin", JSON.stringify(res));
        });
    } else {
      console.log('Err creatAdmin');
    }
  });
};

// role 
// 0: admin
// 1: user
// 13: client

module.exports.creatClient = (request, response) => {
  const newUuid = uuid.v4();
  console.log('------------------------uuid--------------', newUuid, 'name:uuid', `${request.body.name}:${newUuid}`);

  mongoApi.insertOne("users", { login: "-", pass: "-", firstName: `${request.body.name}:${newUuid}`, middleName: '-', role: '13' } ).then((res) => {
    console.log('res', res);
    if (res) {
      response.send(JSON.stringify(res));
    } else {
      console.log('Err creatClient');
    }
    
  });
};
