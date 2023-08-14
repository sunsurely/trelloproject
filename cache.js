const cache = require('./cacheInit');
const { BoardGroup, User } = require('./models');

class CollaboratorCaching {
  // 해당 보드 조회시 캐싱
  initCachedCollaborators = async (boardId) => {
    try {
      const collaborators = await BoardGroup.findAll({ where: { boardId } });

      cache.set(`cacheKey${collaborators[0].boardId}`, collaborators);
      console.log('collaborator 데이터 캐싱 성공');
    } catch (err) {
      console.log('collaborator 데이터 캐싱 실패', err);
      throw err;
    }
  };

  getCachedCollaborator = (boardId) => {
    try {
      const cachedCollaborator = cache.get(`cacheKey${boardId}`);

      if (cachedCollaborator) {
        console.log('collaborator 데이터 GET 성공');
        return cachedCollaborator;
      }
    } catch (err) {
      console.log('collaborator 데이터 GET 실패', err);
      throw err;
    }
  };
}

module.exports = CollaboratorCaching;
