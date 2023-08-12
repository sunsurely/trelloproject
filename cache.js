const nodeCache = require('node-cache');
const { BoardGroup } = require('./models');

const cache = new nodeCache({ stdTTL: 1000, checkperiod: 600 });

class CollaboratorCaching {
  setCachedCollaborators = async (boardId) => {
    try {
      const collaborators = await BoardGroup.findAll({
        where: { boardId },
      });

      for (const collaborator of collaborators) {
        cache.set(`cacheKey${collaborator.collaborator}`, collaborator);
      }
      console.log('collaborator 데이터 캐싱 성공');
    } catch (err) {
      console.log('collaborator 데이터 캐싱 실패', err);
      throw err;
    }
  };

  getCachedCollaborator = (collaborator) => {
    try {
      const cachedCollaborator = cache.get(`cacheKey${collaborator}`);

      console.log('collaborator 데이터 GET 성공');
      return cachedCollaborator;
    } catch (err) {
      console.log('collaborator 데이터 GET 실패', err);
      throw err;
    }
  };
}

module.exports = CollaboratorCaching;
