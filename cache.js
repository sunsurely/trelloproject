const cache = require('./cacheInit');
const { BoardGroup } = require('./models');

class CollaboratorCaching {
  setCachedCollaborators = async (boardId) => {
    try {
      // cache.flushAll();

      const collaborators = await BoardGroup.findAll({
        where: { boardId },
        raw: true,
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

      if (cachedCollaborator) {
        console.log('collaborator 데이터 GET 성공', cachedCollaborator);
        return cachedCollaborator;
      }
    } catch (err) {
      console.log('collaborator 데이터 GET 실패', err);
      throw err;
    }
  };
}

module.exports = CollaboratorCaching;
