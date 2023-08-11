const BoardGroup = require('../models/boardGroup');

// board 테이블에 url 속성도 넣을까?
class BoardGroupRepository {
  // 보드에 멤버로 참여시키는 기능
  inviteBoardGroupMember = async (boardId, userId, permission) => {
    const result = await BoardGroup.create({
      boardId,
      collaborator: userId,
      permission,
    });

    return result;
  };

  // 보드에 참가해있는 인원 조회하는 기능
  getBoardGroupList = async (boardId) => {
    const result = await BoardGroup.findAll({ where: { boardId } });

    return result;
  };

  getBoardGroupMember = async (boardId, userId) => {
    const user = await BoardGroup.findOne({
      where: { boardId, collaborator: userId },
    });

    return user;
  };

  //   modifyPermission = async (boardId, userId) => {

  //   }
}

module.exports = BoardGroupRepository;
