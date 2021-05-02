const mongoApi = require("../mongoApi");

module.exports.decisionGet = (request, response) => {
  mongoApi.find("knowledgeBase").then((res) => {
    response.send(JSON.stringify(res));
  });
};

module.exports.decisionFind = (request, response) => {
  mongoApi.findTo("knowledgeBase",  { $or: [
    { name: { $regex: request.body.search, $options: "i" } },
    { description: { $regex: request.body.search, $options: "i" } },
    { creator: { $regex: request.body.search, $options: "i" } },
    { dateCreate: { $regex: request.body.search, $options: "i" } },
  ]}).then((res) => {
    if (!res. _id) {
      response.send(JSON.stringify(res));
    } else {
      response.statusCode = 400;
      let answer = {statusCode: 400, message: 'not find, decision'};
      response.send(JSON.stringify(answer));
    }
  });
};

module.exports.decisionAdd = (request, response) => {
  mongoApi.findOne("knowledgeBase", { name: request.body.name} ).then((res) => {
    if (!res) {
      mongoApi
        .insertOne("knowledgeBase", request.body)
        .then((res) => {
          response.send(JSON.stringify(res));
        });
    } else {
      response.statusCode = 400;
      let answer = {statusCode: 400, message: 'not added, decision already exists'};
      response.send(JSON.stringify(answer));
    }
  });
};

module.exports.decisionUpdate = (request, response) => {
  mongoApi.updateOne("knowledgeBase", request.body).then((res) => {
    if (res.n > 0) {
      response.send(JSON.stringify(res));
    } else {
      response.statusCode = 400;
      let answer = {statusCode: 400, message: 'element not update decision'};
      response.send(JSON.stringify(answer));
    }

  });
};

module.exports.decisionDelete = (request, response) => {
  mongoApi.deleteOne("knowledgeBase", request.body).then((res) => {
    if (res.n > 0) {
      response.send(JSON.stringify(res));
    } else {
      response.statusCode = 400;
      let answer = {statusCode: 400, message: 'not delete decision'};
      response.send(JSON.stringify(answer));
    }
    
  });
};
