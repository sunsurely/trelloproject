const cache = require('./cacheInit');
const { BoardGroup, User } = require('./models');

class CollaboratorCaching {
  // 서버를 켰을때 BoardGroup 전체 데이터 캐싱
  setCachedCollaborators = async (boardId) => {
    try {
      const collaborators = await BoardGroup.findAll({ where: { boardId } });

      cache.set(`cacheKey${collaborators[0].boardId}`, collaborators);
      console.log('collaborator 데이터 캐싱 성공');
    } catch (err) {
      console.log('collaborator 데이터 캐싱 실패', err);
      throw err;
    }
  };

  // 초대한 멤버 데이터 캐싱
  addCachedCollaborator = async (email) => {
    try {
      const inviteCollaborator = await BoardGroup.findOne({
        include: { model: User, where: { email } },
        raw: true,
      });
      cache.set(`cacheKey${inviteCollaborator.boardId}`, inviteCollaborator);
      console.log('collaborator 데이터 캐싱 추가 성공');
    } catch (err) {
      console.log('collaborator 데이터 캐싱 추가 실패', err);
      throw err;
    }
  };

  // 초대된 멤버 퍼미션 수정시
  modifyCachedCollaborator = async (boardId) => {
    try {
      const modifyCachedCollaborator = await BoardGroup.findOne({
        where: { boardId },
      });

      cache.set(
        `cacheKey${modifyCachedCollaborator.boardId}`,
        modifyCachedCollaborator,
      );
      console.log('캐싱된 데이터 수정 성공');
    } catch (err) {
      console.log('캐싱된 데이터 수정 실패', err);
      throw err;
    }
  };

  deleteCachedCollaborator = async (boardId) => {
    try {
      const cacheKey = `cacheKey${boardId}`;
      const collaborator = cache.get(cacheKey);

      if (collaborator) {
        cache.del(cacheKey);
        console.log('캐싱 삭제 성공');
      }
    } catch (err) {
      console.log('캐싱 삭제 실패', err);
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
