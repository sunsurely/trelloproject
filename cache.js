const cache = require('./cacheInit');
const { BoardGroup, User } = require('./models');

class CollaboratorCaching {
  // 서버를 켰을때 BoardGroup 전체 데이터 캐싱
  setCachedCollaborators = async () => {
    try {
      const collaborators = await BoardGroup.findAll({});

      for (const row of collaborators) {
        cache.set(`cacheKey${row.collaborator}`, row);
      }
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
      cache.set(
        `cacheKey${inviteCollaborator.collaborator}`,
        inviteCollaborator,
      );
    //   console.log('collaborator 데이터 캐싱 추가 성공', inviteCollaborator);
    } catch (err) {
      console.log('collaborator 데이터 캐싱 추가 실패', err);
      throw err;
    }
  };

  // 초대된 멤버 퍼미션 수정시
  modifyCachedCollaborator = async (userId) => {
    try {
      const modifyCachedCollaborator = await BoardGroup.findOne({
        where: { collaborator: userId },
      });

      cache.set(
        `cacheKey${modifyCachedCollaborator.collaborator}`,
        modifyCachedCollaborator,
      );
    //   console.log('캐싱된 데이터 수정 성공', modifyCachedCollaborator);
    } catch (err) {
      console.log('캐싱된 데이터 수정 실패', err);
      throw err;
    }
  };

  deleteCachedCollaborator = async (userId) => {
    try {
      const cacheKey = `cacheKey${userId}`;
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

  getCachedCollaborator = (collaborator) => {
    try {
      const cachedCollaborator = cache.get(`cacheKey${collaborator}`);

      if (cachedCollaborator) {
        // console.log('collaborator 데이터 GET 성공', cachedCollaborator);
        return cachedCollaborator;
      }
    } catch (err) {
      console.log('collaborator 데이터 GET 실패', err);
      throw err;
    }
  };
}

module.exports = CollaboratorCaching;
